import type { WorkflowFullFragment } from "@/graphql/index.js";
import type { Workflow } from "@/types/index.js";

export const mapToWorkflow = (node: WorkflowFullFragment): Workflow => {
  return {
    id: node.id,
    name: node.name,
    kind: node.kind,
    definition: node.definition,
    enabled: node.enabled,
    global: node.global,
    readOnly: node.readOnly,
    createdAt: new Date(node.createdAt),
    updatedAt: new Date(node.updatedAt),
  };
};
