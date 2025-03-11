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
