import { ReplayEntry } from "./replayEntry.js";

import { mapToPageInfo } from "@/convert/connection.js";
import { OtherUserError } from "@/errors/index.js";
import type {
  GraphQLClient,
  ReplaySessionMetaFragment,
} from "@/graphql/index.js";
import {
  CreateReplaySessionDocument,
  DeleteReplaySessionsDocument,
  MoveReplaySessionDocument,
  RenameReplaySessionDocument,
  ReplaySessionDocument,
  ReplaySessionEntriesDocument,
  ReplaySessionsDocument,
  SetActiveReplaySessionEntryDocument,
} from "@/graphql/index.js";
import type {
  ConnectionInfoInput,
  ConnectionQueryResult,
  CreateReplaySessionOptions,
  ID,
} from "@/types/index.js";
import { ListBuilder, type ListBuilderVars } from "@/utils/list.js";
import { isAbsent } from "@/utils/optional.js";

/**
 * List builder for replay sessions.
 */
export class ReplaySessionsListBuilder extends ListBuilder<
  ReplaySession,
  never,
  never
> {
  override async query(
    vars: ListBuilderVars<never, never>,
  ): Promise<ConnectionQueryResult<ReplaySession>> {
    const result = await this.graphql.query(ReplaySessionsDocument, {
      first: vars.first,
      after: vars.after,
      last: vars.last,
      before: vars.before,
    });

    return {
      pageInfo: mapToPageInfo(result.replaySessions.pageInfo),
      edges: result.replaySessions.edges.map((edge) => ({
        cursor: edge.cursor,
        node: new ReplaySession(this.graphql, edge.node),
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

  constructor(graphql: GraphQLClient, sessionId: ID) {
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
    const result = await this.graphql.query(ReplaySessionEntriesDocument, {
      id: this.sessionId,
      after: vars.after,
      before: vars.before,
      first: vars.first,
      last: vars.last,
      includeReplayRaw: this.includeReplayRaw,
      includeRequestRaw: this.includeRequestRaw,
      includeResponseRaw: this.includeResponseRaw,
    });
    if (isAbsent(result.replaySession)) {
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
      pageInfo: mapToPageInfo(result.replaySession.entries.pageInfo),
      edges: result.replaySession.entries.edges.map((edge) => ({
        cursor: edge.cursor,
        node: new ReplayEntry(this.graphql, edge.node),
      })),
    };
  }
}
/**
 * SDK for replay sessions.
 */
export class ReplaySessionSDK {
  constructor(private readonly graphql: GraphQLClient) {}

  /**
   * List replay sessions.
   * @example
   * const sessions = await client.replay.sessions.list().first(50);
   */
  list(): ReplaySessionsListBuilder {
    return new ReplaySessionsListBuilder(this.graphql);
  }

  /**
   * Get a replay session by ID.
   * @param id - The ID of the replay session to get.
   * @returns The replay session, or undefined if it does not exist.
   */
  async get(id: ID): Promise<ReplaySession | undefined> {
    const result = await this.graphql.query(ReplaySessionDocument, {
      id: id as string,
    });
    if (isAbsent(result.replaySession)) {
      return undefined;
    }
    return new ReplaySession(this.graphql, result.replaySession);
  }

  /**
   * Create a new replay session.
   * @param options - The options for the replay session.
   * @returns The created replay session.
   */
  async create(options?: CreateReplaySessionOptions): Promise<ReplaySession> {
    const input: { collectionId?: string; requestSource?: unknown } = {};
    if (options?.collectionId)
      input.collectionId = options.collectionId as string;
    if (options?.requestSource) {
      input.requestSource =
        "id" in options.requestSource
          ? { id: options.requestSource.id }
          : {
              raw: {
                connectionInfo: options.requestSource.connection,
                raw: options.requestSource.raw,
              },
            };
    }
    const result = await this.graphql.mutation(CreateReplaySessionDocument, {
      input: input as {
        collectionId?: string;
        requestSource?:
          | { id: string }
          | { raw: { connectionInfo: ConnectionInfoInput; raw: string } };
      },
    });
    const session = result.createReplaySession.session;
    if (isAbsent(session)) {
      throw new OtherUserError(
        "INTERNAL",
        "createReplaySession returned no session",
      );
    }
    return new ReplaySession(this.graphql, session);
  }

  /**
   * Delete replay sessions by ID.
   * @param ids - The IDs of the replay sessions to delete.
   */
  async delete(ids: ID[]): Promise<void> {
    await this.graphql.mutation(DeleteReplaySessionsDocument, {
      ids,
    });
  }

  /**
   * Move a replay session to a new collection.
   * @param id - The ID of the replay session to move.
   * @param collectionId - The ID of the new collection.
   * @returns The moved replay session.
   */
  async move(id: ID, collectionId: ID): Promise<ReplaySession> {
    const result = await this.graphql.mutation(MoveReplaySessionDocument, {
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
    return new ReplaySession(this.graphql, session);
  }

  /**
   * Rename a replay session.
   * @param id - The ID of the replay session to rename.
   * @param name - The new name for the replay session.
   * @returns The renamed replay session.
   */
  async rename(id: ID, name: string): Promise<ReplaySession> {
    const result = await this.graphql.mutation(RenameReplaySessionDocument, {
      id: id as string,
      name,
    });
    const session = result.renameReplaySession.session;
    if (isAbsent(session)) {
      throw new OtherUserError(
        "INTERNAL",
        "renameReplaySession returned no session",
      );
    }
    return new ReplaySession(this.graphql, session);
  }

  /**
   * Set the active entry for a replay session.
   * @param sessionId - The ID of the replay session.
   * @param entryId - The ID of the entry to set as active.
   */
  async setActiveEntry(sessionId: ID, entryId: ID): Promise<void> {
    await this.graphql.mutation(SetActiveReplaySessionEntryDocument, {
      id: sessionId,
      entryId,
    });
  }
}

/**
 * Replay session.
 */
export class ReplaySession {
  readonly id: ID;
  readonly name: string;
  readonly collectionId: ID;
  readonly activeEntryId: ID | undefined;

  private readonly graphql: GraphQLClient;

  constructor(graphql: GraphQLClient, data: ReplaySessionMetaFragment) {
    this.graphql = graphql;
    this.id = data.id;
    this.name = data.name;
    this.collectionId = data.collection.id;
    this.activeEntryId = data.activeEntry?.id ?? undefined;
  }

  /**
   * Set the active entry for this session.
   */
  async setActiveEntry(entryId: ID): Promise<ReplaySession> {
    const result = await this.graphql.mutation(
      SetActiveReplaySessionEntryDocument,
      {
        id: this.id,
        entryId,
      },
    );
    const session = result.setActiveReplaySessionEntry.session;
    if (isAbsent(session)) {
      return this;
    }
    return new ReplaySession(this.graphql, session);
  }

  entries(): ReplaySessionEntriesListBuilder {
    return new ReplaySessionEntriesListBuilder(this.graphql, this.id);
  }
}
