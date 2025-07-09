import { type CommandID } from "../types/commands";
/**
 * Utilities to interact with the command palette.
 * @category Command Palette
 */
export type CommandPaletteSDK = {
    /**
     * Register a command.
     * @deprecated Use `sdk.commandPalette.addToSlot` instead.
     * @param commandId The id of the command to register.
     */
    register: (commandId: CommandID) => void;
};
