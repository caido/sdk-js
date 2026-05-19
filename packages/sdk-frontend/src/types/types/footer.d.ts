import { type ButtonSlotContent, type CommandSlotContent, type CustomSlotContent, type SlotContentProps, type SlotContentPropsGroup } from "./slots";
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
export type FooterSlotContent<TProps extends SlotContentPropsGroup = SlotContentProps> = {
    [K in FooterSlot]: ButtonSlotContent | CustomSlotContent<TProps> | CommandSlotContent;
};
