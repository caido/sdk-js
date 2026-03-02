import { ReplayCollectionSDK } from "./replayCollection.js";
import { ReplayEntrySDK } from "./replayEntry.js";
import { ReplaySessionSDK } from "./replaySession.js";

import type { GraphQLClient } from "@/graphql/index.js";
import {
  FinishedTaskDocument,
  StartReplayTaskDocument,
} from "@/graphql/index.js";
import type { ID, ReplaySendOptions, ReplaySendResult } from "@/types/index.js";
import { handleGraphQLError } from "@/utils/errors.js";
import { isPresent } from "@/utils/optional.js";

/**
 * Top-level Replay SDK: sessions, collections, and send().
 * send(sessionId, options) starts a replay task and resolves when the task finishes.
 */
export class ReplaySDK {
  readonly sessions: ReplaySessionSDK;
  readonly collections: ReplayCollectionSDK;
  readonly entries: ReplayEntrySDK;

  constructor(private readonly graphql: GraphQLClient) {
    this.sessions = new ReplaySessionSDK(graphql);
    this.collections = new ReplayCollectionSDK(graphql);
    this.entries = new ReplayEntrySDK(graphql);
  }

  // /**
  //  * Send a replay: start the task for the session with the given raw request and connection,
  //  * then wait for the task to finish (via finishedTask subscription).
  //  */
  // async send(
  //   sessionId: ID,
  //   options: ReplaySendOptions,
  // ): Promise<ReplaySendResult> {
  //   const settings = options.settings ?? {};
  //   const input = {
  //     connection: {
  //       host: options.connection.host,
  //       port: options.connection.port,
  //       isTLS: options.connection.isTLS,
  //       SNI: options.connection.SNI,
  //     },
  //     raw: options.raw,
  //     settings: {
  //       connectionClose: settings.connectionClose ?? false,
  //       updateContentLength: settings.updateContentLength ?? true,
  //       placeholders: settings.placeholders ?? [],
  //     },
  //   };

  //   const result = await this.graphql.mutation(StartReplayTaskDocument, {
  //     sessionId: sessionId as string,
  //     input,
  //   });

  //   const payload = result.startReplayTask;
  //   if (isPresent(payload.error)) {
  //     handleGraphQLError(payload.error);
  //   }
  //   const task = payload.task;
  //   if (!task) {
  //     throw new Error("startReplayTask returned no task");
  //   }

  //   const taskId = task.id as ID;

  //   for await (const event of this.graphql.subscribe(FinishedTaskDocument)) {
  //     if (event.finishedTask.task.id === taskId) {
  //       return {
  //         taskId,
  //         status: event.finishedTask.status as ReplaySendResult["status"],
  //         error: event.finishedTask.error
  //           ? { code: event.finishedTask.error.code }
  //           : undefined,
  //       };
  //     }
  //   }

  //   throw new Error("Replay task subscription ended without finished event");
  // }
}
