import type { AssistantSessionMetaFragment } from "@/graphql/index.js";
import type { AssistantSession } from "@/types/index.js";

export const mapToAssistantSession = (
  node: AssistantSessionMetaFragment,
): AssistantSession => {
  return {
    id: node.id,
    modelId: node.modelId,
    name: node.name,
    updatedAt: new Date(node.updatedAt),
    createdAt: new Date(node.createdAt),
  };
};
