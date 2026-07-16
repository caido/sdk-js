import { decodeBlob } from "./blob.js";

import type {
  TestWorkflowConvertMutation,
  WorkflowFullFragment,
} from "@/graphql/index.js";
import type { TestWorkflowConvertResult, Workflow } from "@/types/index.js";

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

export const mapToTestWorkflowConvertResult = (
  payload: TestWorkflowConvertMutation["testWorkflowConvert"],
): TestWorkflowConvertResult => {
  return {
    output: decodeBlob(payload.output ?? undefined),
    runState: payload.runState ?? undefined,
  };
};
