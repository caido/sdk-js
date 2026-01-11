import type { Extension } from "@codemirror/state";
import type { RequestViewModeOptions } from "../types/request";
import type { ResponseViewModeOptions } from "../types/response";
import type { SearchSlot, SearchSlotContent } from "../types/search";
import type { HTTPQL, ID } from "../types/utils";
/**
 * Utilities to interact with the Search page.
 * @category Search
 */
export type SearchSDK = {
    /**
     * Set the HTTPQL query that will be applied on the search table results.
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
     * Add a custom request view mode.
     * @param options The view mode options.
     */
    addRequestViewMode: (options: RequestViewModeOptions) => void;
    /**
     * Add a custom response view mode.
     * @param options The view mode options.
     */
    addResponseViewMode: (options: ResponseViewModeOptions) => void;
    /**
     * Scrolls the Search table to a specific request.
     * @param id The ID of the request to scroll to.
     */
    scrollTo: (id: ID) => void;
    /**
     * Add content to a slot in the Search UI.
     * @param slot The slot to add content to.
     * @param content The content to add.
     */
    addToSlot: <T extends SearchSlot>(slot: T, content: SearchSlotContent[T]) => void;
};
