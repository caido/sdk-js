import { mapToPageInfo } from "@/convert/connection.js";
import { mapToFinding } from "@/convert/finding.js";
import type {
  FilterClauseFindingInput,
  FindingOrderInput,
  GraphQLClient,
} from "@/graphql/index.js";
import {
  CreateFindingDocument,
  FindingDocument,
  FindingsDocument,
  UpdateFindingDocument,
} from "@/graphql/index.js";
import {
  type ConnectionQueryResult,
  type CreateFindingOptions,
  type Finding,
  type ID,
  type UpdateFindingOptions,
} from "@/types/index.js";
import { handleGraphQLError } from "@/utils/errors.js";
import { ListBuilder, type ListBuilderVars } from "@/utils/list.js";
import { isAbsent, isPresent } from "@/utils/optional.js";

/**
 * List builder for findings.
 */
export class FindingsListBuilder extends ListBuilder<
  Finding,
  FilterClauseFindingInput,
  FindingOrderInput
> {
  constructor(graphql: GraphQLClient) {
    super(graphql);
  }

  async query(
    vars: ListBuilderVars<FilterClauseFindingInput, FindingOrderInput>,
  ): Promise<ConnectionQueryResult<Finding>> {
    const result = await this.graphql.query(FindingsDocument, vars);
    return {
      pageInfo: mapToPageInfo(result.findings.pageInfo),
      edges: result.findings.edges.map((e) => ({
        cursor: e.cursor,
        node: mapToFinding(e.node),
      })),
    };
  }
}

/**
 * SDK for findings: get, list, create, update, delete.
 */
export class FindingSDK {
  constructor(private readonly graphql: GraphQLClient) {}

  /**
   * Get a finding.
   *
   * @param id - The ID of the finding to get.
   * @returns The finding, or undefined if it does not exist.
   */
  async get(id: ID): Promise<Finding | undefined> {
    const result = await this.graphql.query(FindingDocument, {
      id: id as string,
    });
    if (isAbsent(result.finding)) {
      return undefined;
    }
    return mapToFinding(result.finding);
  }

  /**
   * List findings.
   *
   * @example
   * const findings = await client.findings.list().first(50);
   */
  list(): FindingsListBuilder {
    return new FindingsListBuilder(this.graphql);
  }

  /**
   * Create a finding.
   *
   * @param requestId - The ID of the request to create the finding for.
   * @param options - The options for the creation.
   * @returns The created finding.
   */
  async create(requestId: ID, options: CreateFindingOptions): Promise<Finding> {
    const result = await this.graphql.mutation(CreateFindingDocument, {
      requestId,
      input: {
        title: options.title,
        reporter: options.reporter,
        description: options.description,
        dedupeKey: options.dedupeKey,
      },
    });
    const payload = result.createFinding;
    if (isPresent(payload.error)) {
      handleGraphQLError(payload.error);
    }
    const finding = payload.finding;
    if (isAbsent(finding)) {
      throw new Error("createFinding returned no finding");
    }
    return mapToFinding(finding);
  }

  /**
   * Update a finding.
   *
   * @param id - The ID of the finding to update.
   * @param options - The options for the update.
   * @returns The updated finding.
   */
  async update(id: ID, options: UpdateFindingOptions): Promise<Finding> {
    const result = await this.graphql.mutation(UpdateFindingDocument, {
      id,
      input: {
        title: options.title,
        description: options.description,
        hidden: options.hidden,
      },
    });
    const payload = result.updateFinding;
    if (isPresent(payload.error)) {
      handleGraphQLError(payload.error);
    }
    const finding = payload.finding;
    if (isAbsent(finding)) {
      throw new Error("updateFinding returned no finding");
    }
    return mapToFinding(finding);
  }
}
