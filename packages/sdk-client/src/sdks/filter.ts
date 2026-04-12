import { mapToFilterPreset } from "@/convert/filter.js";
import {
  CreateFilterPresetDocument,
  DeleteFilterPresetDocument,
  FilterPresetDocument,
  FilterPresetsDocument,
  type GraphQLClient,
  type QueryInput,
  UpdateFilterPresetDocument,
} from "@/graphql/index.js";
import {
  type CreateFilterPresetOptions,
  FilterClauseKind,
  type FilterPreset,
  type ID,
  type UpdateFilterPresetOptions,
} from "@/types/index.js";
import { handleGraphQLError } from "@/utils/errors.js";
import { isAbsent, isPresent } from "@/utils/optional.js";

const mapToFilterPresetClause = (
  code: string,
  kind?: FilterClauseKind,
): QueryInput => {
  switch (kind ?? FilterClauseKind.HTTPQL) {
    case FilterClauseKind.HTTPQL:
      return {
        HTTPQL: { code },
      };
    case FilterClauseKind.StreamQL:
      return {
        streamQL: { code },
      };
  }
};

/**
 * Higher-level SDK for filter preset-related operations.
 */
export class FilterSDK {
  private readonly graphql: GraphQLClient;

  constructor(graphql: GraphQLClient) {
    this.graphql = graphql;
  }

  /**
   * List all filter presets.
   */
  async list(): Promise<FilterPreset[]> {
    const result = await this.graphql.query(FilterPresetsDocument);
    return result.filterPresets.map(mapToFilterPreset);
  }

  /**
   * Get a filter preset by ID.
   */
  async get(id: ID): Promise<FilterPreset | undefined> {
    const result = await this.graphql.query(FilterPresetDocument, {
      id: id as string,
    });

    if (isAbsent(result.filterPreset)) {
      return undefined;
    }

    return mapToFilterPreset(result.filterPreset);
  }

  /**
   * Create a new filter preset.
   */
  async create(options: CreateFilterPresetOptions): Promise<FilterPreset> {
    const result = await this.graphql.mutation(CreateFilterPresetDocument, {
      input: {
        name: options.name,
        alias: options.alias,
        clause: mapToFilterPresetClause(options.clause, options.kind),
      },
    });

    const payload = result.createFilterPreset;

    if (isPresent(payload.error)) {
      handleGraphQLError(payload.error);
    }

    return mapToFilterPreset(payload.filter!);
  }

  /**
   * Update a filter preset.
   */
  async update(
    id: ID,
    options: UpdateFilterPresetOptions,
  ): Promise<FilterPreset> {
    const result = await this.graphql.mutation(UpdateFilterPresetDocument, {
      id: id as string,
      input: {
        name: options.name,
        alias: options.alias,
        clause: mapToFilterPresetClause(options.clause, options.kind),
      },
    });

    const payload = result.updateFilterPreset;

    if (isPresent(payload.error)) {
      handleGraphQLError(payload.error);
    }

    return mapToFilterPreset(payload.filter!);
  }

  /**
   * Delete a filter preset by ID.
   */
  async delete(id: ID): Promise<void> {
    await this.graphql.mutation(DeleteFilterPresetDocument, {
      id: id as string,
    });
  }
}
