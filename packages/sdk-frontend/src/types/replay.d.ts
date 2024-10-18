/**
 * A replay tab.
 * @category Replay
 */
export type ReplayTab = {
    /**
     * The ID of the session associated with this tab.
     */
    sessionId: string;
};
/**
 * A session in Replay.
 * @category Replay
 */
export type ReplaySession = {
    /**
     * The ID of the session.
     */
    id: string;
    /**
     * The name of the session.
     */
    name: string;
    /**
     * The ID of the collection the session belongs to.
     */
    collectionId: string;
};
/**
 * A collection in Replay.
 * @category Replay
 */
export type ReplayCollection = {
    /**
     * The ID of the collection.
     */
    id: string;
    /**
     * The name of the collection.
     */
    name: string;
    /**
     * The sessions in the collection.
     */
    sessionIds: string[];
};
/**
 * Utilities to interact with Replay.
 * @category Replay
 */
export type ReplaySDK = {
    /**
     * Open a replay tab for the given session.
     * @param sessionId The ID of the session to open.
     */
    openTab: (sessionId: string) => void;
    /**
     * Close a replay tab for the given session.
     * @param sessionId The ID of the session to close.
     */
    closeTab: (sessionId: string) => void;
    /**
     * Get the list of all open replay tabs.
     * @returns The list of all open replay tabs.
     */
    getTabs: () => ReplayTab[];
    /**
     * Get the list of all replay collections.
     * @returns The list of all replay collections.
     */
    getCollections: () => ReplayCollection[];
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
    renameSession: (id: string, name: string) => Promise<ReplaySession>;
};
