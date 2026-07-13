import type { RequestFull, RequestViewModeOptions, RequestWritableViewModeProps } from "../types/request";
import type { ResponseFull, ResponseViewModeOptions, ResponseViewModeProps } from "../types/response";
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
     * Get the currently selected request.
     * @returns The currently selected request.
     */
    getSelectedRequest: () => RequestFull | undefined;
    /**
     * Get the currently selected response.
     * @returns The currently selected response.
     */
    getSelectedResponse: () => ResponseFull | undefined;
    /**
     * Set the current scope.
     * @param scopeId The ID of the scope to set.
     */
    setScope: (id: ID | undefined) => void;
    /**
     * Add a custom request view mode.
     * @param options The view mode options.
     */
    addRequestViewMode: (options: RequestViewModeOptions<RequestWritableViewModeProps>) => void;
    /**
     * Add a custom response view mode.
     * @param options The view mode options.
     */
    addResponseViewMode: (options: ResponseViewModeOptions<ResponseViewModeProps>) => void;
};
