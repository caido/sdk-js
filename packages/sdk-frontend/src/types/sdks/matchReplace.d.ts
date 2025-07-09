import { type MatchReplaceCollection, type MatchReplaceRule, type MatchReplaceSection } from "../types/matchReplace";
import type { HTTPQL, ID } from "../types/utils";
/**
 * Utilities to interact with the Match and Replace page.
 * @category Match and Replace
 */
export type MatchReplaceSDK = {
    /**
     * Get all collections.
     */
    getCollections: () => MatchReplaceCollection[];
    /**
     * Create a collection.
     * @param options - The options for the collection.
     * @param options.name - The name of the collection.
     */
    createCollection: (options: {
        name: string;
    }) => Promise<MatchReplaceCollection>;
    /**
     * Update a collection.
     * @param id - The ID of the collection.
     * @param options - The new values for the collection.
     * @param options.name - The new name of the collection.
     */
    updateCollection: (id: ID, options: {
        name: string;
    }) => Promise<MatchReplaceCollection>;
    /**
     * Delete a collection.
     * @param id - The ID of the collection.
     */
    deleteCollection: (id: ID) => Promise<void>;
    /**
     * Get all rules.
     * @returns All rules.
     */
    getRules: () => MatchReplaceRule[];
    /**
     * Get all active rules.
     * Rules are ordered in priority from highest to lowest.
     * @returns All active rules.
     */
    getActiveRules: () => MatchReplaceRule[];
    /**
     * Select a rule to be displayed in the UI.
     * @param id - The ID of the rule, or undefined to clear the selection.
     */
    selectRule: (id: ID | undefined) => void;
    /**
     * Create a rule.
     * @param options - The options for the rule.
     * @param options.name - The name of the rule.
     * @param options.query - The HTTPQL query to match the rule against.
     * @param options.collectionId - The ID of the collection the rule belongs to.
     */
    createRule: (options: {
        name: string;
        query: HTTPQL;
        section: MatchReplaceSection;
        collectionId: ID;
    }) => Promise<MatchReplaceRule>;
    /**
     * Update a rule.
     * @param id - The ID of the rule.
     * @param options - The new values for the rule.
     * @param options.name - The new name of the rule.
     * @param options.query - The new HTTPQL query of the rule.
     * @param options.section - The new section of the rule.
     */
    updateRule: (id: ID, options: {
        name: string;
        query?: HTTPQL;
        section: MatchReplaceSection;
    }) => Promise<MatchReplaceRule>;
    /**
     * Toggle a rule.
     * @param id - The ID of the rule.
     * @param enabled - Whether the rule should be enabled.
     */
    toggleRule: (id: ID, enabled: boolean) => Promise<void>;
    /**
     * Delete a rule.
     * @param id - The ID of the rule.
     */
    deleteRule: (id: ID) => Promise<void>;
};
