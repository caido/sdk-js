import { ReplayCollectionSDK } from "./replayCollection.js";
import {
  type ReplayEntryHttp,
  ReplayEntrySDK,
  ReplayEntryWs,
} from "./replayEntry.js";
import { ReplaySessionSDK } from "./replaySession.js";
import { ReplayWsTask, type ReplayWsUpdate } from "./replayWs.js";
import { ReplayTask, TaskSDK } from "./task.js";

import { encodeBlob } from "@/convert/blob.js";
import { NotFoundUserError, OtherUserError } from "@/errors/index.js";
import type { GraphQLClient } from "@/graphql/index.js";
import {
  StartReplayTaskDocument,
  UpdatedReplayEntryWsDocument,
  UpdateReplayEntryDraftDocument,
  UpdateReplaySessionSettingsDocument,
} from "@/graphql/index.js";
import {
  type ID,
  type ReplaySendOptions,
  type ReplaySendStatus,
  ReplaySessionKind,
} from "@/types/index.js";
import {
  bufferAsyncIterable,
  filterAsyncIterable,
} from "@/utils/asyncIterable.js";
import { handleGraphQLError } from "@/utils/errors.js";
import { isAbsent, isPresent } from "@/utils/optional.js";
import type { Version } from "@/version.js";

/**
 * Result of replay.send() after the task finishes.
 * @category Replay
 */
export type ReplaySendResult = {
  entry: ReplayEntryHttp;
  status: ReplaySendStatus;
  error?: { code: string };
};

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
    this.sessions = new ReplaySessionSDK(graphql, version);
    this.collections = new ReplayCollectionSDK(graphql);
    this.tasks = new TaskSDK(graphql);
  }

  /**
   * Send the request held by an HTTP replay session.
   *
   * @param sessionId - The ID of the HTTP replay session.
   * @param options - The request bytes, connection and settings to send with.
   */
  async send(
    sessionId: ID,
    options: ReplaySendOptions,
  ): Promise<ReplaySendResult> {
    const settings = options.settings ?? {};

    const session = await this.sessions.get(sessionId);
    if (isAbsent(session)) {
      throw new NotFoundUserError();
    }
    if (session.kind !== ReplaySessionKind.Http) {
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

    // The mutation replaces the whole group, so unset fields keep their value.
    if (
      settings.connectionClose !== undefined ||
      settings.updateContentLength !== undefined
    ) {
      const stripHttp2ConnectionHeaders =
        session.settings?.stripHttp2ConnectionHeaders;

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
            ...(stripHttp2ConnectionHeaders === undefined
              ? {}
              : { stripHttp2ConnectionHeaders }),
          },
        },
      });
    }

    return this.waitForReplayTask(sessionId);
  }

  /**
   * Open the WebSocket stream for a replay session.
   *
   * Resolves once the task starts; the stream stays open until `stop`.
   *
   * Added in: Caido v0.57.0.
   *
   * @param sessionId - The ID of the WebSocket replay session.
   * @returns The running task.
   */
  async startWs(sessionId: ID): Promise<ReplayWsTask> {
    const result = await this.graphql.mutation(StartReplayTaskDocument, {
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
   * Added in: Caido v0.57.0.
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
        entry: new ReplayEntryWs(entry),
        snapshot: event.updatedReplayEntryWs.snapshot,
      };
    }
  }

  /** Subscribes before starting, so the finished event cannot be missed. */
  private async waitForReplayTask(sessionId: ID): Promise<ReplaySendResult> {
    const finished = bufferAsyncIterable(this.tasks.finished());

    let task: ReplayTask;
    try {
      const result = await this.graphql.mutation(StartReplayTaskDocument, {
        sessionId: sessionId as string,
      });
      const payload = result.startReplayTask;
      if (isPresent(payload.error)) {
        handleGraphQLError(payload.error);
      }
      if (isAbsent(payload.task)) {
        throw new OtherUserError(
          "INTERNAL",
          "startReplayTask returned no task",
        );
      }
      task = new ReplayTask(this.graphql, payload.task);
    } catch (error) {
      await finished.cancel();
      throw error;
    }

    for await (const event of finished) {
      if (event.task.id !== task.id) {
        continue;
      }

      const entry = await this.entries.get(task.replayEntryId);
      if (isAbsent(entry)) {
        throw new OtherUserError("INTERNAL", "Replay entry not found");
      }

      return {
        entry,
        status: event.status,
        error: event.error,
      };
    }

    throw new OtherUserError(
      "INTERNAL",
      "Replay task subscription ended without finished event",
    );
  }
}
