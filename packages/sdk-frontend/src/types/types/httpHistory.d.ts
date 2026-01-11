import { type ButtonSlotContent, type CommandSlotContent, type CustomSlotContent } from "./slots";
import { type ID, type Selection } from "./utils";
/**
 * The slots in the HTTP History UI.
 * @category HTTP History
 */
export declare const HTTPHistorySlot: {
    /**
     * The toolbar.
     */
    readonly ToolbarPrimary: "toolbar-primary";
};
export type HTTPHistorySlot = (typeof HTTPHistorySlot)[keyof typeof HTTPHistorySlot];
export type HTTPHistorySlotContent = {
    [HTTPHistorySlot.ToolbarPrimary]: ButtonSlotContent | CustomSlotContent | CommandSlotContent;
};
/**
 * HTTP history page context.
 * @category HTTP History
 */
export type HTTPHistoryPageContext = {
    kind: "HTTPHistory";
    selection: Selection<ID>;
};
