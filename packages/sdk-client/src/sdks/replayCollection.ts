import { mapToPageInfo } from "@/convert/connection.js";
import { OtherUserError } from "@/errors/misc.js";
import type {
  GraphQLClient,
  ReplaySessionCollectionMetaFragment,
} from "@/graphql/index.js";
import {
  CreateReplaySessionCollectionDocument,
  DeleteReplaySessionCollectionDocument,
  RenameReplaySessionCollectionDocument,
  ReplaySessionCollectionsDocument,
} from "@/graphql/index.js";
import type {
  ConnectionQueryResult,
  CreateReplaySessionCollectionOptions,
  ID,
  RankInput,
} from "@/types/index.js";
import { handleGraphQLError } from "@/utils/errors.js";
import { ListBuilder, type ListBuilderVars } from "@/utils/list.js";
import { isAbsent, isPresent } from "@/utils/optional.js";

/**
 * List builder for replay session collections.
 */
export class ReplayCollectionsListBuilder extends ListBuilder<
  ReplaySessionCollection,
  never,
  never
> {
  override async query(
    vars: ListBuilderVars<never, never>,
  ): Promise<ConnectionQueryResult<ReplaySessionCollection>> {
    const result = await this.graphql.query(ReplaySessionCollectionsDocument, {
      first: vars.first,
      after: vars.after,
      last: vars.last,
      before: vars.before,
    });
    return {
      pageInfo: mapToPageInfo(result.replaySessionCollections.pageInfo),
      edges: result.replaySessionCollections.edges.map((e) => ({
        cursor: e.cursor,
        node: new ReplaySessionCollection(this.graphql, e.node),
      })),
    };
  }
}

/**
 * SDK for replay session collections.
 */
export class ReplayCollectionSDK {
  constructor(private readonly graphql: GraphQLClient) {}

  /**
   * List replay session collections (cursor-based). Thenable builder; chain pagination then await.
   * @example
   * const collections = await client.replay.collections.list().first(50);
   */
  list(): ReplayCollectionsListBuilder {
    return new ReplayCollectionsListBuilder(this.graphql);
  }

  /**
   * Create a new replay session collection.
   * @param options - The options for the replay session collection.
   * @returns The created replay session collection.
   */
  async create(
    options: CreateReplaySessionCollectionOptions,
  ): Promise<ReplaySessionCollection> {
    const result = await this.graphql.mutation(
      CreateReplaySessionCollectionDocument,
      {
        input: { name: options.name },
      },
    );
    const collection = result.createReplaySessionCollection.collection;
    if (isAbsent(collection)) {
      throw new OtherUserError(
        "INTERNAL",
        "createReplaySessionCollection returned no collection",
      );
    }
    return new ReplaySessionCollection(this.graphql, collection);
  }

  /**
   * Delete a replay session collection.
   * @param id - The ID of the replay session collection to delete.
   */
  async delete(id: ID): Promise<void> {
    await this.graphql.mutation(DeleteReplaySessionCollectionDocument, {
      id,
    });
  }

  /**
   * Rename a replay session collection.
   * @param id - The ID of the replay session collection to rename.
   * @param name - The new name for the replay session collection.
   * @returns The renamed replay session collection.
   */
  async rename(id: ID, name: string): Promise<ReplaySessionCollection> {
    const result = await this.graphql.mutation(
      RenameReplaySessionCollectionDocument,
      { id: id as string, name },
    );
    const collection = result.renameReplaySessionCollection.collection;
    if (isAbsent(collection)) {
      throw new OtherUserError(
        "INTERNAL",
        "renameReplaySessionCollection returned no collection",
      );
    }
    return new ReplaySessionCollection(this.graphql, collection);
  }
}

/**
 * Replay collection.
 */
export class ReplaySessionCollection {
  readonly id: ID;
  readonly name: string;

  private readonly graphql: GraphQLClient;

  constructor(
    graphql: GraphQLClient,
    data: ReplaySessionCollectionMetaFragment,
  ) {
    this.graphql = graphql;
    this.id = data.id;
    this.name = data.name;
  }
}
