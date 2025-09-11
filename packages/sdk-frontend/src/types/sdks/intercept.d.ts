import type { RequestViewModeOptions } from "../types/request";
import type { ID } from "../types/utils";
/**
 * Utilities to interact with the Intercept page.
 * @category Intercept
 */
export type InterceptSDK = {
    /**
     * Get the current scope ID.
     * @returns The current scope ID.
     */
    getScopeId: () => ID | undefined;
    /**
     * Set the current scope.
     * @param scopeId The ID of the scope to set.
     */
    setScope: (id: ID | undefined) => void;
    /**
     * Add a custom request view mode.
     * @param options The view mode options.
     */
    addRequestViewMode: (options: RequestViewModeOptions) => void;
};
