import { type ButtonSlotContent, type CommandSlotContent, type CustomSlotContent, type SlotContentProps, type SlotContentPropsGroup } from "./slots";
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
/**
 * Content that can be added to search slots.
 * @category Search
 */
export type SearchSlotContent<TProps extends SlotContentPropsGroup = SlotContentProps> = {
    [K in SearchSlot]: ButtonSlotContent | CustomSlotContent<TProps> | CommandSlotContent;
};
/**
 * Search page context.
 * @category Search
 */
export type SearchPageContext = {
    kind: "Search";
};
