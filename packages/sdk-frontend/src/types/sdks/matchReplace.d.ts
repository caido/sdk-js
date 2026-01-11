import { type CurrentMatchReplaceRuleChangeEvent, type MatchReplaceCollection, type MatchReplaceRule, type MatchReplaceSection, type MatchReplaceSlotContent, type Source } from "../types/matchReplace";
import { type DefineAddToSlotFn } from "../types/slots";
import type { AddIndicatorOptions, HTTPQL, ID, Indicator, ListenerHandle } from "../types/utils";
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
     * Get the currently selected rule.
     * @returns The currently selected rule, or undefined if no rule is selected.
     */
    getCurrentRule: () => MatchReplaceRule | undefined;
    /**
     * Subscribe to current rule changes.
     * @param callback The callback to call when the selected rule changes.
     * @returns An object with a `stop` method that can be called to stop listening to rule changes.
     *
     * @example
     * ```ts
     * const handler = sdk.matchReplace.onCurrentRuleChange((event) => {
     *   console.log(`Rule ${event.ruleId} got selected!`);
     * });
     *
     * // Later, stop listening
     * handler.stop();
     * ```
     */
    onCurrentRuleChange: (callback: (event: CurrentMatchReplaceRuleChangeEvent) => void) => ListenerHandle;
    /**
     * Create a rule.
     * @param options - The options for the rule.
     * @param options.name - The name of the rule.
     * @param options.query - The HTTPQL query to match the rule against.
     * @param options.collectionId - The ID of the collection the rule belongs to.
     * @param options.sources - The sources the rule belongs to.
     */
    createRule: (options: {
        name: string;
        query: HTTPQL;
        section: MatchReplaceSection;
        collectionId: ID;
        sources: Array<Source>;
    }) => Promise<MatchReplaceRule>;
    /**
     * Update a rule.
     * @param id - The ID of the rule.
     * @param options - The new values for the rule.
     * @param options.name - The new name of the rule.
     * @param options.query - The new HTTPQL query of the rule.
     * @param options.section - The new section of the rule.
     * @param options.sources - The new sources of the rule.
     */
    updateRule: (id: ID, options: {
        name: string;
        query?: HTTPQL;
        section: MatchReplaceSection;
        sources: Array<Source>;
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
    /**
     * Add a component to a slot.
     * @param slot The slot to add the component to.
     * @param content The content to add to the slot.
     * @example
     * ```ts
     * sdk.matchReplace.addToSlot(MatchReplaceSlot.UpdateHeader, {
     *   type: "Button",
     *   label: "My Button",
     *   icon: "my-icon",
     *   onClick: () => {
     *     console.log("Button clicked");
     *   },
     * });
     *
     * sdk.matchReplace.addToSlot(MatchReplaceSlot.CreateHeader, {
     *   type: "Custom",
     *   definition: MyComponent,
     * });
     *
     * sdk.matchReplace.addToSlot(MatchReplaceSlot.UpdateHeader, {
     *   type: "Command",
     *   commandId: "my-command",
     *   icon: "my-icon",
     * });
     * ```
     */
    addToSlot: DefineAddToSlotFn<MatchReplaceSlotContent>;
    /**
     * Add an indicator to a rule.
     * Indicators are displayed next to the session name in the collections tree.
     * @param ruleId The ID of the rule to add the indicator to.
     * @param indicator The indicator configuration.
     * @returns A handle object with a `remove` method to remove the indicator.
     * @example
     *
     * const indicator = sdk.matchReplace.addRuleIndicator(ruleId, {
     *   icon: "fas fa-exclamation-triangle",
     *   description: "Security warning",
     * });
     *
     * // Later, remove the indicator
     * indicator.remove();
     *
     */
    addRuleIndicator: (ruleId: ID, indicator: AddIndicatorOptions) => Indicator;
};
