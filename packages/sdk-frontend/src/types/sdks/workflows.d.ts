import { type ListenerHandle } from "../types/utils";
import { type OnCreatedWorkflowCallback, type OnDeletedWorkflowCallback, type OnUpdatedWorkflowCallback, type Workflow } from "../types/workflows";
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
