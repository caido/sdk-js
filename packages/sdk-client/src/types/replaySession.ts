import type { ConnectionInfoInput, ID } from "./index.js";

import type { RangeInput, ReplayPreprocessorInput } from "@/graphql/index.js";
import type { ReplayEntryHttp } from "@/sdks/index.js";

/**
 * The kind of a replay session.
 *
 * `WS` requires Caido 0.57.0 or later, `HTTP_ONE_PIPELINE` requires 0.58.0.
 * @category Replay
 */
export type ReplaySessionKind = "HTTP" | "WS" | "HTTP_ONE_PIPELINE";

/**
 * What a pipeline does when one of its requests fails to send completely.
 * @category Replay
 */
export type FailureBehavior = "ABORT_ON_PARTIAL" | "FIRE_ON_PARTIAL";

/**
 * How a pipeline session dispatches its requests.
 * @category Replay
 */
export type PipelineStrategy =
  | { kind: "sequential"; abortOnFailure: boolean }
  | { kind: "lastByteSynchronization"; failureBehavior: FailureBehavior }
  | {
      kind: "singlePacketAttack";
      convertToHttp2: boolean;
      failureBehavior: FailureBehavior;
    };

/**
 * Settings of an HTTP replay session.
 * @category Replay
 */
export type ReplaySessionHttpSettings = {
  connectionClose: boolean;
  updateContentLength: boolean;
};

/**
 * Settings of a pipeline replay session.
 * @category Replay
 */
export type ReplaySessionPipelineSettings = {
  strategy: PipelineStrategy;
};

/**
 * Direction of a WebSocket message.
 * @category Replay
 */
export type StreamMessageDirection = "CLIENT" | "SERVER";

/**
 * Wire format of a WebSocket message.
 * @category Replay
 */
export type StreamWsMessageFormat =
  | "BINARY"
  | "CLOSE"
  | "PING"
  | "PONG"
  | "TEXT";

/**
 * The connection a WebSocket replay entry is bound to.
 * @category Replay
 */
export type ReplayStream = {
  id: ID;
  host: string;
  port: number;
  path: string;
  isTls: boolean;
  protocol: string;
  direction: string;
  source: string;
  createdAt: Date;
};

/**
 * A single WebSocket message exchanged on a replay stream.
 * @category Replay
 */
export type ReplayWsMessage = {
  id: ID;
  direction: StreamMessageDirection;
  format: StreamWsMessageFormat;
  raw: Uint8Array | undefined;
  length: number;
  alteration: string;
  createdAt: Date;
  streamId: ID;
  /** Ids of the edits applied to this message, newest last. */
  editIds: ID[];
};

/**
 * A request to seed a replay session with.
 * @category Replay
 */
export type ReplayRequestSource =
  | { id: ID }
  | { raw: string; connection: ConnectionInfoInput };

/**
 * Options for creating a replay session.
 * @category Replay
 */
export type CreateReplaySessionOptions = {
  collectionId?: ID;
  /**
   * Which kind of session to create. Defaults to `HTTP`.
   *
   * `WS` requires Caido 0.57.0 or later. Use
   * `client.replay.sessions.createPipeline()` for pipeline sessions, since
   * they take several request sources and a strategy.
   */
  kind?: Exclude<ReplaySessionKind, "HTTP_ONE_PIPELINE">;
  /** Create from existing request id or raw input. */
  requestSource?: ReplayRequestSource;
};

/**
 * Options for creating a pipeline replay session.
 * Requires Caido 0.58.0 or later.
 * @category Replay
 */
export type CreateReplayPipelineSessionOptions = {
  collectionId?: ID;
  /** The requests the pipeline sends, in order. */
  requestSources: ReplayRequestSource[];
  strategy: PipelineStrategy;
};

/**
 * Options for replay.send(): raw request bytes and connection; optional settings.
 * @category Replay
 */
export type ReplaySendOptions = {
  raw: string | Uint8Array;
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
  entry: ReplayEntryHttp;
  status: "DONE" | "CANCELLED" | "ERROR";
  error?: { code: string };
};

/**
 * A WebSocket message to send on a running replay task.
 * @category Replay
 */
export type SendReplayWsMessageOptions = {
  direction: StreamMessageDirection;
  format: StreamWsMessageFormat;
  raw: string | Uint8Array;
};
