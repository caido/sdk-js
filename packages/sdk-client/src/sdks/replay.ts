import { ReplayCollectionSDK } from "./replayCollection.js";
import { ReplayEntrySDK, ReplayEntryWs } from "./replayEntry.js";
import { ReplaySessionSDK } from "./replaySession.js";
import { ReplayWsTask, type ReplayWsUpdate } from "./replayWs.js";
import { ReplayTask, TaskSDK } from "./task.js";

import { encodeBlob } from "@/convert/blob.js";
import { NotFoundUserError, OtherUserError } from "@/errors/index.js";
import type { GraphQLClient } from "@/graphql/index.js";
import {
  StartReplayTaskDocument as LatestStartReplayTaskDocument,
  UpdatedReplayEntryWsDocument,
  UpdateReplayEntryDraftDocument,
  UpdateReplaySessionSettingsDocument,
} from "@/graphql/index.js";
import type { StartReplayTaskInput } from "@/transport/v0.56/__generated__/types.js";
import { StartReplayTaskDocument as V056StartReplayTaskDocument } from "@/transport/v0.56/index.js";
import {
  type ID,
  type ReplaySendOptions,
  type ReplaySendResult,
  TransportVersion,
} from "@/types/index.js";
import {
  bufferAsyncIterable,
  filterAsyncIterable,
} from "@/utils/asyncIterable.js";
import { handleGraphQLError } from "@/utils/errors.js";
import { isAbsent, isPresent } from "@/utils/optional.js";
import type { Version } from "@/version.js";

/**
 * Top-level Replay SDK: sessions, collections, and send().
 * send(sessionId, options) starts a replay task and resolves when the task finishes.
 * startWs(sessionId) opens a WebSocket stream, which stays open until stopped.
 */
export class ReplaySDK {
  readonly sessions: ReplaySessionSDK;
  readonly collections: ReplayCollectionSDK;
  readonly entries: ReplayEntrySDK;

  private readonly tasks: TaskSDK;

  constructor(
    private readonly graphql: GraphQLClient,
    private readonly version: Version,
  ) {
    this.entries = new ReplayEntrySDK(graphql, version);
    this.sessions = new ReplaySessionSDK(graphql, version, this.entries);
    this.collections = new ReplayCollectionSDK(graphql);
    this.tasks = new TaskSDK(graphql);
  }

  /**
   * Send a request on via replay.
   */
  async send(
    sessionId: ID,
    options: ReplaySendOptions,
  ): Promise<ReplaySendResult> {
    if (await this.version.gte(TransportVersion.V0_57)) {
      return this.sendViaDraft(sessionId, options);
    }
    return this.sendV056(sessionId, options);
  }

  /**
   * Open the WebSocket stream for a replay session.
   *
   * Unlike `send`, this resolves as soon as the task starts, because a
   * WebSocket task stays open until `stop` is called on it.
   *
   * @param sessionId - The ID of the WebSocket replay session.
   * @returns The running task, which carries sendMessage, sendDraft and stop.
   */
  async startWs(sessionId: ID): Promise<ReplayWsTask> {
    if (!(await this.version.gte(TransportVersion.V0_57))) {
      throw new OtherUserError(
        "UNSUPPORTED",
        "WebSocket replay requires Caido 0.57.0 or later",
      );
    }

    const result = await this.graphql.mutation(LatestStartReplayTaskDocument, {
      sessionId: sessionId as string,
    });

    const payload = result.startReplayTask;
    if (isPresent(payload.error)) {
      handleGraphQLError(payload.error);
    }
    if (isAbsent(payload.task)) {
      throw new OtherUserError("INTERNAL", "startReplayTask returned no task");
    }
    return new ReplayWsTask(this.graphql, payload.task);
  }

  /**
   * Watch WebSocket replay entries as the instance updates them.
   *
   * @param filter - Optional predicate to narrow the updates that are yielded.
   */
  watchWs(
    filter?: (update: ReplayWsUpdate) => boolean,
  ): AsyncIterable<ReplayWsUpdate> {
    const updates = this.wsUpdates();

    if (filter === undefined) {
      return updates;
    }
    return filterAsyncIterable(filter, updates);
  }

  private async *wsUpdates(): AsyncGenerator<ReplayWsUpdate> {
    const events = this.graphql.subscribe(UpdatedReplayEntryWsDocument, {
      includeReplayRaw: true,
      includeRequestRaw: true,
      includeResponseRaw: true,
    });

    for await (const event of events) {
      const entry = event.updatedReplayEntryWs.entry;
      if (isAbsent(entry)) {
        continue;
      }
      yield {
        entry: new ReplayEntryWs(this.graphql, entry),
        snapshot: event.updatedReplayEntryWs.snapshot,
      };
    }
  }

  private async sendViaDraft(
    sessionId: ID,
    options: ReplaySendOptions,
  ): Promise<ReplaySendResult> {
    const settings = options.settings ?? {};

    // Find the Entry on which we should update the draft.
    const session = await this.sessions.get(sessionId);
    if (isAbsent(session)) {
      throw new NotFoundUserError();
    }
    if (session.kind !== "HTTP") {
      throw new OtherUserError(
        "INTERNAL",
        "replay.send() only supports HTTP sessions",
      );
    }
    const targetEntryId = session.activeEntryId ?? session.lastEntryId;
    if (isAbsent(targetEntryId)) {
      throw new OtherUserError(
        "INTERNAL",
        "Replay session has no active entry",
      );
    }

    // Update the draft on the target Entry
    await this.graphql.mutation(UpdateReplayEntryDraftDocument, {
      id: targetEntryId,
      input: {
        http: {
          connection: {
            host: options.connection.host,
            port: options.connection.port,
            isTLS: options.connection.isTLS,
            SNI: options.connection.SNI,
          },
          editorState: encodeBlob(options.raw),
          raw: encodeBlob(options.raw),
          settings: {
            placeholders:
              settings.placeholders?.map((placeholder) => ({
                inputRange: placeholder.inputRange,
                outputRange: placeholder.outputRange,
                preprocessors: placeholder.preprocessors ?? [],
              })) ?? [],
          },
        },
      },
    });

    // Update the session settings if needed
    if (
      (settings.connectionClose !== undefined &&
        settings.connectionClose !== session.settings?.connectionClose) ||
      (settings.updateContentLength !== undefined &&
        settings.updateContentLength !== session.settings?.updateContentLength)
    ) {
      await this.graphql.mutation(UpdateReplaySessionSettingsDocument, {
        id: sessionId as string,
        input: {
          http: {
            connectionClose:
              settings.connectionClose ??
              session.settings?.connectionClose ??
              false,
            updateContentLength:
              settings.updateContentLength ??
              session.settings?.updateContentLength ??
              true,
          },
        },
      });
    }

    return this.waitForReplayTask(async () => {
      const result = await this.graphql.mutation(
        LatestStartReplayTaskDocument,
        {
          sessionId: sessionId as string,
        },
      );

      const payload = result.startReplayTask;
      if (isPresent(payload.error)) {
        handleGraphQLError(payload.error);
      }
      return new ReplayTask(this.graphql, payload.task!);
    });
  }

  private async sendV056(
    sessionId: ID,
    options: ReplaySendOptions,
  ): Promise<ReplaySendResult> {
    const settings = options.settings ?? {};
    const input = {
      connection: {
        host: options.connection.host,
        port: options.connection.port,
        isTLS: options.connection.isTLS,
        SNI: options.connection.SNI,
      },
      raw: encodeBlob(options.raw),
      settings: {
        connectionClose: settings.connectionClose ?? false,
        updateContentLength: settings.updateContentLength ?? true,
        placeholders:
          settings.placeholders?.map((placeholder) => ({
            inputRange: placeholder.inputRange,
            outputRange: placeholder.outputRange,
            preprocessors: placeholder.preprocessors ?? [],
          })) ?? [],
      },
    } satisfies StartReplayTaskInput;

    return this.waitForReplayTask(async () => {
      const result = await this.graphql.mutation(V056StartReplayTaskDocument, {
        sessionId: sessionId as string,
        input,
      });

      const payload = result.startReplayTask;
      if (isPresent(payload.error)) {
        handleGraphQLError(payload.error);
      }
      return new ReplayTask(this.graphql, payload.task!);
    });
  }

  /**
   * Open the finished-task subscription before running `start`, then resolve
   * when the started task finishes.
   */
  private async waitForReplayTask(
    start: () => Promise<ReplayTask>,
  ): Promise<ReplaySendResult> {
    const finished = bufferAsyncIterable(this.tasks.finished());
    const task = await start();

    for await (const result of finished) {
      if (result.task.id !== task.id) {
        continue;
      }

      const entry = await this.entries.get(task.replayEntryId);
      if (isAbsent(entry)) {
        throw new OtherUserError("INTERNAL", "Replay entry not found");
      }
      if (entry.kind !== "HTTP") {
        throw new OtherUserError(
          "INTERNAL",
          "replay.send() only supports HTTP sessions",
        );
      }

      return {
        entry,
        status: result.status,
        error: result.error,
      };
    }

    throw new OtherUserError(
      "INTERNAL",
      "Replay task subscription ended without finished event",
    );
  }
}
