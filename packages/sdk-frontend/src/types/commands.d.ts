export type CommandContext = CommandContextBase | CommandContextRequestRow | CommandContextRequest | CommandContextResponse;
/**
 * The base context for a command.
 * This context is used for commands that are not executed in a specific context, such as via shortcuts and the command palette.
 */
type CommandContextBase = {
    type: "BaseContext";
};
/**
 * The context for a command that is executed on a row in the request table.
 */
type CommandContextRequestRow = {
    type: "RequestRowContext";
    /**
     * The requests that are selected in the request table.
     */
    requests: {
        id: string;
        host: string;
        port: number;
        path: string;
        query: string;
        isTls: boolean;
    }[];
};
/**
 * The context for a command that is executed on a request pane.
 */
type CommandContextRequest = {
    type: "RequestContext";
    /**
     * The request that is currently open in the request pane.
     */
    request: {
        host: string;
        port: number;
        path: string;
        query: string;
        isTls: boolean;
        raw: string;
    };
    /**
     * The currently selected text in the request pane.
     */
    selection: string;
};
/**
 * The context for a command that is executed on a response pane.
 */
type CommandContextResponse = {
    type: "ResponseContext";
    /**
     * The request that is associated with the response.
     */
    request: {
        id: string;
        host: string;
        port: number;
        path: string;
        query: string;
        isTls: boolean;
    };
    /**
     * The response that is currently open in the response pane.
     */
    response: {
        id: string;
        raw: string;
        statusCode: number;
        roundtripTime: number;
    };
    /**
     * The currently selected text in the response pane.
     */
    selection: string;
};
export {};
