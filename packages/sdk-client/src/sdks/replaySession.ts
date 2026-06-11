import { ReplayEntry } from "./replayEntry.js";

import { mapToPageInfo } from "@/convert/connection.js";
import { OtherUserError } from "@/errors/index.js";
import {
  type CreateReplaySessionInput,
  type GraphQLClient,
  CreateReplaySessionDocument as LatestCreateReplaySessionDocument,
  DeleteReplaySessionsDocument as LatestDeleteReplaySessionsDocument,
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
  type ConnectionInfoInput,
  type ConnectionQueryResult,
  type CreateReplaySessionOptions,
  type ID,
  TransportVersion,
  versioned,
  type VersionedOf,
} from "@/types/index.js";
import { handleGraphQLError } from "@/utils/errors.js";
import { ListBuilder, type ListBuilderVars } from "@/utils/list.js";
import { isAbsent, isPresent } from "@/utils/optional.js";
import type { Version } from "@/version.js";

export type ReplaySessionVersionedFragment = VersionedOf<{
  [TransportVersion.V0_57]: LatestReplaySessionMetaFragment;
  [TransportVersion.V0_56]: V056ReplaySessionMetaFragment;
}>;

/**
 * List builder for replay sessions.
 */
export class ReplaySessionsListBuilder extends ListBuilder<
  ReplaySession,
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
  ): Promise<ConnectionQueryResult<ReplaySession>> {
    const variables = {
      first: vars.first,
      after: vars.after,
      last: vars.last,
      before: vars.before,
    };

    if (await this.version.gte(TransportVersion.V0_57)) {
      const result = await this.graphql.query(
        LatestReplaySessionsDocument,
        variables,
      );
      return {
        pageInfo: mapToPageInfo(result.replaySessions.pageInfo),
        edges: result.replaySessions.edges.map((edge) => ({
          cursor: edge.cursor,
          node: new ReplaySession(
            this.graphql,
            this.version,
            versioned(TransportVersion.V0_57, edge.node),
          ),
        })),
      };
    }

    const result = await this.graphql.query(
      V056ReplaySessionsDocument,
      variables,
    );
    return {
      pageInfo: mapToPageInfo(result.replaySessions.pageInfo),
      edges: result.replaySessions.edges.map((edge) => ({
        cursor: edge.cursor,
        node: new ReplaySession(
          this.graphql,
          this.version,
          versioned(TransportVersion.V0_56, edge.node),
        ),
      })),
    };
  }
}

export class ReplaySessionEntriesListBuilder extends ListBuilder<
  ReplayEntry,
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
  ): Promise<ConnectionQueryResult<ReplayEntry>> {
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

    if (await this.version.gte(TransportVersion.V0_57)) {
      const result = await this.graphql.query(
        LatestReplaySessionEntriesDocument,
        variables,
      );
      const entries = result.replaySession?.entries;
      if (isAbsent(entries)) {
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

      return {
        pageInfo: mapToPageInfo(entries.pageInfo),
        edges: entries.edges.map((edge) => ({
          cursor: edge.cursor,
          node: new ReplayEntry(
            this.graphql,
            versioned(TransportVersion.V0_57, edge.node),
          ),
        })),
      };
    }

    const result = await this.graphql.query(
      V056ReplaySessionEntriesDocument,
      variables,
    );
    const entries = result.replaySession?.entries;
    if (isAbsent(entries)) {
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

    return {
      pageInfo: mapToPageInfo(entries.pageInfo),
      edges: entries.edges.map((edge) => ({
        cursor: edge.cursor,
        node: new ReplayEntry(
          this.graphql,
          versioned(TransportVersion.V0_56, edge.node),
        ),
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
   * List replay sessions.
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
  async get(id: ID): Promise<ReplaySession | undefined> {
    if (await this.version.gte(TransportVersion.V0_57)) {
      const result = await this.graphql.query(LatestReplaySessionDocument, {
        id: id as string,
      });
      if (isAbsent(result.replaySession)) {
        return undefined;
      }
      return new ReplaySession(
        this.graphql,
        this.version,
        versioned(TransportVersion.V0_57, result.replaySession),
      );
    }

    const result = await this.graphql.query(V056ReplaySessionDocument, {
      id: id as string,
    });
    if (isAbsent(result.replaySession)) {
      return undefined;
    }
    return new ReplaySession(
      this.graphql,
      this.version,
      versioned(TransportVersion.V0_56, result.replaySession),
    );
  }

  /**
   * Create a new replay session.
   * @param options - The options for the replay session.
   * @returns The created replay session.
   */
  async create(options?: CreateReplaySessionOptions): Promise<ReplaySession> {
    const requestSource = mapRequestSource(options?.requestSource);

    if (await this.version.gte(TransportVersion.V0_57)) {
      const input: CreateReplaySessionInput = {
        kind: "HTTP",
        collectionId: options?.collectionId as string | undefined,
        requestSource,
      };

      const result = await this.graphql.mutation(
        LatestCreateReplaySessionDocument,
        { input },
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
      return new ReplaySession(
        this.graphql,
        this.version,
        versioned(TransportVersion.V0_57, session),
      );
    }

    const input: {
      collectionId?: string;
      requestSource?: RequestSourceInput;
    } = {
      collectionId: options?.collectionId as string | undefined,
      requestSource,
    };

    const result = await this.graphql.mutation(
      V056CreateReplaySessionDocument,
      {
        input,
      },
    );
    const session = result.createReplaySession.session;
    if (isAbsent(session)) {
      throw new OtherUserError(
        "INTERNAL",
        "createReplaySession returned no session",
      );
    }
    return new ReplaySession(
      this.graphql,
      this.version,
      versioned(TransportVersion.V0_56, session),
    );
  }

  /**
   * Delete replay sessions by ID.
   * @param ids - The IDs of the replay sessions to delete.
   */
  async delete(ids: ID[]): Promise<void> {
    if (await this.version.gte(TransportVersion.V0_57)) {
      await this.graphql.mutation(LatestDeleteReplaySessionsDocument, { ids });
      return;
    }

    await this.graphql.mutation(V056DeleteReplaySessionsDocument, { ids });
  }

  /**
   * Move a replay session to a new collection.
   * @param id - The ID of the replay session to move.
   * @param collectionId - The ID of the new collection.
   * @returns The moved replay session.
   */
  async move(id: ID, collectionId: ID): Promise<ReplaySession> {
    if (await this.version.gte(TransportVersion.V0_57)) {
      const result = await this.graphql.mutation(
        LatestMoveReplaySessionDocument,
        {
          id: id as string,
          collectionId: collectionId as string,
        },
      );
      const session = result.moveReplaySession.session;
      if (isAbsent(session)) {
        throw new OtherUserError(
          "INTERNAL",
          "moveReplaySession returned no session",
        );
      }
      return new ReplaySession(
        this.graphql,
        this.version,
        versioned(TransportVersion.V0_57, session),
      );
    }

    const result = await this.graphql.mutation(V056MoveReplaySessionDocument, {
      id: id as string,
      collectionId: collectionId as string,
    });
    const session = result.moveReplaySession.session;
    if (isAbsent(session)) {
      throw new OtherUserError(
        "INTERNAL",
        "moveReplaySession returned no session",
      );
    }
    return new ReplaySession(
      this.graphql,
      this.version,
      versioned(TransportVersion.V0_56, session),
    );
  }

  /**
   * Rename a replay session.
   * @param id - The ID of the replay session to rename.
   * @param name - The new name for the replay session.
   * @returns The renamed replay session.
   */
  async rename(id: ID, name: string): Promise<ReplaySession> {
    if (await this.version.gte(TransportVersion.V0_57)) {
      const result = await this.graphql.mutation(
        LatestRenameReplaySessionDocument,
        {
          id: id as string,
          name,
        },
      );
      const session = result.renameReplaySession.session;
      if (isAbsent(session)) {
        throw new OtherUserError(
          "INTERNAL",
          "renameReplaySession returned no session",
        );
      }
      return new ReplaySession(
        this.graphql,
        this.version,
        versioned(TransportVersion.V0_57, session),
      );
    }

    const result = await this.graphql.mutation(
      V056RenameReplaySessionDocument,
      {
        id: id as string,
        name,
      },
    );
    const session = result.renameReplaySession.session;
    if (isAbsent(session)) {
      throw new OtherUserError(
        "INTERNAL",
        "renameReplaySession returned no session",
      );
    }
    return new ReplaySession(
      this.graphql,
      this.version,
      versioned(TransportVersion.V0_56, session),
    );
  }

  /**
   * Set the active entry for a replay session.
   * @param sessionId - The ID of the replay session.
   * @param entryId - The ID of the entry to set as active.
   * @returns The updated replay session.
   */
  async setActiveEntry(sessionId: ID, entryId: ID): Promise<ReplaySession> {
    if (await this.version.gte(TransportVersion.V0_57)) {
      const result = await this.graphql.mutation(
        LatestSetActiveReplaySessionEntryDocument,
        {
          id: sessionId as string,
          entryId: entryId as string,
        },
      );
      const session = result.setActiveReplaySessionEntry.session;
      if (isAbsent(session)) {
        throw new OtherUserError(
          "INTERNAL",
          "setActiveReplaySessionEntry returned no session",
        );
      }
      return new ReplaySession(
        this.graphql,
        this.version,
        versioned(TransportVersion.V0_57, session),
      );
    }

    const result = await this.graphql.mutation(
      V056SetActiveReplaySessionEntryDocument,
      {
        id: sessionId as string,
        entryId: entryId as string,
      },
    );
    const session = result.setActiveReplaySessionEntry.session;
    if (isAbsent(session)) {
      throw new OtherUserError(
        "INTERNAL",
        "setActiveReplaySessionEntry returned no session",
      );
    }
    return new ReplaySession(
      this.graphql,
      this.version,
      versioned(TransportVersion.V0_56, session),
    );
  }

  /**
   * Get entries for a replay session.
   * @param sessionId - The ID of the replay session.
   * @returns A list builder for replay entries.
   */
  entries(sessionId: ID): ReplaySessionEntriesListBuilder {
    return new ReplaySessionEntriesListBuilder(
      this.graphql,
      this.version,
      sessionId,
    );
  }
}

/**
 * SDK for a replay session.
 */
export class ReplaySession {
  readonly id: string;
  readonly name: string;
  readonly collectionId: string;
  readonly activeEntryId: string | undefined;

  private readonly graphql: GraphQLClient;
  private readonly version: Version;
  private readonly sdk: ReplaySessionSDK;

  constructor(
    graphql: GraphQLClient,
    version: Version,
    data: ReplaySessionVersionedFragment,
  ) {
    this.graphql = graphql;
    this.version = version;
    this.sdk = new ReplaySessionSDK(graphql, version);
    this.id = data.data.id;
    this.name = data.data.name;
    this.collectionId = data.data.collection.id;
    this.activeEntryId = data.data.activeEntry?.id;
  }

  /**
   * Gets the entries of the replay session.
   * @returns A list builder for replay entries.
   */
  entries(): ReplaySessionEntriesListBuilder {
    return new ReplaySessionEntriesListBuilder(
      this.graphql,
      this.version,
      this.id,
    );
  }

  /**
   * Moves the replay session to a new collection.
   * @param collectionId - The ID of the new collection.
   * @returns The updated replay session.
   */
  async move(collectionId: ID): Promise<ReplaySession> {
    return this.sdk.move(this.id, collectionId);
  }

  /**
   * Renames the replay session.
   * @param name - The new name for the replay session.
   * @returns The updated replay session.
   */
  async rename(name: string): Promise<ReplaySession> {
    return this.sdk.rename(this.id, name);
  }

  /**
   * Deletes the replay session.
   */
  async delete(): Promise<void> {
    return this.sdk.delete([this.id]);
  }

  /**
   * Sets an entry as active.
   * @param entryId - The ID of the entry to set as active.
   * @returns The updated replay session.
   */
  async setActiveEntry(entryId: ID): Promise<ReplaySession> {
    return this.sdk.setActiveEntry(this.id, entryId);
  }
}

function mapRequestSource(
  source?: { id: string } | { connection: ConnectionInfoInput; raw: string },
): RequestSourceInput | undefined {
  if (!source) {
    return undefined;
  }

  if ("id" in source) {
    return { id: source.id };
  }

  return {
    raw: {
      connectionInfo: source.connection,
      raw: source.raw,
    },
  };
}
