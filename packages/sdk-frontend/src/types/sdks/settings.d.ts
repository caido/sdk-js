import type { SettingsSlotContent } from "../types/settings";
import type { DefineAddToSlotFn } from "../types/slots";
/**
 * Utilities to interact with the settings page.
 * @category Settings
 */
export type SettingsSDK = {
    /**
     * Add a component to a slot.
     * @param slot The slot to add the component to.
     * @param content The content to add to the slot.
     * @example
     * ```ts
     * sdk.settings.addToSlot(SettingsSlot.PluginsSection, {
     *   type: "Custom",
     *   name: "My Plugin Settings",
     *   definition: MySettingsComponent,
     * });
     * ```
     */
    addToSlot: DefineAddToSlotFn<SettingsSlotContent>;
};
