import {
  type GraphQLClient,
  ReplayEntryDocument as LatestReplayEntryDocument,
  type ReplayEntryFullFragment as LatestReplayEntryFullFragment,
  type ReplayEntryHttpFullFragment as LatestReplayEntryHttpFullFragment,
  type ReplayEntryWsFullFragment as LatestReplayEntryWsFullFragment,
  type StreamFullFragment,
  type StreamWsMessageFullFragment,
} from "@/graphql/index.js";
import { decodeBlob } from "@/transport/latest/convert/blob.js";
import { mapToConnectionInfo } from "@/transport/latest/convert/network.js";
import {
  mapToPipelineStrategy,
  mapToReplayStream,
  mapToReplayWsMessage,
} from "@/transport/latest/convert/replay.js";
import {
  mapToRequest,
  mapToResponse,
} from "@/transport/latest/convert/request.js";
import {
  ReplayEntryDocument as V058ReplayEntryDocument,
  type ReplayEntryFullFragment as V058ReplayEntryFullFragment,
} from "@/transport/v0.58/index.js";
import {
  type ConnectionInfo,
  type ID,
  type PipelineStrategy,
  ReplaySessionKind,
  type ReplaySessionKind as ReplaySessionKindType,
  type ReplayStream,
  type ReplayWsDraft,
  type ReplayWsMessage,
  type Request,
  type Response,
  TransportVersion,
  versioned,
  type VersionedOf,
} from "@/types/index.js";
import { isAbsent, isPresent } from "@/utils/optional.js";
import type { Version } from "@/version.js";

export type ReplayEntryVersionedFragment = VersionedOf<{
  [TransportVersion.V0_59]: LatestReplayEntryFullFragment;
  [TransportVersion.V0_58]: V058ReplayEntryFullFragment;
}>;

/**
 * Any replay entry, discriminated by `kind`.
 * @category Replay
 */
export type AnyReplayEntry =
  | ReplayEntryHttp
  | ReplayEntryWs
  | ReplayEntryPipeline
  | ReplayEntryUnknown;

/**
 * SDK for replay entries.
 */
export class ReplayEntrySDK {
  constructor(
    private readonly graphql: GraphQLClient,
    private readonly version: Version,
  ) {}

  /**
   * Get a replay entry by ID.
   * @param id - The ID of the replay entry to get.
   * @param kind - The kind of session the entry belongs to. Defaults to `HTTP`.
   * @returns The replay entry, or undefined if it does not exist.
   */
  async get(id: ID): Promise<ReplayEntryHttp | undefined>;
  async get(
    id: ID,
    kind: typeof ReplaySessionKind.Http,
  ): Promise<ReplayEntryHttp | undefined>;
  async get(
    id: ID,
    kind: typeof ReplaySessionKind.Ws,
  ): Promise<ReplayEntryWs | undefined>;
  async get(
    id: ID,
    kind: typeof ReplaySessionKind.Pipeline,
  ): Promise<ReplayEntryPipeline | undefined>;
  async get(
    id: ID,
    kind: ReplaySessionKindType,
  ): Promise<AnyReplayEntry | undefined>;
  async get(
    id: ID,
    kind: ReplaySessionKindType = ReplaySessionKind.Http,
  ): Promise<AnyReplayEntry | undefined> {
    const variables = {
      id: id as string,
      includeReplayRaw: true,
      includeRequestRaw: true,
      includeResponseRaw: true,
    };

    if (await this.version.gte(TransportVersion.V0_59)) {
      const result = await this.graphql.query(LatestReplayEntryDocument, {
        ...variables,
        sessionKind: kind,
      });
      if (isAbsent(result.replayEntry)) {
        return undefined;
      }
      return createReplayEntry(
        versioned(TransportVersion.V0_59, result.replayEntry),
      );
    }

    const result = await this.graphql.query(V058ReplayEntryDocument, {
      ...variables,
      sessionKind: toV058SessionKind(kind),
    });
    if (isAbsent(result.replayEntry)) {
      return undefined;
    }
    return createReplayEntry(
      versioned(TransportVersion.V0_58, result.replayEntry),
    );
  }
}

/** Base class for every replay entry. Narrow on `kind` for the rest. */
export abstract class ReplayEntry {
  abstract readonly kind: ReplaySessionKindType | "UNKNOWN";

  readonly id: ID;
  readonly createdAt: Date;
  readonly error: string | undefined;
  readonly sessionId: ID;

  protected constructor(base: {
    id: string;
    createdAt: string;
    error?: string | null;
    sessionId: string;
  }) {
    this.id = base.id;
    this.createdAt = new Date(base.createdAt);
    this.error = base.error ?? undefined;
    this.sessionId = base.sessionId;
  }
}

/** An entry of a kind this SDK does not model. */
export class ReplayEntryUnknown extends ReplayEntry {
  readonly kind = "UNKNOWN";

  /** The server-side type name. */
  readonly typename: string;

  constructor(data: {
    __typename: string;
    id: string;
    createdAt: string;
    error?: string | null;
    session: { id: string };
  }) {
    super({
      id: data.id,
      createdAt: data.createdAt,
      error: data.error,
      sessionId: data.session.id,
    });
    this.typename = data.__typename;
  }
}

/**
 * An HTTP replay entry: one request and its response.
 */
export class ReplayEntryHttp extends ReplayEntry {
  readonly kind: typeof ReplaySessionKind.Http = ReplaySessionKind.Http;

  readonly raw: Uint8Array | undefined;
  readonly connection: ConnectionInfo;
  readonly request: Request | undefined;
  readonly response: Response | undefined;
  readonly settings: LatestReplayEntryHttpFullFragment["settings"];

  constructor(data: LatestReplayEntryHttpFullFragment, sessionId?: string) {
    super({
      id: data.id,
      createdAt: data.createdAt,
      error: data.error,
      sessionId: sessionId ?? data.session.id,
    });
    this.raw = decodeBlob(data.raw);
    this.connection = mapToConnectionInfo(data.connection);
    this.request = isPresent(data.request)
      ? mapToRequest(data.request)
      : undefined;
    this.response = isPresent(data.request?.response)
      ? mapToResponse(data.request.response)
      : undefined;
    this.settings = data.settings;
  }
}

/**
 * A WebSocket replay entry: the handshake plus the stream's messages.
 *
 * Added in: Caido v0.57.0.
 */
export class ReplayEntryWs extends ReplayEntry {
  readonly kind: typeof ReplaySessionKind.Ws = ReplaySessionKind.Ws;

  /** The HTTP upgrade request that opened the stream. */
  readonly http: ReplayEntryHttp;
  readonly messages: ReplayWsMessage[];
  readonly stream: ReplayStream | undefined;
  /** The message this entry sends next, when one is staged. */
  readonly draft: ReplayWsDraft | undefined;

  /** The handshake request bytes. Shorthand for `http.raw`. */
  readonly raw: Uint8Array | undefined;
  /** The handshake connection. Shorthand for `http.connection`. */
  readonly connection: ConnectionInfo;
  /** The handshake request. Shorthand for `http.request`. */
  readonly request: Request | undefined;
  /** The handshake response. Shorthand for `http.response`. */
  readonly response: Response | undefined;

  constructor(data: {
    id: string;
    createdAt: string;
    error?: string | null;
    session: { id: string };
    http: LatestReplayEntryHttpFullFragment;
    draft?: LatestReplayEntryWsFullFragment["draft"];
    messages?: StreamWsMessageFullFragment[];
    stream?: StreamFullFragment | null;
  }) {
    super({
      id: data.id,
      createdAt: data.createdAt,
      error: data.error,
      sessionId: data.session.id,
    });
    this.http = new ReplayEntryHttp(data.http, data.session.id);
    this.messages = (data.messages ?? []).map(mapToReplayWsMessage);
    this.stream = isPresent(data.stream)
      ? mapToReplayStream(data.stream)
      : undefined;
    this.draft = isPresent(data.draft)
      ? {
          direction: data.draft.direction,
          format: data.draft.format,
          raw: decodeBlob(data.draft.raw),
        }
      : undefined;

    this.raw = this.http.raw;
    this.connection = this.http.connection;
    this.request = this.http.request;
    this.response = this.http.response;
  }
}

/**
 * A replay entry holding several HTTP entries sent together.
 *
 * Added in: Caido v0.58.0.
 */
export class ReplayEntryPipeline extends ReplayEntry {
  readonly kind: typeof ReplaySessionKind.Pipeline = ReplaySessionKind.Pipeline;

  readonly rank: string;
  readonly strategy: PipelineStrategy | undefined;
  readonly httpEntries: ReplayEntryHttp[];
  readonly activeHttpEntry: ReplayEntryHttp | undefined;

  constructor(data: {
    id: string;
    createdAt: string;
    error?: string | null;
    rank: string;
    session: { id: string };
    settings?: { strategy: PipelineStrategyFragment } | null;
    httpEntries: LatestReplayEntryHttpFullFragment[];
    activeHttpEntry?: LatestReplayEntryHttpFullFragment | null;
  }) {
    super({
      id: data.id,
      createdAt: data.createdAt,
      error: data.error,
      sessionId: data.session.id,
    });
    this.rank = data.rank;
    this.strategy = isPresent(data.settings)
      ? mapToPipelineStrategy(data.settings.strategy)
      : undefined;
    this.httpEntries = data.httpEntries.map(
      (entry) => new ReplayEntryHttp(entry, data.session.id),
    );
    this.activeHttpEntry = isPresent(data.activeHttpEntry)
      ? new ReplayEntryHttp(data.activeHttpEntry, data.session.id)
      : undefined;
  }
}

type PipelineStrategyFragment = Parameters<typeof mapToPipelineStrategy>[0];

/**
 * Build the right entry subclass for a transport fragment.
 */
export const createReplayEntry = (
  fragment: ReplayEntryVersionedFragment,
): AnyReplayEntry => {
  switch (fragment.version) {
    case TransportVersion.V0_59: {
      const data = fragment.data;
      switch (data.__typename) {
        case "ReplayEntryHttp":
          return new ReplayEntryHttp(data);
        case "ReplayEntryWs":
          return new ReplayEntryWs(data);
        case "ReplayEntryHttpPipeline":
          return new ReplayEntryPipeline(data);
        default:
          return new ReplayEntryUnknown(data);
      }
    }
    case TransportVersion.V0_58: {
      const data = fragment.data;
      switch (data.__typename) {
        case "ReplayEntryHttp":
          return new ReplayEntryHttp(data);
        case "ReplayEntryWs":
          return new ReplayEntryWs(data);
        case "ReplayEntryHttpOnePipeline":
          return new ReplayEntryPipeline(data);
        default:
          return new ReplayEntryUnknown(data);
      }
    }
  }
};

/** 0.58 names the pipeline kind `HTTP_ONE_PIPELINE`; 0.59 renamed it. */
const toV058SessionKind = (
  kind: ReplaySessionKindType,
): "HTTP" | "WS" | "HTTP_ONE_PIPELINE" => {
  return kind === ReplaySessionKind.Pipeline ? "HTTP_ONE_PIPELINE" : kind;
};
