import {
  type AnyReplayEntry,
  createReplayEntry,
  type ReplayEntryVersionedFragment,
} from "./replayEntry.js";

import { encodeBlob } from "@/convert/blob.js";
import { mapToPageInfo } from "@/convert/connection.js";
import { OtherUserError } from "@/errors/index.js";
import {
  type CreateReplaySessionInput,
  DeleteReplaySessionsDocument,
  type GraphQLClient,
  type PageInfo as GraphQLPageInfo,
  CreateReplayPipelineHttpSessionDocument as LatestCreateReplayPipelineSessionDocument,
  CreateReplaySessionDocument as LatestCreateReplaySessionDocument,
  MoveReplaySessionDocument as LatestMoveReplaySessionDocument,
  RenameReplaySessionDocument as LatestRenameReplaySessionDocument,
  ReplaySessionDocument as LatestReplaySessionDocument,
  ReplaySessionEntriesDocument as LatestReplaySessionEntriesDocument,
  type ReplaySessionMetaFragment as LatestReplaySessionMetaFragment,
  ReplaySessionsDocument as LatestReplaySessionsDocument,
  SetActiveReplaySessionEntryDocument as LatestSetActiveReplaySessionEntryDocument,
  type RequestSourceInput,
} from "@/graphql/index.js";
import {
  mapToPipelineStrategy,
  mapToPipelineStrategyInput,
} from "@/transport/latest/convert/replay.js";
import {
  CreateReplayPipelineHttpOneSessionDocument as V058CreateReplayPipelineSessionDocument,
  CreateReplaySessionDocument as V058CreateReplaySessionDocument,
  MoveReplaySessionDocument as V058MoveReplaySessionDocument,
  RenameReplaySessionDocument as V058RenameReplaySessionDocument,
  ReplaySessionDocument as V058ReplaySessionDocument,
  ReplaySessionEntriesDocument as V058ReplaySessionEntriesDocument,
  type ReplaySessionMetaFragment as V058ReplaySessionMetaFragment,
  ReplaySessionsDocument as V058ReplaySessionsDocument,
  SetActiveReplaySessionEntryDocument as V058SetActiveReplaySessionEntryDocument,
} from "@/transport/v0.58/index.js";
import {
  type ConnectionQueryResult,
  type CreateReplaySessionHttpOptions,
  type CreateReplaySessionOptions,
  type CreateReplaySessionPipelineOptions,
  type CreateReplaySessionWsOptions,
  type ID,
  type PipelineStrategy,
  type ReplayRequestSource,
  type ReplaySessionHttpSettings,
  ReplaySessionKind,
  type ReplaySessionKind as ReplaySessionKindType,
  type ReplaySessionPipelineSettings,
  TransportVersion,
  versioned,
  type VersionedOf,
} from "@/types/index.js";
import { handleGraphQLError } from "@/utils/errors.js";
import { ListBuilder, type ListBuilderVars } from "@/utils/list.js";
import { isAbsent, isPresent } from "@/utils/optional.js";
import type { Version } from "@/version.js";

export type ReplaySessionVersionedFragment = VersionedOf<{
  [TransportVersion.V0_59]: LatestReplaySessionMetaFragment;
  [TransportVersion.V0_58]: V058ReplaySessionMetaFragment;
}>;

/**
 * Any replay session, discriminated by `kind`.
 * @category Replay
 */
export type AnyReplaySession =
  | ReplaySessionHttp
  | ReplaySessionWs
  | ReplaySessionPipeline
  | ReplaySessionUnknown;

/**
 * List builder for replay sessions.
 */
export class ReplaySessionsListBuilder extends ListBuilder<
  AnyReplaySession,
  never,
  never
> {
  constructor(
    graphql: GraphQLClient,
    private readonly sdk: ReplaySessionSDK,
    private readonly version: Version,
  ) {
    super(graphql);
  }

  override async query(
    vars: ListBuilderVars<never, never>,
  ): Promise<ConnectionQueryResult<AnyReplaySession>> {
    const variables = {
      first: vars.first,
      after: vars.after,
      last: vars.last,
      before: vars.before,
    };

    if (await this.version.gte(TransportVersion.V0_59)) {
      const result = await this.graphql.query(
        LatestReplaySessionsDocument,
        variables,
      );
      return this.toResult(result.replaySessions, (node) =>
        versioned(TransportVersion.V0_59, node),
      );
    }

    const result = await this.graphql.query(
      V058ReplaySessionsDocument,
      variables,
    );
    return this.toResult(result.replaySessions, (node) =>
      versioned(TransportVersion.V0_58, node),
    );
  }

  private toResult<Node>(
    connection: {
      pageInfo: GraphQLPageInfo;
      edges: Array<{ cursor: string; node: Node }>;
    },
    toFragment: (node: Node) => ReplaySessionVersionedFragment,
  ): ConnectionQueryResult<AnyReplaySession> {
    return {
      pageInfo: mapToPageInfo(connection.pageInfo),
      edges: connection.edges.map((edge) => ({
        cursor: edge.cursor,
        node: createReplaySession(this.sdk, toFragment(edge.node)),
      })),
    };
  }
}

/**
 * List builder for the entries of one replay session.
 */
export class ReplaySessionEntriesListBuilder extends ListBuilder<
  AnyReplayEntry,
  never,
  never
> {
  private includeReplayRaw = true;
  private includeRequestRaw = true;
  private includeResponseRaw = true;

  constructor(
    graphql: GraphQLClient,
    private readonly version: Version,
    private readonly sessionId: ID,
  ) {
    super(graphql);
  }

  includeRaw(
    options?:
      | { replay?: boolean; request?: boolean; response?: boolean }
      | boolean,
  ): this {
    if (typeof options === "boolean") {
      this.includeReplayRaw = options;
      this.includeRequestRaw = options;
      this.includeResponseRaw = options;
    } else {
      this.includeReplayRaw = options?.replay ?? true;
      this.includeRequestRaw = options?.request ?? true;
      this.includeResponseRaw = options?.response ?? true;
    }
    return this;
  }

  override async query(
    vars: ListBuilderVars<never, never>,
  ): Promise<ConnectionQueryResult<AnyReplayEntry>> {
    const variables = {
      id: this.sessionId,
      after: vars.after,
      before: vars.before,
      first: vars.first,
      last: vars.last,
      includeReplayRaw: this.includeReplayRaw,
      includeRequestRaw: this.includeRequestRaw,
      includeResponseRaw: this.includeResponseRaw,
    };

    if (await this.version.gte(TransportVersion.V0_59)) {
      const result = await this.graphql.query(
        LatestReplaySessionEntriesDocument,
        variables,
      );
      return this.toResult(result.replaySession, (node) =>
        versioned(TransportVersion.V0_59, node),
      );
    }

    const result = await this.graphql.query(
      V058ReplaySessionEntriesDocument,
      variables,
    );
    return this.toResult(result.replaySession, (node) =>
      versioned(TransportVersion.V0_58, node),
    );
  }

  private toResult<Node>(
    session:
      | {
          __typename?: string;
          entries?: {
            pageInfo: GraphQLPageInfo;
            edges: Array<{ cursor: string; node: Node }>;
          };
        }
      | undefined
      | null,
    toFragment: (node: Node) => ReplayEntryVersionedFragment,
  ): ConnectionQueryResult<AnyReplayEntry> {
    if (isAbsent(session)) {
      return {
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: undefined,
          endCursor: undefined,
        },
        edges: [],
      };
    }

    const entries = session.entries;
    if (isAbsent(entries)) {
      throw new OtherUserError(
        "UNSUPPORTED",
        `Replay session kind ${session.__typename ?? "unknown"} is not supported by this SDK`,
      );
    }

    return {
      pageInfo: mapToPageInfo(entries.pageInfo),
      edges: entries.edges.map((edge) => ({
        cursor: edge.cursor,
        node: createReplayEntry(toFragment(edge.node)),
      })),
    };
  }
}

/**
 * SDK for replay sessions.
 */
export class ReplaySessionSDK {
  constructor(
    private readonly graphql: GraphQLClient,
    private readonly version: Version,
  ) {}

  /**
   * List replay sessions of every kind.
   * @example
   * const sessions = await client.replay.sessions.list().first(50);
   */
  list(): ReplaySessionsListBuilder {
    return new ReplaySessionsListBuilder(this.graphql, this, this.version);
  }

  /**
   * List the entries of one replay session.
   * @param sessionId - The ID of the replay session.
   */
  entriesOf(sessionId: ID): ReplaySessionEntriesListBuilder {
    return new ReplaySessionEntriesListBuilder(
      this.graphql,
      this.version,
      sessionId,
    );
  }

  /**
   * Get a replay session by ID.
   * @param id - The ID of the replay session to get.
   * @returns The replay session, or undefined if it does not exist.
   */
  async get(id: ID): Promise<AnyReplaySession | undefined> {
    const variables = { id: id as string };

    if (await this.version.gte(TransportVersion.V0_59)) {
      const result = await this.graphql.query(
        LatestReplaySessionDocument,
        variables,
      );
      return this.build(result.replaySession, (session) =>
        versioned(TransportVersion.V0_59, session),
      );
    }

    const result = await this.graphql.query(
      V058ReplaySessionDocument,
      variables,
    );
    return this.build(result.replaySession, (session) =>
      versioned(TransportVersion.V0_58, session),
    );
  }

  /**
   * Create a replay session.
   *
   * @param options - The kind of session to create and what to seed it with.
   * @returns The created replay session.
   * @example
   * const http = await client.replay.sessions.create();
   * const ws = await client.replay.sessions.create({ kind: "WS" });
   */
  async create(
    options?: CreateReplaySessionHttpOptions,
  ): Promise<ReplaySessionHttp>;
  async create(options: CreateReplaySessionWsOptions): Promise<ReplaySessionWs>;
  async create(
    options: CreateReplaySessionPipelineOptions,
  ): Promise<ReplaySessionPipeline>;
  async create(options?: CreateReplaySessionOptions): Promise<AnyReplaySession>;
  async create(
    options?: CreateReplaySessionOptions,
  ): Promise<AnyReplaySession> {
    if (options?.kind === ReplaySessionKind.Pipeline) {
      return this.createPipeline(options);
    }
    return this.createSingle(options);
  }

  /**
   * Delete replay sessions by ID.
   * @param ids - The IDs of the replay sessions to delete.
   */
  async delete(ids: ID[]): Promise<void> {
    await this.graphql.mutation(DeleteReplaySessionsDocument, { ids });
  }

  /**
   * Move a replay session to a new collection.
   * @param id - The ID of the replay session to move.
   * @param collectionId - The ID of the new collection.
   * @returns The moved replay session.
   */
  async move(id: ID, collectionId: ID): Promise<AnyReplaySession> {
    const variables = {
      id: id as string,
      collectionId: collectionId as string,
    };

    if (await this.version.gte(TransportVersion.V0_59)) {
      const result = await this.graphql.mutation(
        LatestMoveReplaySessionDocument,
        variables,
      );
      return this.require(
        result.moveReplaySession.session,
        "moveReplaySession",
        (session) => versioned(TransportVersion.V0_59, session),
      );
    }

    const result = await this.graphql.mutation(
      V058MoveReplaySessionDocument,
      variables,
    );
    return this.require(
      result.moveReplaySession.session,
      "moveReplaySession",
      (session) => versioned(TransportVersion.V0_58, session),
    );
  }

  /**
   * Rename a replay session.
   * @param id - The ID of the replay session to rename.
   * @param name - The new name for the replay session.
   * @returns The renamed replay session.
   */
  async rename(id: ID, name: string): Promise<AnyReplaySession> {
    const variables = { id: id as string, name };

    if (await this.version.gte(TransportVersion.V0_59)) {
      const result = await this.graphql.mutation(
        LatestRenameReplaySessionDocument,
        variables,
      );
      return this.require(
        result.renameReplaySession.session,
        "renameReplaySession",
        (session) => versioned(TransportVersion.V0_59, session),
      );
    }

    const result = await this.graphql.mutation(
      V058RenameReplaySessionDocument,
      variables,
    );
    return this.require(
      result.renameReplaySession.session,
      "renameReplaySession",
      (session) => versioned(TransportVersion.V0_58, session),
    );
  }

  /**
   * Set the active entry for a replay session.
   * @param sessionId - The ID of the replay session.
   * @param entryId - The ID of the entry to set as active.
   * @returns The updated replay session.
   */
  async setActiveEntry(sessionId: ID, entryId: ID): Promise<AnyReplaySession> {
    const variables = { id: sessionId, entryId };

    if (await this.version.gte(TransportVersion.V0_59)) {
      const result = await this.graphql.mutation(
        LatestSetActiveReplaySessionEntryDocument,
        variables,
      );
      return this.require(
        result.setActiveReplaySessionEntry.session,
        "setActiveReplaySessionEntry",
        (session) => versioned(TransportVersion.V0_59, session),
      );
    }

    const result = await this.graphql.mutation(
      V058SetActiveReplaySessionEntryDocument,
      variables,
    );
    return this.require(
      result.setActiveReplaySessionEntry.session,
      "setActiveReplaySessionEntry",
      (session) => versioned(TransportVersion.V0_58, session),
    );
  }

  private async createSingle(
    options?: CreateReplaySessionHttpOptions | CreateReplaySessionWsOptions,
  ): Promise<AnyReplaySession> {
    const kind = options?.kind ?? ReplaySessionKind.Http;
    const requestSource = options?.requestSource;
    const input = {
      kind,
      collectionId: options?.collectionId as string | undefined,
      requestSource:
        requestSource === undefined
          ? undefined
          : mapRequestSource(requestSource),
    };

    if (await this.version.gte(TransportVersion.V0_59)) {
      const result = await this.graphql.mutation(
        LatestCreateReplaySessionDocument,
        { input: input satisfies CreateReplaySessionInput },
      );
      if (isPresent(result.createReplaySession.error)) {
        handleGraphQLError(result.createReplaySession.error);
      }
      return this.assertKind(
        this.require(
          result.createReplaySession.session,
          "createReplaySession",
          (session) => versioned(TransportVersion.V0_59, session),
        ),
        kind,
      );
    }

    const result = await this.graphql.mutation(
      V058CreateReplaySessionDocument,
      { input },
    );
    if (isPresent(result.createReplaySession.error)) {
      handleGraphQLError(result.createReplaySession.error);
    }
    return this.assertKind(
      this.require(
        result.createReplaySession.session,
        "createReplaySession",
        (session) => versioned(TransportVersion.V0_58, session),
      ),
      kind,
    );
  }

  private async createPipeline(
    options: CreateReplaySessionPipelineOptions,
  ): Promise<ReplaySessionPipeline> {
    const requestSources = options.requestSources.map(mapRequestSource);
    const strategy = mapToPipelineStrategyInput(options.strategy);
    const collectionId = options.collectionId as string | undefined;

    if (await this.version.gte(TransportVersion.V0_59)) {
      const result = await this.graphql.mutation(
        LatestCreateReplayPipelineSessionDocument,
        {
          input: { collectionId, requestSources, settings: { strategy } },
        },
      );
      if (isPresent(result.createReplayPipelineHttpSession.error)) {
        handleGraphQLError(result.createReplayPipelineHttpSession.error);
      }
      const session = result.createReplayPipelineHttpSession.session;
      if (isAbsent(session)) {
        throw new OtherUserError(
          "INTERNAL",
          "createReplayPipelineHttpSession returned no session",
        );
      }
      return new ReplaySessionPipeline(this, session);
    }

    const result = await this.graphql.mutation(
      V058CreateReplayPipelineSessionDocument,
      {
        input: { collectionId, requestSources, settings: { strategy } },
      },
    );
    if (isPresent(result.createReplayPipelineHttpOneSession.error)) {
      handleGraphQLError(result.createReplayPipelineHttpOneSession.error);
    }
    const session = result.createReplayPipelineHttpOneSession.session;
    if (isAbsent(session)) {
      throw new OtherUserError(
        "INTERNAL",
        "createReplayPipelineHttpOneSession returned no session",
      );
    }
    return new ReplaySessionPipeline(this, session);
  }

  /** The overloads promise a kind, so a mismatch is a bug. */
  private assertKind(
    session: AnyReplaySession,
    kind: ReplaySessionKindType,
  ): AnyReplaySession {
    if (session.kind !== kind) {
      throw new OtherUserError(
        "INTERNAL",
        `createReplaySession returned a ${session.kind} session, expected ${kind}`,
      );
    }
    return session;
  }

  private require<Node>(
    session: Node | undefined | null,
    operation: string,
    toFragment: (session: Node) => ReplaySessionVersionedFragment,
  ): AnyReplaySession {
    const built = this.build(session, toFragment);
    if (isAbsent(built)) {
      throw new OtherUserError("INTERNAL", `${operation} returned no session`);
    }
    return built;
  }

  private build<Node>(
    session: Node | undefined | null,
    toFragment: (session: Node) => ReplaySessionVersionedFragment,
  ): AnyReplaySession | undefined {
    if (isAbsent(session)) {
      return undefined;
    }
    return createReplaySession(this, toFragment(session));
  }
}

/** Base class for every replay session. Narrow on `kind` for the rest. */
export abstract class ReplaySession {
  abstract readonly kind: ReplaySessionKindType | "UNKNOWN";

  readonly id: ID;
  readonly name: string;
  readonly rank: string;
  /** Undefined only for a kind this SDK cannot model. */
  readonly collectionId: ID | undefined;
  readonly activeEntryId: ID | undefined;
  /** Id of the most recent entry, when the transport reports one. */
  readonly lastEntryId: ID | undefined;

  protected constructor(
    protected readonly sdk: ReplaySessionSDK,
    base: {
      id: string;
      name: string;
      rank: string;
      collection?: { id: string };
      activeEntry?: { id: string } | null;
      entries?: { edges: Array<{ node: { id: string } }> };
    },
  ) {
    this.id = base.id;
    this.name = base.name;
    this.rank = base.rank;
    this.collectionId = base.collection?.id;
    this.activeEntryId = base.activeEntry?.id ?? undefined;

    const edges = base.entries?.edges ?? [];
    this.lastEntryId = edges[edges.length - 1]?.node.id;
  }

  /**
   * Set the active entry for this session.
   * @param entryId - The ID of the entry to set as active.
   * @returns The updated replay session.
   */
  async setActiveEntry(entryId: ID): Promise<AnyReplaySession> {
    return this.sdk.setActiveEntry(this.id, entryId);
  }

  /**
   * List the entries of this session.
   */
  entries(): ReplaySessionEntriesListBuilder {
    return this.sdk.entriesOf(this.id);
  }
}

/** A session of a kind this SDK does not model. */
export class ReplaySessionUnknown extends ReplaySession {
  readonly kind = "UNKNOWN";

  /** The server-side type name. */
  readonly typename: string;

  constructor(
    sdk: ReplaySessionSDK,
    base: { __typename: string; id: string; name: string; rank: string },
  ) {
    super(sdk, base);
    this.typename = base.__typename;
  }
}

abstract class ReplaySessionConcrete extends ReplaySession {
  abstract override readonly kind: ReplaySessionKindType;

  declare readonly collectionId: ID;

  protected constructor(
    sdk: ReplaySessionSDK,
    base: {
      id: string;
      name: string;
      rank: string;
      collection: { id: string };
      activeEntry?: { id: string } | null;
      entries?: { edges: Array<{ node: { id: string } }> };
    },
  ) {
    super(sdk, base);
  }
}

/**
 * An HTTP replay session.
 */
export class ReplaySessionHttp extends ReplaySessionConcrete {
  readonly kind: typeof ReplaySessionKind.Http = ReplaySessionKind.Http;

  readonly settings: ReplaySessionHttpSettings | undefined;

  constructor(
    sdk: ReplaySessionSDK,
    data: {
      id: string;
      name: string;
      rank: string;
      collection: { id: string };
      activeEntry?: { id: string } | null;
      entries?: { edges: Array<{ node: { id: string } }> };
      settings?: {
        connectionClose: boolean;
        updateContentLength: boolean;
        stripHttp2ConnectionHeaders?: boolean;
      } | null;
    },
  ) {
    super(sdk, data);
    this.settings = data.settings ?? undefined;
  }
}

/**
 * A WebSocket replay session.
 *
 * Added in: Caido v0.57.0.
 */
export class ReplaySessionWs extends ReplaySessionConcrete {
  readonly kind: typeof ReplaySessionKind.Ws = ReplaySessionKind.Ws;

  constructor(
    sdk: ReplaySessionSDK,
    data: {
      id: string;
      name: string;
      rank: string;
      collection: { id: string };
      activeEntry?: { id: string } | null;
      entries?: { edges: Array<{ node: { id: string } }> };
    },
  ) {
    super(sdk, data);
  }
}

/**
 * A replay session that sends several requests together.
 *
 * Added in: Caido v0.58.0.
 */
export class ReplaySessionPipeline extends ReplaySessionConcrete {
  readonly kind: typeof ReplaySessionKind.Pipeline = ReplaySessionKind.Pipeline;

  readonly settings: ReplaySessionPipelineSettings | undefined;
  /** Shorthand for `settings.strategy`. */
  readonly strategy: PipelineStrategy | undefined;

  constructor(
    sdk: ReplaySessionSDK,
    data: {
      id: string;
      name: string;
      rank: string;
      collection: { id: string };
      activeEntry?: { id: string } | null;
      entries?: { edges: Array<{ node: { id: string } }> };
      settings?: {
        strategy: Parameters<typeof mapToPipelineStrategy>[0];
        updateContentLength?: boolean;
        stripHttp2ConnectionHeaders?: boolean;
      } | null;
    },
  ) {
    super(sdk, data);
    this.settings = isPresent(data.settings)
      ? {
          strategy: mapToPipelineStrategy(data.settings.strategy),
          updateContentLength: data.settings.updateContentLength,
          stripHttp2ConnectionHeaders:
            data.settings.stripHttp2ConnectionHeaders,
        }
      : undefined;
    this.strategy = this.settings?.strategy;
  }
}

/**
 * Build the right session subclass for a transport fragment.
 */
const createReplaySession = (
  sdk: ReplaySessionSDK,
  fragment: ReplaySessionVersionedFragment,
): AnyReplaySession => {
  switch (fragment.version) {
    case TransportVersion.V0_59: {
      const data = fragment.data;
      switch (data.__typename) {
        case "ReplaySessionHttp":
          return new ReplaySessionHttp(sdk, data);
        case "ReplaySessionWs":
          return new ReplaySessionWs(sdk, data);
        case "ReplaySessionHttpPipeline":
          return new ReplaySessionPipeline(sdk, data);
        default:
          return new ReplaySessionUnknown(sdk, data);
      }
    }
    case TransportVersion.V0_58: {
      const data = fragment.data;
      switch (data.__typename) {
        case "ReplaySessionHttp":
          return new ReplaySessionHttp(sdk, data);
        case "ReplaySessionWs":
          return new ReplaySessionWs(sdk, data);
        case "ReplaySessionHttpOnePipeline":
          return new ReplaySessionPipeline(sdk, data);
        default:
          return new ReplaySessionUnknown(sdk, data);
      }
    }
  }
};

const mapRequestSource = (
  requestSource: ReplayRequestSource,
): RequestSourceInput => {
  if ("id" in requestSource) {
    return { id: requestSource.id };
  }
  return {
    raw: {
      connectionInfo: requestSource.connection,
      raw: encodeBlob(requestSource.raw),
    },
  };
};
