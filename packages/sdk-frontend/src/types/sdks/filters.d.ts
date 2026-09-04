import { type CurrentFilterChangeEvent, type Filter, type FilterSlotContent } from "../types/filter";
import { type DefineAddToSlotFn } from "../types/slots";
import type { HTTPQL, ID, ListenerHandle } from "../types/utils";
/**
 * SDK for interacting with the Filters page.
 * @category Filters
 */
export type FiltersSDK = {
    /**
     * Gets all filters.
     * @returns The filters.
     */
    getAll: () => Filter[];
    /**
     * Creates a filter.
     * @param options Options for the filter.
     * @param options.name The name of the filter. Should be unique.
     * @param options.query The HTTPQL query of the filter.
     * @param options.alias The alias of the filter. Used when referencing the filter in an HTTPQL query (e.g. `preset:my-alias`).
     *
     * Should be unique and follow the format `[a-zA-Z0-9_-]+`.
     *
     * @returns The created filter.
     */
    create: (options: {
        name: string;
        query: HTTPQL;
        alias: string;
    }) => Promise<Filter>;
    /**
     * Updates a filter.
     * @param id The ID of the filter to update.
     * @param options Options for the filter.
     * @param options.name The name of the filter.
     * @param options.alias The alias of the filter.
     * @param options.query The HTTPQL query of the filter.
     * @returns The updated filter.
     */
    update: (id: ID, options: {
        name: string;
        alias: string;
        query: HTTPQL;
    }) => Promise<Filter>;
    /**
     * Deletes a filter.
     * @param id The ID of the filter to delete.
     */
    delete: (id: ID) => Promise<void>;
    /**
     * Get the currently selected filter.
     * @returns The currently selected filter, or undefined if no filter is selected.
     */
    getCurrentFilter: () => Filter | undefined;
    /**
     * Subscribe to current filter changes.
     * @param callback The callback to call when the selected filter changes.
     * @returns An object with a `stop` method that can be called to stop listening to filter changes.
     *
     * @example
     * ```ts
     * const handler = sdk.filters.onCurrentFilterChange((event) => {
     *   console.log(`Filter ${event.filterId} got selected!`);
     * });
     *
     * // Later, stop listening
     * handler.stop();
     * ```
     */
    onCurrentFilterChange: (callback: (event: CurrentFilterChangeEvent) => void) => ListenerHandle;
    /**
     * Add a component to a slot.
     * @param slot The slot to add the component to.
     * @param content The content to add to the slot.
     * @example
     * ```ts
     * sdk.filters.addToSlot(FilterSlot.UpdateHeader, {
     *   type: "Button",
     *   label: "My Button",
     *   icon: "my-icon",
     *   onClick: () => {
     *     console.log("Button clicked");
     *   },
     * });
     *
     * sdk.filters.addToSlot(FilterSlot.CreateHeader, {
     *   type: "Custom",
     *   definition: MyComponent,
     * });
     *
     * sdk.filters.addToSlot(FilterSlot.UpdateHeader, {
     *   type: "Command",
     *   commandId: "my-command",
     *   icon: "my-icon",
     * });
     * ```
     */
    addToSlot: DefineAddToSlotFn<FilterSlotContent>;
};
