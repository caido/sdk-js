import type { CommandContext, CommandID } from "../types/commands";
/**
 * Utilities to interact with commands
 * @category Commands
 */
export type CommandsSDK = {
    /**
     * Register a command.
     * @param id The id of the command.
     * @param options Options for the command.
     * @param options.name The name of the command.
     * @param options.run The function to run when the command is executed.
     * @param options.group The group this command belongs to.
     * @param options.when A function to determine if the command is available.
     *
     * @example
     * ```ts
     * sdk.commands.register("hello", {
     *   name: "Print to console.",
     *   run: () => console.log("Hello world!"),
     *   group: "Custom Commands",
     * });
     * ```
     */
    register: (id: CommandID, options: {
        name: string;
        run: (context: CommandContext) => Promise<void> | void;
        group?: string;
        when?: (context: CommandContext) => Promise<boolean> | boolean;
    }) => void;
};
