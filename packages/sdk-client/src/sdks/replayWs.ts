import { type ReplayEntryWs } from "./replayEntry.js";
import { ReplayTask } from "./task.js";

import {
  SendReplayTaskMessageDocument,
  SendReplayTaskMessageDraftDocument,
  StopReplayWsTasksDocument,
} from "@/graphql/index.js";
import { encodeBlob } from "@/transport/latest/convert/blob.js";
import { mapToReplayWsMessage } from "@/transport/latest/convert/replay.js";
import type {
  ReplayWsMessage,
  SendReplayWsMessageOptions,
} from "@/types/index.js";
import { handleGraphQLError } from "@/utils/errors.js";
import { isPresent } from "@/utils/optional.js";

/**
 * An update to a WebSocket replay entry, as pushed by the instance.
 * @category Replay
 */
export type ReplayWsUpdate = {
  entry: ReplayEntryWs;
  snapshot: number;
};

/**
 * A running WebSocket replay task.
 *
 * Unlike an HTTP replay task, this one stays open until it is stopped, so it
 * carries the operations that act on the live stream.
 */
export class ReplayWsTask extends ReplayTask {
  /**
   * Send a message on this task's stream.
   * @param options - The direction, format and payload of the message.
   * @returns The message as recorded by the instance.
   */
  async sendMessage(
    options: SendReplayWsMessageOptions,
  ): Promise<ReplayWsMessage | undefined> {
    const result = await this.graphql.mutation(SendReplayTaskMessageDocument, {
      task: this.id as string,
      input: {
        ws: {
          direction: options.direction,
          format: options.format,
          data: encodeBlob(options.raw),
        },
      },
    });

    const payload = result.sendReplayTaskMessage;
    if (isPresent(payload.error)) {
      handleGraphQLError(payload.error);
    }
    return isPresent(payload.message)
      ? mapToReplayWsMessage(payload.message)
      : undefined;
  }

  /**
   * Send the message currently held in this task's draft.
   * @returns The message as recorded by the instance.
   */
  async sendDraft(): Promise<ReplayWsMessage | undefined> {
    const result = await this.graphql.mutation(
      SendReplayTaskMessageDraftDocument,
      { task: this.id as string },
    );

    const payload = result.sendReplayTaskMessageDraft;
    if (isPresent(payload.error)) {
      handleGraphQLError(payload.error);
    }
    return isPresent(payload.message)
      ? mapToReplayWsMessage(payload.message)
      : undefined;
  }

  /**
   * Stop this task, closing its stream.
   */
  async stop(): Promise<void> {
    const result = await this.graphql.mutation(StopReplayWsTasksDocument, {
      taskIds: [this.id as string],
    });

    if (isPresent(result.stopReplayWsTasks.error)) {
      handleGraphQLError(result.stopReplayWsTasks.error);
    }
  }
}
