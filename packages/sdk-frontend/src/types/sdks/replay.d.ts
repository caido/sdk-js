import { type Extension } from "@codemirror/state";
import { type CurrentReplaySessionChangeEvent, type OpenTabOptions, type ReplayCollection, type ReplayCollectionCreatedEvent, type ReplayEntry, type ReplaySession, type ReplaySessionCreatedEvent, type ReplaySlotContent, type ReplayTab, type RequestSource, type SendRequestOptions } from "../types/replay";
import type { RequestViewModeOptions } from "../types/request";
import { type DefineAddToSlotFn } from "../types/slots";
import type { AddIndicatorOptions, ID, Indicator, ListenerHandle } from "../types/utils";
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
     * Get the currently selected replay session.
     * @returns The currently selected replay session, or undefined if no session is selected.
     * @example
     * ```ts
     * const currentSession = sdk.replay.getCurrentSession();
     * if (currentSession) {
     *   console.log(`Current session: ${currentSession.name}`);
     * } else {
     *   console.log("No session is currently selected");
     * }
     * ```
     */
    getCurrentSession: () => ReplaySession | undefined;
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
     * Add a custom view mode for requests.
     * @param options The view mode options.
     */
    addRequestViewMode: (options: RequestViewModeOptions) => void;
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
    /**
     * Show a specific entry in a replay session.
     * This will open the session tab if not already open, set it as the selected session, and display the specified entry.
     * @param sessionId The ID of the session containing the entry.
     * @param entryId The ID of the entry to show.
     * @param options The options for showing the entry.
     * @param options.overwriteDraft Whether to overwrite the request draft. If true, the draft will be removed and the entry's raw request will be shown. If false, the draft will be kept.
     * @example
     * ```ts
     * await sdk.replay.showEntry(sessionId, entryId, {
     *   overwriteDraft: true,
     * });
     * ```
     */
    showEntry: (sessionId: ID, entryId: ID, options?: {
        overwriteDraft?: boolean;
    }) => Promise<void>;
    /**
     * Get a replay entry by its ID.
     * @param entryId The ID of the entry to get.
     * @returns The replay entry.
     * @example
     * ```ts
     * const entry = await sdk.replay.getEntry(entryId);
     * console.log(entry.id, entry.sessionId, entry.requestId);
     * ```
     */
    getEntry: (entryId: ID) => ReplayEntry;
    /**
     * Subscribe to current replay session changes.
     * @param callback The callback to call when the selected session changes.
     * @returns An object with a `stop` method that can be called to stop listening to session changes.
     *
     * @example
     * ```ts
     * const handler = sdk.replay.onCurrentSessionChange((event) => {
     *   console.log(`Session ${event.sessionId} got selected!`);
     * });
     *
     * // Later, stop listening
     * handler.stop();
     * ```
     */
    onCurrentSessionChange: (callback: (event: CurrentReplaySessionChangeEvent) => void) => ListenerHandle;
    /**
     * Subscribe to replay session creation events.
     * @param callback The callback to call when a session is created.
     * @returns An object with a `stop` method that can be called to stop listening to session creation events.
     *
     * @example
     * ```ts
     * const handler = sdk.replay.onSessionCreate((event) => {
     *   console.log(`Session ${event.session.id} was created!`);
     * });
     *
     * // Later, stop listening
     * handler.stop();
     * ```
     */
    onSessionCreate: (callback: (event: ReplaySessionCreatedEvent) => void) => ListenerHandle;
    /**
     * Subscribe to replay collection creation events.
     * @param callback The callback to call when a collection is created.
     * @returns An object with a `stop` method that can be called to stop listening to collection creation events.
     *
     * @example
     * ```ts
     * const handler = sdk.replay.onCollectionCreate((event) => {
     *   console.log(`Collection ${event.collection.id} was created!`);
     * });
     *
     * // Later, stop listening
     * handler.stop();
     * ```
     */
    onCollectionCreate: (callback: (event: ReplayCollectionCreatedEvent) => void) => ListenerHandle;
    /**
     * Add an indicator to a replay session.
     * Indicators are displayed next to the session name in the collections tree.
     * @param sessionId The ID of the session to add the indicator to.
     * @param indicator The indicator configuration.
     * @returns A handle object with a `remove` method to remove the indicator.
     * @example
     *
     * const indicator = sdk.replay.addSessionIndicator(sessionId, {
     *   icon: "fas fa-exclamation-triangle",
     *   description: "Security warning",
     * });
     *
     * // Later, remove the indicator
     * indicator.remove();
     *
     */
    addSessionIndicator: (sessionId: ID, indicator: AddIndicatorOptions) => Indicator;
};
