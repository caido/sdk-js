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
/**
 * Callback function called when a workflow is created.
 * @category Workflows
 */
export type OnCreatedWorkflowCallback = (event: {
    workflow: Workflow;
}) => void;
/**
 * Callback function called when a workflow is updated.
 * @category Workflows
 */
export type OnUpdatedWorkflowCallback = (event: {
    workflow: Workflow;
}) => void;
/**
 * Callback function called when a workflow is deleted.
 * @category Workflows
 */
export type OnDeletedWorkflowCallback = (event: {
    id: ID;
}) => void;
/**
 * Workflows page context.
 * @category Workflows
 */
export type WorkflowsPageContext = {
    kind: "Workflows";
};
