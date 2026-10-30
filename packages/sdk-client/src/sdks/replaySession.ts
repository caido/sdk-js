import {
  type AnyReplayEntry,
  createReplayEntry,
  ReplayEntrySDK,
  type ReplayEntryVersionedFragment,
} from "./replayEntry.js";

import { mapToPageInfo } from "@/convert/connection.js";
import { OtherUserError } from "@/errors/index.js";
import {
  CreateReplayPipelineHttpOneSessionDocument,
  type CreateReplaySessionInput,
  type GraphQLClient,
  type PageInfo as GraphQLPageInfo,
  CreateReplaySessionDocument as LatestCreateReplaySessionDocument,
  DeleteReplaySessionsDocument as LatestDeleteReplaySessionsDocument,
  MoveReplaySessionDocument as LatestMoveReplaySessionDocument,
  RenameReplaySessionDocument as LatestRenameReplaySessionDocument,
  ReplaySessionDocument as LatestReplaySessionDocument,
  ReplaySessionEntriesDocument as LatestReplaySessionEntriesDocument,
  type ReplaySessionHttpOnePipelineMetaFragment as LatestReplaySessionHttpOnePipelineMetaFragment,
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
  CreateReplaySessionDocument as V056CreateReplaySessionDocument,
  DeleteReplaySessionsDocument as V056DeleteReplaySessionsDocument,
  MoveReplaySessionDocument as V056MoveReplaySessionDocument,
  RenameReplaySessionDocument as V056RenameReplaySessionDocument,
  ReplaySessionDocument as V056ReplaySessionDocument,
  ReplaySessionEntriesDocument as V056ReplaySessionEntriesDocument,
  type ReplaySessionMetaFragment as V056ReplaySessionMetaFragment,
  ReplaySessionsDocument as V056ReplaySessionsDocument,
  SetActiveReplaySessionEntryDocument as V056SetActiveReplaySessionEntryDocument,
} from "@/transport/v0.56/index.js";
import {
  CreateReplaySessionDocument as V057CreateReplaySessionDocument,
  DeleteReplaySessionsDocument as V057DeleteReplaySessionsDocument,
  MoveReplaySessionDocument as V057MoveReplaySessionDocument,
  RenameReplaySessionDocument as V057RenameReplaySessionDocument,
  ReplaySessionDocument as V057ReplaySessionDocument,
  ReplaySessionEntriesDocument as V057ReplaySessionEntriesDocument,
  type ReplaySessionMetaFragment as V057ReplaySessionMetaFragment,
  ReplaySessionsDocument as V057ReplaySessionsDocument,
  SetActiveReplaySessionEntryDocument as V057SetActiveReplaySessionEntryDocument,
} from "@/transport/v0.57/index.js";
import {
  type ConnectionQueryResult,
  type CreateReplayPipelineSessionOptions,
  type CreateReplaySessionOptions,
  type ID,
  type PipelineStrategy,
  type ReplayRequestSource,
  type ReplaySessionHttpSettings,
  type ReplaySessionKind,
  TransportVersion,
  versioned,
  type VersionedOf,
} from "@/types/index.js";
import { handleGraphQLError } from "@/utils/errors.js";
import { ListBuilder, type ListBuilderVars } from "@/utils/list.js";
import { isAbsent, isPresent } from "@/utils/optional.js";
import { resolveReplayTransport } from "@/utils/replayTransport.js";
import type { Version } from "@/version.js";

export type ReplaySessionVersionedFragment = VersionedOf<{
  [TransportVersion.V0_58]: LatestReplaySessionMetaFragment;
  [TransportVersion.V0_57]: V057ReplaySessionMetaFragment;
  [TransportVersion.V0_56]: V056ReplaySessionMetaFragment;
}>;

/**
 * Any replay session, discriminated by `kind`.
 * @category Replay
 */
export type AnyReplaySession =
  | ReplaySessionHttp
  | ReplaySessionWs
  | ReplaySessionHttpOnePipeline
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
    const transport = await resolveReplayTransport(this.version);

    switch (transport) {
      case TransportVersion.V0_58: {
        const result = await this.graphql.query(
          LatestReplaySessionsDocument,
          variables,
        );
        return this.toResult(result.replaySessions, (node) =>
          versioned(TransportVersion.V0_58, node),
        );
      }
      case TransportVersion.V0_57: {
        const result = await this.graphql.query(
          V057ReplaySessionsDocument,
          variables,
        );
        return this.toResult(result.replaySessions, (node) =>
          versioned(TransportVersion.V0_57, node),
        );
      }
      case TransportVersion.V0_56: {
        const result = await this.graphql.query(
          V056ReplaySessionsDocument,
          variables,
        );
        return this.toResult(result.replaySessions, (node) =>
          versioned(TransportVersion.V0_56, node),
        );
      }
    }
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
        node: createReplaySession(
          this.graphql,
          this.version,
          toFragment(edge.node),
        ),
      })),
    };
  }
}

export class ReplaySessionEntriesListBuilder extends ListBuilder<
  AnyReplayEntry,
  never,
  never
> {
  private sessionId: ID;
  private includeReplayRaw = true;
  private includeRequestRaw = true;
  private includeResponseRaw = true;

  constructor(
    graphql: GraphQLClient,
    private readonly version: Version,
    sessionId: ID,
  ) {
    super(graphql);
    this.sessionId = sessionId;
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
    const transport = await resolveReplayTransport(this.version);

    switch (transport) {
      case TransportVersion.V0_58: {
        const result = await this.graphql.query(
          LatestReplaySessionEntriesDocument,
          variables,
        );
        return this.toResult(result.replaySession, (node) =>
          versioned(TransportVersion.V0_58, node),
        );
      }
      case TransportVersion.V0_57: {
        const result = await this.graphql.query(
          V057ReplaySessionEntriesDocument,
          variables,
        );
        return this.toResult(result.replaySession, (node) =>
          versioned(TransportVersion.V0_57, node),
        );
      }
      case TransportVersion.V0_56: {
        const result = await this.graphql.query(
          V056ReplaySessionEntriesDocument,
          variables,
        );
        return this.toResult(result.replaySession, (node) =>
          versioned(TransportVersion.V0_56, node),
        );
      }
    }
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
      // The session exists but its kind has no entries selection in this
      // transport. Reporting no entries would be a wrong answer, not a
      // degraded one, so say what is unsupported instead.
      throw new OtherUserError(
        "UNSUPPORTED",
        `Replay session kind ${session.__typename ?? "unknown"} is not supported by this SDK`,
      );
    }

    return {
      pageInfo: mapToPageInfo(entries.pageInfo),
      edges: entries.edges.map((edge) => ({
        cursor: edge.cursor,
        node: createReplayEntry(this.graphql, toFragment(edge.node)),
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
    private readonly entries: ReplayEntrySDK,
  ) {}

  /**
   * List replay sessions of every kind.
   * @example
   * const sessions = await client.replay.sessions.list().first(50);
   */
  list(): ReplaySessionsListBuilder {
    return new ReplaySessionsListBuilder(this.graphql, this.version);
  }

  /**
   * Get a replay session by ID.
   * @param id - The ID of the replay session to get.
   * @returns The replay session, or undefined if it does not exist.
   */
  async get(id: ID): Promise<AnyReplaySession | undefined> {
    const transport = await resolveReplayTransport(this.version);
    const variables = { id: id as string };

    switch (transport) {
      case TransportVersion.V0_58: {
        const result = await this.graphql.query(
          LatestReplaySessionDocument,
          variables,
        );
        return this.build(result.replaySession, (session) =>
          versioned(TransportVersion.V0_58, session),
        );
      }
      case TransportVersion.V0_57: {
        const result = await this.graphql.query(
          V057ReplaySessionDocument,
          variables,
        );
        return this.build(result.replaySession, (session) =>
          versioned(TransportVersion.V0_57, session),
        );
      }
      case TransportVersion.V0_56: {
        const result = await this.graphql.query(
          V056ReplaySessionDocument,
          variables,
        );
        return this.build(result.replaySession, (session) =>
          versioned(TransportVersion.V0_56, session),
        );
      }
    }
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
    return createReplaySession(
      this.graphql,
      this.version,
      toFragment(session),
      this.entries,
    );
  }

  /**
   * Create a new replay session.
   * @param options - The options for the replay session.
   * @returns The created replay session.
   */
  async create(
    options?: CreateReplaySessionOptions,
  ): Promise<AnyReplaySession> {
    const requestSource = mapRequestSource(options?.requestSource);
    const kind = options?.kind ?? "HTTP";
    const transport = await resolveReplayTransport(this.version);

    if (kind === "WS" && transport === TransportVersion.V0_56) {
      throw new OtherUserError(
        "UNSUPPORTED",
        "WebSocket replay sessions require Caido 0.57.0 or later",
      );
    }

    if (transport === TransportVersion.V0_56) {
      const result = await this.graphql.mutation(
        V056CreateReplaySessionDocument,
        {
          input: {
            collectionId: options?.collectionId as string | undefined,
            requestSource,
          },
        },
      );
      const session = result.createReplaySession.session;
      if (isAbsent(session)) {
        throw new OtherUserError(
          "INTERNAL",
          "createReplaySession returned no session",
        );
      }
      return createReplaySession(
        this.graphql,
        this.version,
        versioned(TransportVersion.V0_56, session),
        this.entries,
      );
    }

    if (transport === TransportVersion.V0_57) {
      const result = await this.graphql.mutation(
        V057CreateReplaySessionDocument,
        {
          input: {
            kind,
            collectionId: options?.collectionId as string | undefined,
            requestSource,
          },
        },
      );
      if (isPresent(result.createReplaySession.error)) {
        handleGraphQLError(result.createReplaySession.error);
      }
      const session = result.createReplaySession.session;
      if (isAbsent(session)) {
        throw new OtherUserError(
          "INTERNAL",
          "createReplaySession returned no session",
        );
      }
      return createReplaySession(
        this.graphql,
        this.version,
        versioned(TransportVersion.V0_57, session),
        this.entries,
      );
    }

    const result = await this.graphql.mutation(
      LatestCreateReplaySessionDocument,
      {
        input: {
          kind,
          collectionId: options?.collectionId as string | undefined,
          requestSource,
        } satisfies CreateReplaySessionInput,
      },
    );
    if (isPresent(result.createReplaySession.error)) {
      handleGraphQLError(result.createReplaySession.error);
    }
    const session = result.createReplaySession.session;
    if (isAbsent(session)) {
      throw new OtherUserError(
        "INTERNAL",
        "createReplaySession returned no session",
      );
    }
    return createReplaySession(
      this.graphql,
      this.version,
      versioned(TransportVersion.V0_58, session),
      this.entries,
    );
  }

  /**
   * Create a pipeline replay session, which sends several requests together
   * according to a strategy. Supported on Caido 0.58.x only: pipeline sessions
   * were added in 0.58.0 and renamed in 0.59.0.
   *
   * @param options - The requests to pipeline and the strategy to use.
   * @returns The created pipeline session.
   */
  async createPipeline(
    options: CreateReplayPipelineSessionOptions,
  ): Promise<ReplaySessionHttpOnePipeline> {
    // Gate on the resolved transport, not the raw version: 0.59.0 is newer than
    // 0.58.0 yet renamed these types, so only the 0.58 fork can create one.
    const transport = await resolveReplayTransport(this.version);
    if (transport !== TransportVersion.V0_58) {
      throw new OtherUserError(
        "UNSUPPORTED",
        "Pipeline replay sessions are supported only on Caido 0.58.x: they were added in 0.58.0 and renamed in 0.59.0",
      );
    }

    const result = await this.graphql.mutation(
      CreateReplayPipelineHttpOneSessionDocument,
      {
        input: {
          collectionId: options.collectionId as string | undefined,
          requestSources: options.requestSources.map(
            (source) => mapRequestSource(source) as RequestSourceInput,
          ),
          settings: {
            strategy: mapToPipelineStrategyInput(options.strategy),
          },
        },
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
    return new ReplaySessionHttpOnePipeline(
      this.graphql,
      this.version,
      session,
      this.entries,
    );
  }

  /**
   * Delete replay sessions by ID.
   * @param ids - The IDs of the replay sessions to delete.
   */
  async delete(ids: ID[]): Promise<void> {
    const transport = await resolveReplayTransport(this.version);
    switch (transport) {
      case TransportVersion.V0_58:
        await this.graphql.mutation(LatestDeleteReplaySessionsDocument, {
          ids,
        });
        return;
      case TransportVersion.V0_57:
        await this.graphql.mutation(V057DeleteReplaySessionsDocument, { ids });
        return;
      case TransportVersion.V0_56:
        await this.graphql.mutation(V056DeleteReplaySessionsDocument, { ids });
        return;
    }
  }

  /**
   * Move a replay session to a new collection.
   * @param id - The ID of the replay session to move.
   * @param collectionId - The ID of the new collection.
   * @returns The moved replay session.
   */
  async move(id: ID, collectionId: ID): Promise<AnyReplaySession> {
    const transport = await resolveReplayTransport(this.version);
    const variables = {
      id: id as string,
      collectionId: collectionId as string,
    };

    switch (transport) {
      case TransportVersion.V0_58: {
        const result = await this.graphql.mutation(
          LatestMoveReplaySessionDocument,
          variables,
        );
        return this.require(
          result.moveReplaySession.session,
          "moveReplaySession",
          (session) => versioned(TransportVersion.V0_58, session),
        );
      }
      case TransportVersion.V0_57: {
        const result = await this.graphql.mutation(
          V057MoveReplaySessionDocument,
          variables,
        );
        return this.require(
          result.moveReplaySession.session,
          "moveReplaySession",
          (session) => versioned(TransportVersion.V0_57, session),
        );
      }
      case TransportVersion.V0_56: {
        const result = await this.graphql.mutation(
          V056MoveReplaySessionDocument,
          variables,
        );
        return this.require(
          result.moveReplaySession.session,
          "moveReplaySession",
          (session) => versioned(TransportVersion.V0_56, session),
        );
      }
    }
  }

  /**
   * Rename a replay session.
   * @param id - The ID of the replay session to rename.
   * @param name - The new name for the replay session.
   * @returns The renamed replay session.
   */
  async rename(id: ID, name: string): Promise<AnyReplaySession> {
    const transport = await resolveReplayTransport(this.version);
    const variables = { id: id as string, name };

    switch (transport) {
      case TransportVersion.V0_58: {
        const result = await this.graphql.mutation(
          LatestRenameReplaySessionDocument,
          variables,
        );
        return this.require(
          result.renameReplaySession.session,
          "renameReplaySession",
          (session) => versioned(TransportVersion.V0_58, session),
        );
      }
      case TransportVersion.V0_57: {
        const result = await this.graphql.mutation(
          V057RenameReplaySessionDocument,
          variables,
        );
        return this.require(
          result.renameReplaySession.session,
          "renameReplaySession",
          (session) => versioned(TransportVersion.V0_57, session),
        );
      }
      case TransportVersion.V0_56: {
        const result = await this.graphql.mutation(
          V056RenameReplaySessionDocument,
          variables,
        );
        return this.require(
          result.renameReplaySession.session,
          "renameReplaySession",
          (session) => versioned(TransportVersion.V0_56, session),
        );
      }
    }
  }

  /**
   * Set the active entry for a replay session.
   * @param sessionId - The ID of the replay session.
   * @param entryId - The ID of the entry to set as active.
   */
  async setActiveEntry(sessionId: ID, entryId: ID): Promise<void> {
    const transport = await resolveReplayTransport(this.version);
    const variables = { id: sessionId, entryId };

    switch (transport) {
      case TransportVersion.V0_58:
        await this.graphql.mutation(
          LatestSetActiveReplaySessionEntryDocument,
          variables,
        );
        return;
      case TransportVersion.V0_57:
        await this.graphql.mutation(
          V057SetActiveReplaySessionEntryDocument,
          variables,
        );
        return;
      case TransportVersion.V0_56:
        await this.graphql.mutation(
          V056SetActiveReplaySessionEntryDocument,
          variables,
        );
        return;
    }
  }
}

/**
 * Base class for every replay session. Narrow on `kind` to reach the
 * fields specific to one kind of session.
 */
export abstract class ReplaySession {
  abstract readonly kind: ReplaySessionKind | "UNKNOWN";

  readonly id: ID;
  readonly name: string;
  readonly rank: string;
  /** Undefined only for a kind this SDK cannot model. */
  readonly collectionId: ID | undefined;
  readonly activeEntryId: ID | undefined;
  /** Id of the most recent entry, when the transport reports one. */
  readonly lastEntryId: ID | undefined;

  protected readonly graphql: GraphQLClient;
  protected readonly version: Version;
  protected readonly entrySdk: ReplayEntrySDK;

  protected constructor(
    graphql: GraphQLClient,
    version: Version,
    base: {
      id: string;
      name: string;
      rank: string;
      collection?: { id: string };
      activeEntry?: { id: string } | null;
      entries?: { edges: Array<{ node: { id: string } }> };
    },
    entrySdk?: ReplayEntrySDK,
  ) {
    this.graphql = graphql;
    this.version = version;
    this.entrySdk = entrySdk ?? new ReplayEntrySDK(graphql, version);
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
   */
  async setActiveEntry(entryId: ID): Promise<AnyReplaySession> {
    const sdk = new ReplaySessionSDK(this.graphql, this.version, this.entrySdk);
    await sdk.setActiveEntry(this.id, entryId);

    const refreshed = await sdk.get(this.id);
    if (isAbsent(refreshed)) {
      throw new OtherUserError("INTERNAL", "Replay session no longer exists");
    }
    return refreshed;
  }

  /**
   * List the entries of this session.
   */
  entries(): ReplaySessionEntriesListBuilder {
    return new ReplaySessionEntriesListBuilder(
      this.graphql,
      this.version,
      this.id,
    );
  }
}

/**
 * A session whose kind this SDK does not model.
 *
 * Caido can add replay kinds at any time, and renamed the pipeline types in
 * 0.59.0. Rather than failing, such a session is surfaced with the fields
 * every kind shares so it stays visible and identifiable.
 */
export class ReplaySessionUnknown extends ReplaySession {
  readonly kind = "UNKNOWN";

  /** The server-side type name, useful when reporting an unsupported kind. */
  readonly typename: string;

  constructor(
    graphql: GraphQLClient,
    version: Version,
    base: { __typename: string; id: string; name: string; rank: string },
    entrySdk?: ReplayEntrySDK,
  ) {
    super(graphql, version, base, entrySdk);
    this.typename = base.__typename;
  }
}

abstract class ReplaySessionConcrete extends ReplaySession {
  abstract override readonly kind: ReplaySessionKind;

  declare readonly collectionId: ID;

  protected constructor(
    graphql: GraphQLClient,
    version: Version,
    base: {
      id: string;
      name: string;
      rank: string;
      collection: { id: string };
      activeEntry?: { id: string } | null;
      entries?: { edges: Array<{ node: { id: string } }> };
    },
    entrySdk?: ReplayEntrySDK,
  ) {
    super(graphql, version, base, entrySdk);
  }
}

/**
 * An HTTP replay session.
 */
export class ReplaySessionHttp extends ReplaySessionConcrete {
  readonly kind = "HTTP";

  readonly settings: ReplaySessionHttpSettings | undefined;

  constructor(
    graphql: GraphQLClient,
    version: Version,
    data: {
      id: string;
      name: string;
      rank: string;
      collection: { id: string };
      activeEntry?: { id: string } | null;
      settings?: ReplaySessionHttpSettings | null;
    },
    entrySdk?: ReplayEntrySDK,
  ) {
    super(graphql, version, data, entrySdk);
    this.settings = data.settings ?? undefined;
  }
}

/**
 * A WebSocket replay session.
 * Requires Caido 0.57.0 or later.
 */
export class ReplaySessionWs extends ReplaySessionConcrete {
  readonly kind = "WS";

  constructor(
    graphql: GraphQLClient,
    version: Version,
    data: {
      id: string;
      name: string;
      rank: string;
      collection: { id: string };
      activeEntry?: { id: string } | null;
    },
    entrySdk?: ReplayEntrySDK,
  ) {
    super(graphql, version, data, entrySdk);
  }
}

/**
 * A pipeline replay session, which sends several requests together.
 * Requires Caido 0.58.0 or later.
 */
export class ReplaySessionHttpOnePipeline extends ReplaySessionConcrete {
  readonly kind = "HTTP_ONE_PIPELINE";

  readonly strategy: PipelineStrategy | undefined;

  constructor(
    graphql: GraphQLClient,
    version: Version,
    data: LatestReplaySessionHttpOnePipelineMetaFragment,
    entrySdk?: ReplayEntrySDK,
  ) {
    super(graphql, version, data, entrySdk);
    this.strategy = isPresent(data.settings)
      ? mapToPipelineStrategy(data.settings.strategy)
      : undefined;
  }
}

/**
 * Build the right session subclass for a transport fragment.
 */
const createReplaySession = (
  graphql: GraphQLClient,
  version: Version,
  fragment: ReplaySessionVersionedFragment,
  entrySdk?: ReplayEntrySDK,
): AnyReplaySession => {
  switch (fragment.version) {
    case TransportVersion.V0_58: {
      const data = fragment.data;
      switch (data.__typename) {
        case "ReplaySessionHttp":
          return new ReplaySessionHttp(graphql, version, data, entrySdk);
        case "ReplaySessionWs":
          return new ReplaySessionWs(graphql, version, data, entrySdk);
        case "ReplaySessionHttpOnePipeline":
          return new ReplaySessionHttpOnePipeline(
            graphql,
            version,
            data,
            entrySdk,
          );
        default:
          return new ReplaySessionUnknown(graphql, version, data, entrySdk);
      }
    }
    case TransportVersion.V0_57: {
      const data = fragment.data;
      switch (data.__typename) {
        case "ReplaySessionHttp":
          return new ReplaySessionHttp(graphql, version, data, entrySdk);
        case "ReplaySessionWs":
          return new ReplaySessionWs(graphql, version, data, entrySdk);
        default:
          return new ReplaySessionUnknown(graphql, version, data, entrySdk);
      }
    }
    case TransportVersion.V0_56: {
      // 0.56 has a single, HTTP-only replay session type.
      return new ReplaySessionHttp(graphql, version, fragment.data, entrySdk);
    }
  }
};

const mapRequestSource = (
  requestSource: ReplayRequestSource | undefined,
): RequestSourceInput | undefined => {
  if (requestSource === undefined) {
    return undefined;
  }
  if ("id" in requestSource) {
    return { id: requestSource.id };
  }
  return {
    raw: {
      connectionInfo: requestSource.connection,
      raw: requestSource.raw,
    },
  };
};
