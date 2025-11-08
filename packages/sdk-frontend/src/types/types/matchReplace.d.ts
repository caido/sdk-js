import { type HTTPQL, type ID } from "./utils";
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
export type MatchReplaceSection = MatchReplaceSectionRequestAll | MatchReplaceSectionRequestBody | MatchReplaceSectionRequestFirstLine | MatchReplaceSectionRequestHeader | MatchReplaceSectionRequestMethod | MatchReplaceSectionRequestPath | MatchReplaceSectionRequestQuery | MatchReplaceSectionRequestSNI | MatchReplaceSectionResponseAll | MatchReplaceSectionResponseBody | MatchReplaceSectionResponseFirstLine | MatchReplaceSectionResponseHeader | MatchReplaceSectionResponseStatusCode;
export type MatchReplaceSectionRequestAll = {
    kind: "SectionRequestAll";
    operation: MatchReplaceOperationAll;
};
export type MatchReplaceSectionResponseAll = {
    kind: "SectionResponseAll";
    operation: MatchReplaceOperationAll;
};
export type MatchReplaceOperationAll = KeepOperation<MatchReplaceOperationAllRaw>;
export type MatchReplaceOperationAllRaw = {
    kind: "OperationAllRaw";
    matcher: MatchReplaceMatcherRaw;
    replacer: MatchReplaceReplacer;
};
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
 * A section for the request SNI.
 * @category Match and Replace
 */
export type MatchReplaceSectionRequestSNI = {
    kind: "SectionRequestSNI";
    operation: MatchReplaceOperationSNI;
};
export type MatchReplaceOperationSNI = KeepOperation<MatchReplaceOperationSNIRaw>;
/**
 * A raw operation for the request SNI.
 * @category Match and Replace
 */
export type MatchReplaceOperationSNIRaw = {
    kind: "OperationSNIRaw";
    replacer: MatchReplaceReplacer;
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
