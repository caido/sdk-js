import type { CommandID } from "./utils";
/**
 * Utilities to interact with shortcuts.
 * @category Shortcuts
 */
export type ShortcutsSDK = {
    /**
     * Register a shortcut.
     * @param commandId The id of the command to run when the shortcut is triggered.
     * @param keys The keys of the shortcut.
     */
    register: (commandId: CommandID, keys: string[]) => void;
};
