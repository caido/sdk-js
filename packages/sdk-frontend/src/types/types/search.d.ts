import { type ButtonSlotContent, type CommandSlotContent, type CustomSlotContent } from "./slots";
/**
 * The slots in the Search UI.
 * @category Search
 */
export declare const SearchSlot: {
    /**
     * The primary slot in the search toolbar.
     */
    readonly ToolbarPrimary: "search-toolbar-primary";
};
export type SearchSlot = (typeof SearchSlot)[keyof typeof SearchSlot];
export type SearchSlotContent = {
    [SearchSlot.ToolbarPrimary]: ButtonSlotContent | CustomSlotContent | CommandSlotContent;
};
/**
 * Search page context.
 * @category Search
 */
export type SearchPageContext = {
    kind: "Search";
};
