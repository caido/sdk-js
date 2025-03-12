import { type ID, type ListenerHandle } from "./utils";
/**
 * Utilities to interact with workflows.
 * @category Workflows
 */
export type WorkflowSDK = {
    /**
     * Get all workflows.
     * @returns All workflows.
     */
    getWorkflows: () => Workflow[];
    /**
     * Register a callback to be called when a workflow is created.
     * @param callback The callback to be called.
     */
    onCreatedWorkflow: (callback: OnCreatedWorkflowCallback) => ListenerHandle;
    /**
     * Register a callback to be called when a workflow is updated.
     * @param callback The callback to be called.
     */
    onUpdatedWorkflow: (callback: OnUpdatedWorkflowCallback) => ListenerHandle;
    /**
     * Register a callback to be called when a workflow is deleted.
     * @param callback The callback to be called.
     */
    onDeletedWorkflow: (callback: OnDeletedWorkflowCallback) => ListenerHandle;
};
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
