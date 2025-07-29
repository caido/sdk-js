import { type ButtonSlotContent, type CommandSlotContent, type CustomSlotContent } from "./slots";
import { type ID } from "./utils";
/**
 * The slots in the Replay UI.
 * @category Replay
 */
export declare const ReplaySlot: {
    /**
     * The left side of the session toolbar.
     */
    readonly SessionToolbarPrimary: "session-toolbar-primary";
    /**
     * The right side of the session toolbar.
     */
    readonly SessionToolbarSecondary: "session-toolbar-secondary";
    /**
     * The left side of the topbar.
     */
    readonly Topbar: "topbar";
};
export type ReplaySlot = (typeof ReplaySlot)[keyof typeof ReplaySlot];
export type ReplaySlotContent = {
    [ReplaySlot.SessionToolbarPrimary]: ButtonSlotContent | CustomSlotContent | CommandSlotContent;
    [ReplaySlot.SessionToolbarSecondary]: ButtonSlotContent | CustomSlotContent | CommandSlotContent;
    [ReplaySlot.Topbar]: ButtonSlotContent | CustomSlotContent | CommandSlotContent;
};
/**
 * Options for opening a tab.
 * @category Replay
 */
export type OpenTabOptions = {
    /**
     * Whether to select the tab after opening it.
     * Defaults to true.
     */
    select?: boolean;
};
/**
 * A replay tab.
 * @category Replay
 */
export type ReplayTab = {
    /**
     * The ID of the session associated with this tab.
     */
    sessionId: ID;
};
/**
 * A session in Replay.
 * @category Replay
 */
export type ReplaySession = {
    /**
     * The ID of the session.
     */
    id: ID;
    /**
     * The name of the session.
     */
    name: string;
    /**
     * The ID of the collection the session belongs to.
     */
    collectionId: ID;
};
/**
 * A collection in Replay.
 * @category Replay
 */
export type ReplayCollection = {
    /**
     * The ID of the collection.
     */
    id: ID;
    /**
     * The name of the collection.
     */
    name: string;
    /**
     * The sessions in the collection.
     */
    sessionIds: ID[];
};
/**
 * Options for sending a request.
 * @category Replay
 */
export type SendRequestOptions = {
    /**
     * The connection information to use for the request.
     */
    connectionInfo: {
        /**
         * The host to use for the request.
         */
        host: string;
        /**
         * The port to use for the request.
         */
        port: number;
        /**
         * Whether the request is TLS.
         */
        isTLS: boolean;
        /**
         * The SNI to use for the request.
         * If not provided, the SNI will be inferred from the host.
         */
        SNI?: string;
    };
    /**
     * The raw request to send.
     */
    raw: string;
    /**
     * Whether to update the content length automatically to match the body.
     * Defaults to true.
     */
    updateContentLength?: boolean;
    /**
     * Whether to overwrite the editor's draft content.
     * If true, draft content will be overwritten with the new request.
     * If false, the draft will be kept.
     * Defaults to true.
     */
    overwriteDraft?: boolean;
    /**
     * Whether to send the request in the background without updating the UI.
     * If true, the request will not update the UI.
     * If false, the UI will be updated to display the session and the new request.
     * Defaults to false.
     */
    background?: boolean;
};
