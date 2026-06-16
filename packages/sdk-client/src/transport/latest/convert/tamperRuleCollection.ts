import type { TamperRuleCollectionFullFragment } from "@/transport/latest/__generated__/tamperRuleCollection.js";
import type { TamperRuleCollection } from "@/types/index.js";

export const mapToTamperRuleCollection = (
  node: TamperRuleCollectionFullFragment,
): TamperRuleCollection => {
  return {
    id: node.id,
    name: node.name,
    rules: node.rules.map((rule) => ({
      id: rule.id,
      name: rule.name,
    })),
  };
};
