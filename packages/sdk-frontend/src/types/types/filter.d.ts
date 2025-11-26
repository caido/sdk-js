import { type ButtonSlotContent, type CommandSlotContent, type CustomSlotContent } from "./slots";
import { type HTTPQL, type ID } from "./utils";
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
export type FilterSlotContent = {
    [FilterSlot.UpdateHeader]: ButtonSlotContent | CustomSlotContent | CommandSlotContent;
    [FilterSlot.CreateHeader]: ButtonSlotContent | CustomSlotContent | CommandSlotContent;
};
