import type { ConnectionInfoInput, ID } from "./index.js";

import type { RangeInput, ReplayPreprocessorInput } from "@/graphql/index.js";

/**
 * Options for creating a replay session.
 * @category Replay
 */
export type CreateReplaySessionOptions = {
  collectionId?: ID;
  /** Create from existing request id or raw input. */
  requestSource?: { id: ID } | { raw: string; connection: ConnectionInfoInput };
};

/**
 * Options for replay.send(): raw request bytes and connection; optional settings.
 * @category Replay
 */
export type ReplaySendOptions = {
  raw: string;
  connection: ConnectionInfoInput;
  settings?: {
    connectionClose?: boolean;
    updateContentLength?: boolean;
    placeholders?: Array<{
      inputRange: RangeInput;
      outputRange: RangeInput;
      preprocessors?: Array<ReplayPreprocessorInput>;
    }>;
  };
};

/**
 * Result of replay.send() after task finishes.
 * @category Replay
 */
export type ReplaySendResult = {
  status: "DONE" | "CANCELLED" | "ERROR";
  error?: { code: string };
};
