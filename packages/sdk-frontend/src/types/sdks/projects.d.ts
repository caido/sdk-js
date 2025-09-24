import { type SelectedProjectChangeEvent } from "../types/projects";
import { type ListenerHandle } from "../types/utils";
/**
 * Utilities to interact with projects.
 * @category Projects
 */
export type ProjectsSDK = {
    /**
     * Subscribe to selected project changes.
     * @param callback The callback to call when the selected project changes.
     * @returns An object with a `stop` method that can be called to stop listening to project changes.
     *
     * @example
     * ```ts
     * const handler = sdk.projects.onCurrentProjectChange((event) => {
     *   console.log('Selected project changed to:', event.projectId);
     * });
     *
     * // Later, stop listening
     * handler.stop();
     * ```
     */
    onCurrentProjectChange: (callback: (event: SelectedProjectChangeEvent) => void) => ListenerHandle;
};
