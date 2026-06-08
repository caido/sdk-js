import type { FilterPresetFullFragment } from "@/graphql/index.js";
import type { FilterPreset } from "@/types/index.js";

export const mapToFilterPreset = (
  node: FilterPresetFullFragment,
): FilterPreset => {
  return {
    id: node.id,
    name: node.name,
    alias: node.alias,
    clause: node.clause.code,
    kind: node.clause.__typename,
  };
};
