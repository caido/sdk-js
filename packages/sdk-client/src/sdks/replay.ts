import { ReplayCollectionSDK } from "./replayCollection.js";
import { ReplayEntrySDK } from "./replayEntry.js";
import { ReplaySessionSDK } from "./replaySession.js";
import { ReplayTask, Task, TaskSDK } from "./task.js";

import { encodeBlob } from "@/convert/blob.js";
import { OtherUserError } from "@/errors/index.js";
import type { GraphQLClient, StartReplayTaskInput } from "@/graphql/index.js";
import { StartReplayTaskDocument } from "@/graphql/index.js";
import type { ID, ReplaySendOptions, ReplaySendResult } from "@/types/index.js";
import { handleGraphQLError } from "@/utils/errors.js";
import { isAbsent, isPresent } from "@/utils/optional.js";

/**
 * Top-level Replay SDK: sessions, collections, and send().
 * send(sessionId, options) starts a replay task and resolves when the task finishes.
 */
export class ReplaySDK {
  readonly sessions: ReplaySessionSDK;
  readonly collections: ReplayCollectionSDK;
  readonly entries: ReplayEntrySDK;

  private readonly tasks: TaskSDK;

  constructor(private readonly graphql: GraphQLClient) {
    this.sessions = new ReplaySessionSDK(graphql);
    this.collections = new ReplayCollectionSDK(graphql);
    this.entries = new ReplayEntrySDK(graphql);
    this.tasks = new TaskSDK(graphql);
  }

  /**
   * Send a request on via replay.
   */
  async send(
    sessionId: ID,
    options: ReplaySendOptions,
  ): Promise<ReplaySendResult> {
    // Start task
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

    const result = await this.graphql.mutation(StartReplayTaskDocument, {
      sessionId: sessionId as string,
      input,
    });

    const payload = result.startReplayTask;
    if (isPresent(payload.error)) {
      handleGraphQLError(payload.error);
    }
    const task = new ReplayTask(this.graphql, payload.task!);

    // Wait for task to finish
    for await (const result of this.tasks.finished(
      (result) => result.task.id === task.id,
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
