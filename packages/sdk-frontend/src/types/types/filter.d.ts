import { type ButtonSlotContent, type CommandSlotContent, type CustomSlotContent } from "./slots";
import { type HTTPQL, type ID, type Selection } from "./utils";
/**
 * Represents a filter.
 * @category Filters
 */
export type Filter = {
    /**
     * The ID of the filter.
     */
    id: ID;
    /**
     * The name of the filter.
     */
    name: string;
    /**
     * The alias of the filter.
     * This alias is used when referencing the filter in an HTTPQL query (e.g. `preset:my-alias`).
     */
    alias: string;
    /**
     * The HTTPQL expression of the filter.
     */
    query: HTTPQL;
};
/**
 * The slots in the Filters UI.
 * @category Filters
 */
export declare const FilterSlot: {
    /**
     * The header area of the preset form update component.
     */
    readonly UpdateHeader: "update-header";
    /**
     * The header area of the preset form create component.
     */
    readonly CreateHeader: "create-header";
};
export type FilterSlot = (typeof FilterSlot)[keyof typeof FilterSlot];
/**
 * Content that can be added to filter slots.
 * @category Filter
 */
export type FilterSlotContent = {
    [FilterSlot.UpdateHeader]: ButtonSlotContent | CustomSlotContent | CommandSlotContent;
    [FilterSlot.CreateHeader]: ButtonSlotContent | CustomSlotContent | CommandSlotContent;
};
/**
 * Event fired when the current filter changes.
 * @category Filters
 */
export type CurrentFilterChangeEvent = {
    /**
     * The ID of the newly selected filter, or undefined if no filter is selected.
     */
    filterId: ID | undefined;
};
/**
 * Filter page context.
 * @category Filters
 */
export type FilterPageContext = {
    kind: "Filter";
    selection: Selection<ID>;
};
