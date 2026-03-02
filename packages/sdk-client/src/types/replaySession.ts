import type { ConnectionInfoInput, ID } from "./index.js";

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
      inputRange: { start: number; end: number };
      outputRange: { start: number; end: number };
      preprocessors?: unknown[];
    }>;
  };
};

/**
 * Result of replay.send() after task finishes.
 * @category Replay
 */
export type ReplaySendResult = {
  taskId: ID;
  status: "DONE" | "CANCELLED" | "ERROR";
  error?: { code: string };
};
