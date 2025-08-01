import { type Extension } from "@codemirror/state";
import { type OpenTabOptions, type ReplayCollection, type ReplaySession, type ReplaySlotContent, type ReplayTab, type RequestSource, type SendRequestOptions } from "../types/replay";
import { type DefineAddToSlotFn } from "../types/slots";
import type { ID } from "../types/utils";
/**
 * Utilities to interact with Replay.
 * @category Replay
 */
export type ReplaySDK = {
    /**
     * Open a replay tab for the given session.
     * @param sessionId The ID of the session to open.
     * @param options The options for opening the tab.
     */
    openTab: (sessionId: ID, options?: OpenTabOptions) => void;
    /**
     * Close a replay tab for the given session.
     * @param sessionId The ID of the session to close.
     */
    closeTab: (sessionId: ID) => void;
    /**
     * Get the list of all open replay tabs.
     * @returns The list of all open replay tabs.
     */
    getTabs: () => ReplayTab[];
    /**
     * Get the list of all replay sessions.
     * @returns The list of all replay sessions.
     */
    getSessions: () => ReplaySession[];
    /**
     * Rename a session.
     * @param id The ID of the session to rename.
     * @param name The new name of the session.
     * @returns The updated session.
     */
    renameSession: (id: ID, name: string) => Promise<ReplaySession>;
    /**
     * Move a session to a different collection.
     * @param sessionId The ID of the session to move.
     * @param collectionId The ID of the collection to move the session to.
     * @returns The updated session.
     */
    moveSession: (sessionId: ID, collectionId: ID) => Promise<ReplaySession>;
    /**
     * Delete a session.
     * @param sessionIds The IDs of the sessions to delete.
     */
    deleteSessions: (sessionIds: ID[]) => Promise<ID[]>;
    /**
     * Create a session.
     * @param sessionId The ID of the request to add.
     * @param collectionId The ID of the collection to add the request.
     */
    createSession: (source: RequestSource, collectionId?: ID) => Promise<void>;
    /**
     * Get the list of all replay collections.
     * @returns The list of all replay collections.
     */
    getCollections: () => ReplayCollection[];
    /**
     * Create a new collection.
     * @param name The name of the collection to create.
     */
    createCollection: (name: string) => Promise<ReplayCollection>;
    /**
     * Rename a collection.
     * @param id The ID of the collection to rename.
     * @param name The new name of the collection.
     * @returns The updated collection.
     */
    renameCollection: (id: ID, name: string) => Promise<ReplayCollection>;
    /**
     * Delete a collection.
     * @param id The ID of the collection to delete.
     * @returns Whether the collection was deleted.
     */
    deleteCollection: (id: ID) => Promise<boolean>;
    /**
     * Add a component to a slot.
     * @param slot The slot to add the component to.
     * @param content The content to add to the slot.
     * @example
     * ```ts
     * addToSlot(ReplaySlot.SessionToolbarPrimary, {
     *   kind: "Command",
     *   commandId: "my-command",
     *   icon: "my-icon",
     * });
     *
     * addToSlot(ReplaySlot.SessionToolbarSecondary, {
     *   kind: "Custom",
     *   component: MyComponent,
     * });
     *
     * addToSlot(ReplaySlot.Topbar, {
     *   kind: "Button",
     *   label: "My Button",
     *   icon: "my-icon",
     *   onClick: () => {
     *     console.log("Button clicked");
     *   },
     * });
     * ```
     */
    addToSlot: DefineAddToSlotFn<ReplaySlotContent>;
    /**
     * Add an extension to the request editor.
     * @param extension The extension to add.
     */
    addRequestEditorExtension: (extension: Extension) => void;
    /**
     * Send a request to the Replay backend.
     * @param request The request to send.
     * @param options The options for sending the request.
     * @example
     * ```ts
     * sendRequest(sessionId, {
     *   connectionInfo: {
     *     SNI: "example.com",
     *     host: "example.com",
     *     isTLS: true,
     *     port: 443,
     *   },
     *   raw: "GET / HTTP/1.1\r\nHost: example.com\r\n\r\n",
     *   updateContentLength: false,
     * });
     * ```
     */
    sendRequest: (sessionId: ID, options: SendRequestOptions) => Promise<void>;
};
