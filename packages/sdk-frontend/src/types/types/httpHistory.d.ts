import { type ButtonSlotContent, type CommandSlotContent, type CustomSlotContent, type SlotContentProps, type SlotContentPropsGroup } from "./slots";
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
/**
 * Content that can be added to HTTP history slots.
 * @category HTTP History
 */
export type HTTPHistorySlotContent<TProps extends SlotContentPropsGroup = SlotContentProps> = {
    [K in HTTPHistorySlot]: ButtonSlotContent | CustomSlotContent<TProps> | CommandSlotContent;
};
/**
 * HTTP history page context.
 * @category HTTP History
 */
export type HTTPHistoryPageContext = {
    kind: "HTTPHistory";
    selection: Selection<ID>;
};
