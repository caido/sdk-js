import type { CommandID } from "../types/commands";
/**
 * Utilities to interact with shortcuts.
 * @category Shortcuts
 */
export type ShortcutsSDK = {
    /**
     * Register a shortcut.
     * @param commandId The id of the command to run when the shortcut is triggered.
     * @param keys The keys of the shortcut. Check out {@link https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values KeyboardEvent.key} for the list of supported keys.
     */
    register: (commandId: CommandID, keys: string[]) => void;
};
