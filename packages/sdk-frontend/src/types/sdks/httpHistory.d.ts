import type { Extension } from "@codemirror/state";
import type { RequestViewModeOptions } from "../types/request";
import type { HTTPQL, ID } from "../types/utils";
/**
 * Utilities to interact with the HTTP History page.
 * @category HTTP History
 */
export type HTTPHistorySDK = {
    /**
     * Set the HTTPQL query that will be applied on the HTTP History table results.
     * @param query The HTTPQL query.
     */
    setQuery: (query: HTTPQL) => void;
    /**
     * Get the current HTTPQL query.
     * @returns The current HTTPQL query.
     */
    getQuery: () => HTTPQL;
    /**
     * Get the current scope ID.
     * @returns The current scope ID.
     */
    getScopeId: () => ID | undefined;
    /**
     * Set the current scope.
     * @param id The ID of the scope to set.
     */
    setScope: (id: ID | undefined) => Promise<void>;
    /**
     * Add an extension to the request editor.
     * @param extension The extension to add.
     */
    addRequestEditorExtension: (extension: Extension) => void;
    /**
     * Add an extension to the response editor.
     * @param extension The extension to add.
     */
    addResponseEditorExtension: (extension: Extension) => void;
    /**
     * Add a custom request view mode.
     * @param options The view mode options.
     */
    addRequestViewMode: (options: RequestViewModeOptions) => void;
};
