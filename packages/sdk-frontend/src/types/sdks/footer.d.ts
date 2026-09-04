import { type FooterSlotContent } from "../types/footer";
import { type DefineAddToSlotFn } from "../types/slots";
/**
 * Utilities to interact with the footer.
 * @category Footer
 */
export type FooterSDK = {
    /**
     * Add a component to a slot.
     * @param slot The slot to add the component to.
     * @param content The content to add to the slot.
     * @example
     * ```ts
     * addToSlot(FooterSlot.FooterSlotPrimary, {
     *   kind: "Command",
     *   commandId: "my-command",
     *   icon: "my-icon",
     * });
     *
     * addToSlot(FooterSlot.FooterSlotPrimary, {
     *   kind: "Button",
     *   label: "My button",
     *   icon: "fas fa-rocket",
     *   onClick: () => {
     *     console.log("Button clicked");
     *   },
     * });
     *
     * addToSlot(FooterSlot.FooterSlotSecondary, {
     *   kind: "Custom",
     *   component: MyComponent,
     * });
     * ```
     */
    addToSlot: DefineAddToSlotFn<FooterSlotContent>;
};
