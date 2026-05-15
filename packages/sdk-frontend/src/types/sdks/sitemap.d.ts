import type { Extension } from "@codemirror/state";
import type { RequestViewModeOptions } from "../types/request";
import type { ResponseViewModeOptions } from "../types/response";
import type { SitemapEntry, SitemapEntryChildStateUpdateEvent, SitemapRootEntry } from "../types/sitemap";
import type { AddIndicatorOptions, ID, Indicator, ListenerHandle } from "../types/utils";
/**
 * Utilities to interact with the Sitemap page.
 * @category Sitemap
 */
export type SitemapSDK = {
    /**
     * Listen for child state updates on a sitemap entry.
     * @param callback The callback function that receives the entry ID and new child state.
     * @returns A handle object with a `stop` method to stop listening.
     * @example
     *
     * const handle = sdk.sitemap.onEntryChildStateUpdate((entryId, newChildState) => {
     *   console.log(`Entry ${entryId} child state changed:`, newChildState);
     * });
     *
     * // Later, stop listening
     * handle.stop();
     */
    onEntryChildStateUpdate: (callback: (event: SitemapEntryChildStateUpdateEvent) => void) => ListenerHandle;
    /**
     * Get the list of all sitemap entries in tree format.
     * @returns The list of all sitemap entries.
     */
    getTreeEntries: () => SitemapRootEntry[];
    /**
     * Load children for a sitemap entry.
     * This will fetch and load children if they haven't been loaded yet.
     * @param entryId The ID of the entry to load children for.
     * @returns Promise that resolves when children are loaded.
     */
    getChildren: (entryId: ID) => Promise<SitemapEntry[]>;
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
    /**
     * Add a custom response view mode.
     * @param options The view mode options.
     */
    addResponseViewMode: (options: ResponseViewModeOptions) => void;
    /**
     * Add an indicator to a sitemap session.
     * Indicators are displayed next to the entry name in the collections tree.
     * @param entryId The ID of the entry to add the indicator to.
     * @param indicator The indicator configuration.
     * @returns A handle object with a `remove` method to remove the indicator.
     * @example
     *
     * const indicator = sdk.sitemap.addEntryIndicator(entryId, {
     *   icon: "fas fa-exclamation-triangle",
     *   description: "Security warning",
     * });
     *
     * // Later, remove the indicator
     * indicator.remove();
     *
     */
    addEntryIndicator: (entryId: ID, indicator: AddIndicatorOptions) => Indicator;
};
