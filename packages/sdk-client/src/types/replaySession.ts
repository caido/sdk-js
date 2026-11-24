import type { ConnectionInfoInput, ID } from "./index.js";

import type { RangeInput, ReplayPreprocessorInput } from "@/graphql/index.js";

/**
 * The kind of a replay session.
 * @category Replay
 */
export const ReplaySessionKind = {
  Http: "HTTP",
  Ws: "WS",
  Pipeline: "HTTP_PIPELINE",
} as const;

/**
 * The kind of a replay session.
 * @category Replay
 */
export type ReplaySessionKind =
  (typeof ReplaySessionKind)[keyof typeof ReplaySessionKind];

/**
 * What a pipeline does when one of its requests fails to send completely.
 * @category Replay
 */
export const FailureBehavior = {
  AbortOnPartial: "ABORT_ON_PARTIAL",
  FireOnPartial: "FIRE_ON_PARTIAL",
} as const;

/**
 * What a pipeline does when one of its requests fails to send completely.
 * @category Replay
 */
export type FailureBehavior =
  (typeof FailureBehavior)[keyof typeof FailureBehavior];

/**
 * How a pipeline session dispatches its requests.
 * @category Replay
 */
export const PipelineStrategyKind = {
  Sequential: "sequential",
  LastByteSynchronization: "lastByteSynchronization",
  SinglePacketAttack: "singlePacketAttack",
} as const;

/**
 * How a pipeline session dispatches its requests.
 * @category Replay
 */
export type PipelineStrategyKind =
  (typeof PipelineStrategyKind)[keyof typeof PipelineStrategyKind];

/**
 * How a pipeline session dispatches its requests.
 * @category Replay
 */
export type PipelineStrategy =
  | {
      kind: typeof PipelineStrategyKind.Sequential;
      abortOnFailure: boolean;
    }
  | {
      kind: typeof PipelineStrategyKind.LastByteSynchronization;
      failureBehavior: FailureBehavior;
    }
  | {
      kind: typeof PipelineStrategyKind.SinglePacketAttack;
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
  /**
   * Added in: Caido v0.59.0.
   */
  stripHttp2ConnectionHeaders?: boolean;
};

/**
 * Settings of a pipeline replay session.
 * @category Replay
 */
export type ReplaySessionPipelineSettings = {
  strategy: PipelineStrategy;
  /**
   * Added in: Caido v0.59.0.
   */
  updateContentLength?: boolean;
  /**
   * Added in: Caido v0.59.0.
   */
  stripHttp2ConnectionHeaders?: boolean;
};

/**
 * Direction of a WebSocket message.
 * @category Replay
 */
export const StreamMessageDirection = {
  Client: "CLIENT",
  Server: "SERVER",
} as const;

/**
 * Direction of a WebSocket message.
 * @category Replay
 */
export type StreamMessageDirection =
  (typeof StreamMessageDirection)[keyof typeof StreamMessageDirection];

/**
 * Wire format of a WebSocket message. Control frames are recorded too.
 * @category Replay
 */
export const StreamWsMessageFormat = {
  Binary: "BINARY",
  Close: "CLOSE",
  Ping: "PING",
  Pong: "PONG",
  Text: "TEXT",
} as const;

/**
 * Wire format of a WebSocket message.
 * @category Replay
 */
export type StreamWsMessageFormat =
  (typeof StreamWsMessageFormat)[keyof typeof StreamWsMessageFormat];

/**
 * Wire format of a WebSocket message a client can send.
 * @category Replay
 */
export const SendStreamWsMessageFormat = {
  Binary: "BINARY",
  Text: "TEXT",
} as const;

/**
 * Wire format of a WebSocket message a client can send.
 * @category Replay
 */
export type SendStreamWsMessageFormat =
  (typeof SendStreamWsMessageFormat)[keyof typeof SendStreamWsMessageFormat];

/**
 * How a message came to hold its current payload.
 * @category Replay
 */
export const Alteration = {
  Manual: "MANUAL",
  None: "NONE",
  Tamper: "TAMPER",
} as const;

/**
 * How a message came to hold its current payload.
 * @category Replay
 */
export type Alteration = (typeof Alteration)[keyof typeof Alteration];

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
 * One revision of a WebSocket message.
 * @category Replay
 */
export type ReplayWsMessageEdit = {
  id: ID;
  alteration: Alteration;
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
  alteration: Alteration;
  createdAt: Date;
  streamId: ID;
  /** The revisions of this message, newest last. */
  edits: ReplayWsMessageEdit[];
};

/**
 * The message a WebSocket replay entry will send next.
 * @category Replay
 */
export type ReplayWsDraft = {
  direction: StreamMessageDirection;
  format: StreamWsMessageFormat;
  raw: Uint8Array | undefined;
};

/**
 * A request to seed a replay session with.
 * @category Replay
 */
export type ReplayRequestSource =
  | { id: ID }
  | { raw: string | Uint8Array; connection: ConnectionInfoInput };

/**
 * Options for creating an HTTP replay session.
 * @category Replay
 */
export type CreateReplaySessionHttpOptions = {
  kind?: typeof ReplaySessionKind.Http;
  collectionId?: ID;
  /** Create from an existing request id, or from raw input. */
  requestSource?: ReplayRequestSource;
};

/**
 * Options for creating a WebSocket replay session.
 *
 * Added in: Caido v0.57.0.
 * @category Replay
 */
export type CreateReplaySessionWsOptions = {
  kind: typeof ReplaySessionKind.Ws;
  collectionId?: ID;
  /** Create from an existing request id, or from raw input. */
  requestSource?: ReplayRequestSource;
};

/**
 * Options for creating a pipeline replay session.
 *
 * Added in: Caido v0.58.0.
 * @category Replay
 */
export type CreateReplaySessionPipelineOptions = {
  kind: typeof ReplaySessionKind.Pipeline;
  collectionId?: ID;
  /** The requests the pipeline sends, in order. */
  requestSources: ReplayRequestSource[];
  strategy: PipelineStrategy;
};

/**
 * Options for creating a replay session of any kind.
 * @category Replay
 */
export type CreateReplaySessionOptions =
  | CreateReplaySessionHttpOptions
  | CreateReplaySessionWsOptions
  | CreateReplaySessionPipelineOptions;

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
 * Status of a finished replay task.
 * @category Replay
 */
export type ReplaySendStatus = "DONE" | "CANCELLED" | "ERROR";

/**
 * A WebSocket message to send on a running replay task.
 * @category Replay
 */
export type SendReplayWsMessageOptions = {
  direction: StreamMessageDirection;
  format: SendStreamWsMessageFormat;
  raw: string | Uint8Array;
};
