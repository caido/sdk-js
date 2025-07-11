import { type ButtonSlotContent, type CommandSlotContent, type CustomSlotContent } from "./slots";
import { type ID } from "./utils";
export declare const ReplaySlot: {
    readonly SessionToolbarPrimary: "session-toolbar-primary";
    readonly SessionToolbarSecondary: "session-toolbar-secondary";
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
