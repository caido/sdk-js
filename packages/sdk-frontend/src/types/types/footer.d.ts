import { type ButtonSlotContent, type CommandSlotContent, type CustomSlotContent } from "./slots";
/**
 * The slots in the Footer UI.
 * @category Footer
 */
export declare const FooterSlot: {
    readonly FooterSlotPrimary: "footer-primary";
    readonly FooterSlotSecondary: "footer-secondary";
};
export type FooterSlot = (typeof FooterSlot)[keyof typeof FooterSlot];
/**
 * Content that can be added to footer slots.
 * @category Footer
 */
export type FooterSlotContent = {
    [FooterSlot.FooterSlotPrimary]: ButtonSlotContent | CustomSlotContent | CommandSlotContent;
    [FooterSlot.FooterSlotSecondary]: ButtonSlotContent | CustomSlotContent | CommandSlotContent;
};
