import { type ID, type Selection } from "./utils";
/**
 * A automate session.
 * @category Automate
 */
export type AutomateSession = {
    /**
     * The ID of the session.
     */
    id: ID;
    /**
     * The name of the session.
     */
    name: string;
    /**
     * The date the session was created.
     */
    createdAt: Date;
    /**
     * The IDs of all entries in this session.
     */
    entryIds: ID[];
};
/**
 * A automate entry.
 * @category Automate
 */
export type AutomateEntry = {
    /**
     * The ID of the entry.
     */
    id: ID;
    /**
     * The name of the entry.
     */
    name: string;
    /**
     * The date the entry was created.
     */
    createdAt: Date;
};
/**
 * Automate page context.
 * @category Automate
 */
export type AutomatePageContext = {
    kind: "Automate";
    requestSelection: Selection<ID>;
    selection: Selection<{
        kind: "AutomateSession";
        id: ID;
    } | {
        kind: "AutomateEntry";
        id: ID;
    }>;
};
