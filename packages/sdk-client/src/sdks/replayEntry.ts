import {
  type GraphQLClient,
  ReplayEntryDocument as LatestReplayEntryDocument,
  type ReplayEntryFullFragment as LatestReplayEntryFullFragment,
  type ReplayEntryHttpFullFragment as LatestReplayEntryHttpFullFragment,
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
  ReplayEntryDocument as V056ReplayEntryDocument,
  type ReplayEntryFullFragment as V056ReplayEntryFullFragment,
} from "@/transport/v0.56/index.js";
import {
  ReplayEntryDocument as V057ReplayEntryDocument,
  type ReplayEntryFullFragment as V057ReplayEntryFullFragment,
} from "@/transport/v0.57/index.js";
import {
  type ConnectionInfo,
  type ID,
  type PipelineStrategy,
  type ReplaySessionKind,
  type ReplayStream,
  type ReplayWsMessage,
  type Request,
  type Response,
  TransportVersion,
  versioned,
  type VersionedOf,
} from "@/types/index.js";
import { isAbsent, isPresent } from "@/utils/optional.js";
import { resolveReplayTransport } from "@/utils/replayTransport.js";
import type { Version } from "@/version.js";

export type ReplayEntryVersionedFragment = VersionedOf<{
  [TransportVersion.V0_58]: LatestReplayEntryFullFragment;
  [TransportVersion.V0_57]: V057ReplayEntryFullFragment;
  [TransportVersion.V0_56]: V056ReplayEntryFullFragment;
}>;

/**
 * Any replay entry, discriminated by `kind`.
 * @category Replay
 */
export type AnyReplayEntry =
  | ReplayEntryHttp
  | ReplayEntryWs
  | ReplayEntryHttpOnePipeline
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
  async get(id: ID, kind: "HTTP"): Promise<ReplayEntryHttp | undefined>;
  async get(id: ID, kind: "WS"): Promise<ReplayEntryWs | undefined>;
  async get(
    id: ID,
    kind: "HTTP_ONE_PIPELINE",
  ): Promise<ReplayEntryHttpOnePipeline | undefined>;
  async get(
    id: ID,
    kind: ReplaySessionKind,
  ): Promise<AnyReplayEntry | undefined>;
  async get(
    id: ID,
    kind: ReplaySessionKind = "HTTP",
  ): Promise<AnyReplayEntry | undefined> {
    const includeReplayRaw = true;
    const includeRequestRaw = true;
    const includeResponseRaw = true;
    const transport = await resolveReplayTransport(this.version);

    if (transport === TransportVersion.V0_58) {
      const result = await this.graphql.query(LatestReplayEntryDocument, {
        id: id as string,
        sessionKind: kind,
        includeReplayRaw,
        includeRequestRaw,
        includeResponseRaw,
      });
      if (isAbsent(result.replayEntry)) {
        return undefined;
      }
      return createReplayEntry(
        this.graphql,
        versioned(TransportVersion.V0_58, result.replayEntry),
      );
    }

    if (transport === TransportVersion.V0_57) {
      assertKindSupported(kind, TransportVersion.V0_57);
      const result = await this.graphql.query(V057ReplayEntryDocument, {
        id: id as string,
        sessionKind: kind,
        includeReplayRaw,
        includeRequestRaw,
        includeResponseRaw,
      });
      if (isAbsent(result.replayEntry)) {
        return undefined;
      }
      return createReplayEntry(
        this.graphql,
        versioned(TransportVersion.V0_57, result.replayEntry),
      );
    }

    assertKindSupported(kind, TransportVersion.V0_56);
    const result = await this.graphql.query(V056ReplayEntryDocument, {
      id: id as string,
      includeReplayRaw,
      includeRequestRaw,
      includeResponseRaw,
    });
    if (isAbsent(result.replayEntry)) {
      return undefined;
    }
    return createReplayEntry(
      this.graphql,
      versioned(TransportVersion.V0_56, result.replayEntry),
    );
  }
}

/**
 * Base class for every replay entry. Narrow on `kind` to reach the
 * fields specific to one kind of entry.
 */
export abstract class ReplayEntry {
  abstract readonly kind: ReplaySessionKind | "UNKNOWN";

  readonly id: ID;
  readonly createdAt: Date;
  readonly error: string | undefined;
  readonly sessionId: ID;

  protected readonly graphql: GraphQLClient;

  protected constructor(
    graphql: GraphQLClient,
    base: {
      id: string;
      createdAt: string;
      error?: string | null;
      sessionId: string;
    },
  ) {
    this.graphql = graphql;
    this.id = base.id;
    this.createdAt = new Date(base.createdAt);
    this.error = base.error ?? undefined;
    this.sessionId = base.sessionId;
  }
}

/**
 * An entry whose kind this SDK does not model. Carries the fields every
 * replay entry shares, so it stays visible rather than failing.
 */
export class ReplayEntryUnknown extends ReplayEntry {
  readonly kind = "UNKNOWN";

  /** The server-side type name, useful when reporting an unsupported kind. */
  readonly typename: string;

  constructor(
    graphql: GraphQLClient,
    data: {
      __typename: string;
      id: string;
      createdAt: string;
      error?: string | null;
      session: { id: string };
    },
  ) {
    super(graphql, {
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
  readonly kind = "HTTP";

  readonly raw: Uint8Array | undefined;
  readonly connection: ConnectionInfo;
  readonly request: Request | undefined;
  readonly response: Response | undefined;
  readonly settings: { placeholders: unknown[] };

  constructor(
    graphql: GraphQLClient,
    data: LatestReplayEntryHttpFullFragment,
    sessionId?: string,
  ) {
    super(graphql, {
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
 * A WebSocket replay entry: the opening handshake plus the messages
 * exchanged on the resulting stream.
 *
 * The handshake's request/response are also surfaced directly on this entry
 * (`raw`, `connection`, `request`, `response`) so code written against the
 * HTTP-only shape keeps working.
 */
export class ReplayEntryWs extends ReplayEntry {
  readonly kind = "WS";

  /** The HTTP upgrade request that opened the stream. */
  readonly http: ReplayEntryHttp;
  readonly messages: ReplayWsMessage[];
  readonly stream: ReplayStream | undefined;

  readonly raw: Uint8Array | undefined;
  readonly connection: ConnectionInfo;
  readonly request: Request | undefined;
  readonly response: Response | undefined;

  constructor(
    graphql: GraphQLClient,
    data: {
      id: string;
      createdAt: string;
      error?: string | null;
      session: { id: string };
      http: LatestReplayEntryHttpFullFragment;
      messages?: StreamWsMessageFullFragment[];
      stream?: StreamFullFragment | null;
    },
  ) {
    super(graphql, {
      id: data.id,
      createdAt: data.createdAt,
      error: data.error,
      sessionId: data.session.id,
    });
    this.http = new ReplayEntryHttp(graphql, data.http, data.session.id);
    this.messages = (data.messages ?? []).map(mapToReplayWsMessage);
    this.stream = isPresent(data.stream)
      ? mapToReplayStream(data.stream)
      : undefined;

    this.raw = this.http.raw;
    this.connection = this.http.connection;
    this.request = this.http.request;
    this.response = this.http.response;
  }
}

/**
 * A pipeline replay entry: several HTTP entries dispatched together
 * according to a strategy. Requires Caido 0.58.0 or later.
 */
export class ReplayEntryHttpOnePipeline extends ReplayEntry {
  readonly kind = "HTTP_ONE_PIPELINE";

  readonly rank: string;
  readonly strategy: PipelineStrategy | undefined;
  readonly httpEntries: ReplayEntryHttp[];
  readonly activeHttpEntry: ReplayEntryHttp | undefined;

  constructor(
    graphql: GraphQLClient,
    data: Extract<
      LatestReplayEntryFullFragment,
      { __typename: "ReplayEntryHttpOnePipeline" }
    >,
  ) {
    super(graphql, {
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
      (entry) => new ReplayEntryHttp(graphql, entry, data.session.id),
    );
    this.activeHttpEntry = isPresent(data.activeHttpEntry)
      ? new ReplayEntryHttp(graphql, data.activeHttpEntry, data.session.id)
      : undefined;
  }
}

/**
 * Build the right entry subclass for a transport fragment.
 */
export const createReplayEntry = (
  graphql: GraphQLClient,
  fragment: ReplayEntryVersionedFragment,
): AnyReplayEntry => {
  switch (fragment.version) {
    case TransportVersion.V0_58: {
      const data = fragment.data;
      switch (data.__typename) {
        case "ReplayEntryHttp":
          return new ReplayEntryHttp(graphql, data);
        case "ReplayEntryWs":
          return new ReplayEntryWs(graphql, data);
        case "ReplayEntryHttpOnePipeline":
          return new ReplayEntryHttpOnePipeline(graphql, data);
        default:
          return new ReplayEntryUnknown(graphql, data);
      }
    }
    case TransportVersion.V0_57: {
      const data = fragment.data;
      switch (data.__typename) {
        case "ReplayEntryHttp":
          return new ReplayEntryHttp(graphql, data);
        case "ReplayEntryWs":
          return new ReplayEntryWs(graphql, data);
        default:
          return new ReplayEntryUnknown(graphql, data);
      }
    }
    case TransportVersion.V0_56: {
      // 0.56 has a single, HTTP-only replay entry type.
      const data = fragment.data;
      return new ReplayEntryHttp(graphql, {
        ...data,
        __typename: "ReplayEntryHttp",
      });
    }
  }
};

function assertKindSupported(
  kind: ReplaySessionKind,
  transport: typeof TransportVersion.V0_56 | typeof TransportVersion.V0_57,
): asserts kind is "HTTP" | "WS" {
  if (kind === "HTTP_ONE_PIPELINE") {
    // Reached below 0.58.0, and also on 0.59.0+ where these types were
    // renamed to a shape this SDK does not model yet.
    throw new Error(
      "Pipeline replay sessions are supported only on Caido 0.58.x: they were added in 0.58.0 and renamed in 0.59.0",
    );
  }
  if (kind === "WS" && transport === TransportVersion.V0_56) {
    throw new Error("WebSocket replay sessions require Caido 0.57.0 or later");
  }
}
