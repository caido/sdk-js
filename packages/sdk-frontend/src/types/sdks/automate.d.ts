import type { Extension } from "@codemirror/state";
import type { AutomateEntry, AutomateSession } from "../types/automate";
import type { RequestViewModeOptions } from "../types/request";
import type { ResponseViewModeOptions } from "../types/response";
import type { AddIndicatorOptions, ID, Indicator } from "../types/utils";
/**
 * Utilities to interact with the Automate page.
 * @category Automate
 */
export type AutomateSDK = {
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
     * Get the list of all automate sessions.
     * @returns The list of all automate sessions.
     */
    getSessions: () => AutomateSession[];
    /**
     * Get the list of all automate entries.
     * @param sessionId The ID of the session to get the entries of.
     * @returns The list of all automate entries.
     */
    getEntries: (sessionId: ID) => AutomateEntry[];
    /**
     * Add an indicator to an automate entry.
     * Indicators are displayed next to the entry name in the collections tree.
     * @param entryId The ID of the entry to add the indicator to.
     * @param indicator The indicator configuration.
     * @returns A handle object with a `remove` method to remove the indicator.
     * @example
     *
     * const indicator = sdk.automate.addEntryIndicator(entryId, {
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
