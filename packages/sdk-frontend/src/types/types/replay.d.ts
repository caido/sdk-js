import { type ButtonSlotContent, type CommandSlotContent, type CustomSlotContent } from "./slots";
import { type ID, type Selection } from "./utils";
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
    /**
     * The IDs of all entries in this session.
     */
    entryIds: ID[];
};
/**
 * A replay entry.
 * @category Replay
 */
export type ReplayEntry = {
    /**
     * The ID of the entry.
     */
    id: ID;
    /**
     * The ID of the session this entry belongs to.
     */
    sessionId: ID;
    /**
     * The ID of the request associated with this entry, if any.
     */
    requestId?: ID;
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
     * Whether to force close the connection by setting Connection: close header.
     * Defaults to true.
     */
    connectionClose?: boolean;
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
/**
 * @category Replay
 *
 * @remarks
 * This type is a discriminated union with two possible shapes:
 * - A raw request, containing the raw HTTP request string and connection information.
 * - A reference to an existing request ID.
 *
 * @example
 * // Using a raw request
 * const source: RequestSource = {
 *   type: "Raw",
 *   raw: "GET /api/data HTTP/1.1",
 *   connectionInfo: { ... }
 * };
 * // Using an ID
 * const source: RequestSource = {
 *   type: "ID",
 *   id: "request-123"
 * };
 */
export type RequestSource = {
    type: "Raw";
    raw: string;
    connectionInfo: SendRequestOptions["connectionInfo"];
} | {
    type: "ID";
    id: string;
};
/**
 * Event fired when the current replay session changes.
 * @category Replay
 */
export type CurrentReplaySessionChangeEvent = {
    /**
     * The ID of the newly selected session, or undefined if no session is selected.
     */
    sessionId: ID | undefined;
};
/**
 * Event fired when a replay session is created.
 * @category Replay
 */
export type ReplaySessionCreatedEvent = {
    /**
     * The newly created replay session.
     */
    session: ReplaySession;
};
/**
 * Event fired when a replay collection is created.
 * @category Replay
 */
export type ReplayCollectionCreatedEvent = {
    /**
     * The newly created replay collection.
     */
    collection: ReplayCollection;
};
/**
 * Replay page context.
 * @category Replay
 */
export type ReplayPageContext = {
    kind: "Replay";
    selection: Selection<ReplaySessionId>;
};
/**
 * A unique replay session identifier.
 * @category Replay
 */
type ReplaySessionId = string & {
    __replaySessionId?: never;
};
export {};
