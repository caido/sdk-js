import { type ID } from "./utils";
/**
 * A workflow
 * @category Workflows
 */
export type Workflow = {
    id: string;
    name: string;
    description: string;
    kind: WorkflowKind;
};
/**
 * The kind of workflow.
 * @category Workflows
 */
export type WorkflowKind = "Convert" | "Active" | "Passive";
export type OnCreatedWorkflowCallback = (event: {
    workflow: Workflow;
}) => void;
export type OnUpdatedWorkflowCallback = (event: {
    workflow: Workflow;
}) => void;
export type OnDeletedWorkflowCallback = (event: {
    id: ID;
}) => void;
