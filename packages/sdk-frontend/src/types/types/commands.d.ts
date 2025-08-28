import { type RequestDraft, type RequestFull, type RequestMeta } from "./request";
import { type ID } from "./utils";
/**
 * A unique command identifier.
 * @example "my-super-command"
 */
export type CommandID = string & {
    __commandId?: never;
};
/**
 * Represents the context in which a command is executed.
 * @category Commands
 */
export type CommandContext = CommandContextBase | CommandContextRequestRow | CommandContextRequest | CommandContextResponse;
/**
 * The base context for a command.
 * This context is used for commands that are not executed in a specific context, such as via shortcuts and the command palette.
 * @category Commands
 */
export type CommandContextBase = {
    type: "BaseContext";
};
/**
 * The context for a command that is executed on a row in the request table.
 * @category Commands
 */
export type CommandContextRequestRow = {
    type: "RequestRowContext";
    /**
     * The requests that are selected in the request table.
     */
    requests: RequestMeta[];
};
/**
 * The context for a command that is executed on a request pane.
 * @category Commands
 */
export type CommandContextRequest = {
    type: "RequestContext";
    /**
     * The request that is currently open in the request pane.
     * If the request has not yet been saved in the database, the id will be undefined.
     */
    request: RequestDraft | RequestFull;
    /**
     * The currently selected text in the request pane.
     */
    selection: string;
};
/**
 * The context for a command that is executed on a response pane.
 * @category Commands
 */
export type CommandContextResponse = {
    type: "ResponseContext";
    /**
     * The request that is associated with the response.
     */
    request: RequestMeta;
    /**
     * The response that is currently open in the response pane.
     */
    response: {
        id: ID;
        raw: string;
        statusCode: number;
        roundtripTime: number;
    };
    /**
     * The currently selected text in the response pane.
     */
    selection: string;
};
