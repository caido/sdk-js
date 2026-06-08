import { ReplayCollectionSDK } from "./replayCollection.js";
import { ReplayEntrySDK } from "./replayEntry.js";
import { ReplaySessionSDK } from "./replaySession.js";
import { ReplayTask, TaskSDK } from "./task.js";

import { encodeBlob } from "@/convert/blob.js";
import { NotFoundUserError, OtherUserError } from "@/errors/index.js";
import type { GraphQLClient } from "@/graphql/index.js";
import {
  ReplaySessionDocument as LatestReplaySessionDocument,
  StartReplayTaskDocument as LatestStartReplayTaskDocument,
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
import { handleGraphQLError } from "@/utils/errors.js";
import { isAbsent, isPresent } from "@/utils/optional.js";
import type { Version } from "@/version.js";

/**
 * Top-level Replay SDK: sessions, collections, and send().
 * send(sessionId, options) starts a replay task and resolves when the task finishes.
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
      return this.sendLatest(sessionId, options);
    }
    return this.sendV056(sessionId, options);
  }

  private async sendLatest(
    sessionId: ID,
    options: ReplaySendOptions,
  ): Promise<ReplaySendResult> {
    const settings = options.settings ?? {};

    // Find the Entry on which we should update the draft.
    // This API is kinda garbage, but we will improve it in v0.58.0
    const sessionResult = await this.graphql.query(
      LatestReplaySessionDocument,
      {
        id: sessionId as string,
      },
    );
    const session = sessionResult.replaySession;
    if (isAbsent(session)) {
      throw new NotFoundUserError();
    }
    if (session.__typename !== "ReplaySessionHttp") {
      throw new OtherUserError("INTERNAL", "SDK only supports HTTP sessions");
    }
    let targetEntryId = session.activeEntry?.id;
    if (isAbsent(targetEntryId)) {
      const entries = session.entries;
      if (entries.edges.length === 0) {
        throw new OtherUserError("INTERNAL", "Replay session has no entries");
      }
      targetEntryId = entries.edges[entries.edges.length - 1]?.node.id;
    }
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

    // Start the replay task
    const result = await this.graphql.mutation(LatestStartReplayTaskDocument, {
      sessionId: sessionId as string,
    });

    const payload = result.startReplayTask;
    if (isPresent(payload.error)) {
      handleGraphQLError(payload.error);
    }
    const task = new ReplayTask(this.graphql, payload.task!);

    // Wait for task to finish
    return this.waitForReplayTask(task);
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

    const result = await this.graphql.mutation(V056StartReplayTaskDocument, {
      sessionId: sessionId as string,
      input,
    });

    const payload = result.startReplayTask;
    if (isPresent(payload.error)) {
      handleGraphQLError(payload.error);
    }
    const task = new ReplayTask(this.graphql, payload.task!);

    // Wait for task to finish
    return this.waitForReplayTask(task);
  }

  private async waitForReplayTask(task: ReplayTask): Promise<ReplaySendResult> {
    for await (const result of this.tasks.finished(
      (finished) => finished.task.id === task.id,
    )) {
      const entry = await this.entries.get(task.replayEntryId);
      if (isAbsent(entry)) {
        throw new OtherUserError("INTERNAL", "Replay entry not found");
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
