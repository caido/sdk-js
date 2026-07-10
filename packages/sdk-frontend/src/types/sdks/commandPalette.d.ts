import { type CommandID } from "../types/commands";
import { type ComponentDefinition } from "../types/utils";
/**
 * Command palette view definition for custom UI content.
 * @category Command Palette
 */
export type CommandPaletteView = {
    type: "Custom";
    definition: ComponentDefinition;
};
/**
 * Utilities to interact with the command palette.
 * @category Command Palette
 */
export type CommandPaletteSDK = {
    /**
     * Register a command.
     * @param commandId The id of the command to register.
     */
    register: (commandId: CommandID) => void;
    /**
     * Push a new view onto the command palette view stack.
     * @param view The view to push onto the stack.
     */
    pushView: (view: CommandPaletteView) => void;
};
