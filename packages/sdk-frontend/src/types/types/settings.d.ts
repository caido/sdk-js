import { type CustomSlotContent } from "./slots";
/**
 * The slots in the Settings UI.
 * @category Settings
 */
export declare const SettingsSlot: {
    /**
     * The plugins section in the settings sidebar.
     */
    readonly PluginsSection: "plugins-section";
};
export type SettingsSlot = (typeof SettingsSlot)[keyof typeof SettingsSlot];
/**
 * Content for a settings plugin slot.
 * @category Settings
 */
export type SettingsPluginSlotContent = CustomSlotContent & {
    /**
     * The name of the plugin settings page displayed in the sidebar.
     */
    name: string;
};
export type SettingsSlotContent = {
    [SettingsSlot.PluginsSection]: SettingsPluginSlotContent;
};
