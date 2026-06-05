import { mapToPageInfo } from "@/convert/connection.js";
import { mapToFinding } from "@/convert/finding.js";
import type {
  FilterClauseFindingInput,
  FindingOrderInput,
  GraphQLClient,
} from "@/graphql/index.js";
import {
  CreateFindingDocument,
  DeleteFindingsDocument,
  FindingDocument,
  FindingsDocument,
  UpdateFindingDocument,
} from "@/graphql/index.js";
import {
  type ConnectionQueryResult,
  type CreateFindingOptions,
  type DeleteFindingOptions,
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

  /**
   * Delete one or more findings.
   *
   * Delete findings by providing either a list of finding IDs or a reporter name.
   * If no options are provided, all findings will be deleted.
   *
   * @param options - The options for the deletion. Can be a discriminated union of:
   *   - An object with `ids` array to delete specific findings by ID
   *   - An object with `reporter` string to delete all findings by a reporter
   *   - `undefined` to delete all findings
   * @example
   * // Delete specific findings by ID
   * await client.findings.delete({ ids: ["finding-1", "finding-2"] });
   *
   * // Delete all findings by a reporter
   * await client.findings.delete({ reporter: "eslint" });
   *
   * // Delete all findings
   * await client.findings.delete();
   */
  async delete(options?: DeleteFindingOptions): Promise<void> {
    await this.graphql.mutation(DeleteFindingsDocument, { input: options });
  }
}
