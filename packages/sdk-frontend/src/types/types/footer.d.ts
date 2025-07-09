import { type ButtonSlotContent, type CommandSlotContent, type CustomSlotContent } from "./slots";
export declare const FooterSlot: {
    readonly FooterSlotPrimary: "footer-primary";
    readonly FooterSlotSecondary: "footer-secondary";
};
export type FooterSlot = (typeof FooterSlot)[keyof typeof FooterSlot];
export type FooterSlotContent = {
    [FooterSlot.FooterSlotPrimary]: ButtonSlotContent | CustomSlotContent | CommandSlotContent;
    [FooterSlot.FooterSlotSecondary]: ButtonSlotContent | CustomSlotContent | CommandSlotContent;
};
