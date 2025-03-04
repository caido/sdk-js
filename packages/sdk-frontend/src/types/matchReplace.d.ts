import type { HTTPQL, ID } from "./utils";
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
/**
 * A rule in Match and Replace.
 * @category Match and Replace
 */
export type MatchReplaceRule = {
    /**
     * The ID of the rule.
     */
    id: ID;
    /**
     * The name of the rule.
     */
    name: string;
    /**
     * Whether the rule is enabled.
     */
    isEnabled: boolean;
    /**
     * The HTTPQL query to match the rule against.
     * Only requests that match the query will be affected by the rule.
     */
    query: HTTPQL;
    /**
     * The section of the rule.
     */
    section: MatchReplaceSection;
    /**
     * The ID of the collection the rule belongs to.
     */
    collectionId: ID;
};
export type MatchReplaceSection = MatchReplaceSectionRequestBody | MatchReplaceSectionRequestFirstLine | MatchReplaceSectionRequestHeader | MatchReplaceSectionRequestMethod | MatchReplaceSectionRequestPath | MatchReplaceSectionRequestQuery | MatchReplaceSectionResponseBody | MatchReplaceSectionResponseFirstLine | MatchReplaceSectionResponseHeader | MatchReplaceSectionResponseStatusCode;
export type MatchReplaceSectionResponseStatusCode = {
    kind: "SectionResponseStatusCode";
    operation: MatchReplaceOperationStatusCode;
};
export type MatchReplaceOperationStatusCode = KeepOperation<MatchReplaceOperationStatusCodeUpdate>;
export type MatchReplaceOperationStatusCodeUpdate = {
    kind: "OperationStatusCodeUpdate";
    replacer: MatchReplaceReplacer;
};
export type MatchReplaceSectionRequestQuery = {
    kind: "SectionRequestQuery";
    operation: MatchReplaceOperationQuery;
};
export type MatchReplaceOperationQuery = MatchReplaceOperationQueryRaw | MatchReplaceOperationQueryAdd | MatchReplaceOperationQueryRemove | MatchReplaceOperationQueryUpdate;
export type MatchReplaceOperationQueryRaw = {
    kind: "OperationQueryRaw";
    matcher: MatchReplaceMatcherRaw;
    replacer: MatchReplaceReplacer;
};
export type MatchReplaceOperationQueryAdd = {
    kind: "OperationQueryAdd";
    matcher: MatchReplaceMatcherName;
    replacer: MatchReplaceReplacer;
};
export type MatchReplaceOperationQueryRemove = {
    kind: "OperationQueryRemove";
    matcher: MatchReplaceMatcherName;
};
export type MatchReplaceOperationQueryUpdate = {
    kind: "OperationQueryUpdate";
    matcher: MatchReplaceMatcherName;
    replacer: MatchReplaceReplacer;
};
export type MatchReplaceSectionRequestPath = {
    kind: "SectionRequestPath";
    operation: MatchReplaceOperationPath;
};
export type MatchReplaceOperationPath = KeepOperation<MatchReplaceOperationPathRaw>;
export type MatchReplaceOperationPathRaw = {
    kind: "OperationPathRaw";
    matcher: MatchReplaceMatcherRaw;
    replacer: MatchReplaceReplacer;
};
export type MatchReplaceSectionRequestMethod = {
    kind: "SectionRequestMethod";
    operation: MatchReplaceOperationMethod;
};
export type MatchReplaceOperationMethod = KeepOperation<MatchReplaceOperationMethodUpdate>;
export type MatchReplaceOperationMethodUpdate = {
    kind: "OperationMethodUpdate";
    replacer: MatchReplaceReplacer;
};
export type MatchReplaceSectionRequestHeader = {
    kind: "SectionRequestHeader";
    operation: MatchReplaceOperationHeader;
};
export type MatchReplaceSectionResponseHeader = {
    kind: "SectionResponseHeader";
    operation: MatchReplaceOperationHeader;
};
/**
 * An operation for the header section.
 * @category Match and Replace
 */
export type MatchReplaceOperationHeader = MatchReplaceOperationHeaderRaw | MatchReplaceOperationHeaderAdd | MatchReplaceOperationHeaderRemove | MatchReplaceOperationHeaderUpdate;
export type MatchReplaceOperationHeaderRaw = {
    kind: "OperationHeaderRaw";
    matcher: MatchReplaceMatcherRaw;
    replacer: MatchReplaceReplacer;
};
export type MatchReplaceOperationHeaderAdd = {
    kind: "OperationHeaderAdd";
    matcher: MatchReplaceMatcherName;
    replacer: MatchReplaceReplacer;
};
export type MatchReplaceOperationHeaderRemove = {
    kind: "OperationHeaderRemove";
    matcher: MatchReplaceMatcherName;
};
export type MatchReplaceOperationHeaderUpdate = {
    kind: "OperationHeaderUpdate";
    matcher: MatchReplaceMatcherName;
    replacer: MatchReplaceReplacer;
};
export type MatchReplaceSectionRequestBody = {
    kind: "SectionRequestBody";
    operation: MatchReplaceOperationBody;
};
export type MatchReplaceSectionResponseBody = {
    kind: "SectionResponseBody";
    operation: MatchReplaceOperationBody;
};
/**
 * An operation for the body section.
 * @category Match and Replace
 */
export type MatchReplaceOperationBody = KeepOperation<MatchReplaceOperationBodyRaw>;
/**
 * A raw operation for the body section.
 * @category Match and Replace
 */
export type MatchReplaceOperationBodyRaw = {
    kind: "OperationBodyRaw";
    matcher: MatchReplaceMatcherRaw;
    replacer: MatchReplaceReplacer;
};
/**
 * A section for the request first line.
 * @category Match and Replace
 */
export type MatchReplaceSectionRequestFirstLine = {
    kind: "SectionRequestFirstLine";
    operation: MatchReplaceOperationFirstLine;
};
/**
 * A section for the response first line.
 * @category Match and Replace
 */
export type MatchReplaceSectionResponseFirstLine = {
    kind: "SectionResponseFirstLine";
    operation: MatchReplaceOperationFirstLine;
};
export type MatchReplaceOperationFirstLine = KeepOperation<MatchReplaceOperationFirstLineRaw>;
/**
 * A raw operation for the request first line.
 * @category Match and Replace
 */
export type MatchReplaceOperationFirstLineRaw = {
    kind: "OperationFirstLineRaw";
    matcher: MatchReplaceMatcherRaw;
    replacer: MatchReplaceReplacer;
};
export type MatchReplaceMatcherName = {
    kind: "MatcherName";
    name: string;
};
/**
 * A matcher for raw operations in Match and Replace.
 * @category Match and Replace
 */
export type MatchReplaceMatcherRaw = MatchReplaceMatcherRawRegex | MatchReplaceMatcherRawValue | MatchReplaceMatcherRawFull;
/**
 * This matcher will match using a regex over the section.
 * @category Match and Replace
 */
export type MatchReplaceMatcherRawRegex = {
    kind: "MatcherRawRegex";
    regex: string;
};
/**
 * This matcher will match the value if present in the section.
 * @category Match and Replace
 */
export type MatchReplaceMatcherRawValue = {
    kind: "MatcherRawValue";
    value: string;
};
/**
 * This matcher will match the entire section.
 * @category Match and Replace
 */
export type MatchReplaceMatcherRawFull = {
    kind: "MatcherRawFull";
};
/**
 * A replacer in Match and Replace.
 * @category Match and Replace
 */
export type MatchReplaceReplacer = MatchReplaceReplacerTerm | MatchReplaceReplacerWorkflow;
/**
 * A replacer that replaces with a term.
 * If the matcher is a regex, groups will be interpolated.
 * @category Match and Replace
 */
export type MatchReplaceReplacerTerm = {
    kind: "ReplacerTerm";
    term: string;
};
/**
 * A replacer that replaces with the result of a workflow.
 * The input of the workflow depends on the operation and matcher.
 * @category Match and Replace
 */
export type MatchReplaceReplacerWorkflow = {
    kind: "ReplacerWorkflow";
    workflowId: ID;
};
/**
 * A collection in Match and Replace.
 * @category Match and Replace
 */
export type MatchReplaceCollection = {
    id: ID;
    name: string;
    ruleIds: ID[];
};
type KeepOperation<T> = T & {
    __operation?: never;
};
export {};
