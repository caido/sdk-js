import type { Extension } from "@codemirror/state";
import type { RequestViewModeOptions } from "../types/request";
import type { ID } from "../types/utils";
/**
 * Utilities to interact with the Sitemap page.
 * @category Sitemap
 */
export type SitemapSDK = {
    /**
     * Get the current scope ID.
     * @returns The current scope ID.
     */
    getScopeId: () => ID | undefined;
    /**
     * Set the current scope.
     * @param id The ID of the scope to set.
     */
    setScope: (id: ID | undefined) => void;
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
};
