import { type Extension } from "@codemirror/state";
import { type ReplayCollection, type ReplaySession, type ReplaySlot, type ReplayTab } from "../types/replay";
import { type ButtonSlotContent, type CommandSlotContent, type CustomSlotContent, type DefineAddToSlotFn } from "../types/slots";
import type { ID } from "../types/utils";
/**
 * Utilities to interact with Replay.
 * @category Replay
 */
export type ReplaySDK = {
    /**
     * Open a replay tab for the given session.
     * @param sessionId The ID of the session to open.
     */
    openTab: (sessionId: ID) => void;
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
    addToSlot: DefineAddToSlotFn<{
        [ReplaySlot.SessionToolbarPrimary]: ButtonSlotContent | CustomSlotContent | CommandSlotContent;
        [ReplaySlot.SessionToolbarSecondary]: ButtonSlotContent | CustomSlotContent | CommandSlotContent;
        [ReplaySlot.Topbar]: ButtonSlotContent | CustomSlotContent | CommandSlotContent;
    }>;
    /**
     * Add an extension to the request editor.
     * @param extension The extension to add.
     */
    addRequestEditorExtension: (extension: Extension) => void;
};
