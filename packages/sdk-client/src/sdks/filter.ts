import {
  CreateFilterPresetDocument,
  DeleteFilterPresetDocument,
  FilterPresetDocument,
  FilterPresetsDocument,
  type GraphQLClient,
  UpdateFilterPresetDocument,
} from "@/graphql/index.js";
import type {
  CreateFilterPresetOptions,
  FilterPreset,
  ID,
  UpdateFilterPresetOptions,
} from "@/types/index.js";
import { handleGraphQLError } from "@/utils/errors.js";
import { isAbsent, isPresent } from "@/utils/optional.js";

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
    return result.filterPresets.map((f) => ({
      id: f.id as ID,
      name: f.name,
      alias: f.alias,
      clause: f.clause,
    }));
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

    return {
      id: result.filterPreset.id as ID,
      name: result.filterPreset.name,
      alias: result.filterPreset.alias,
      clause: result.filterPreset.clause,
    };
  }

  /**
   * Create a new filter preset.
   */
  async create(options: CreateFilterPresetOptions): Promise<FilterPreset> {
    const result = await this.graphql.mutation(CreateFilterPresetDocument, {
      input: {
        name: options.name,
        alias: options.alias,
        clause: options.clause,
      },
    });

    const payload = result.createFilterPreset;

    if (isPresent(payload.error)) {
      handleGraphQLError(payload.error);
    }

    const filter = payload.filter!;
    return {
      id: filter.id as ID,
      name: filter.name,
      alias: filter.alias,
      clause: filter.clause,
    };
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
        clause: options.clause,
      },
    });

    const payload = result.updateFilterPreset;

    if (isPresent(payload.error)) {
      handleGraphQLError(payload.error);
    }

    const filter = payload.filter!;
    return {
      id: filter.id as ID,
      name: filter.name,
      alias: filter.alias,
      clause: filter.clause,
    };
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
