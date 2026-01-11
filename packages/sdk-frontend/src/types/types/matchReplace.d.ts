import { type ButtonSlotContent, type CommandSlotContent, type CustomSlotContent } from "./slots";
import { type HTTPQL, type ID, type Selection } from "./utils";
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
/**
 * The source of a match and replace rule.
 * @category Match and Replace
 */
export declare const Source: {
    readonly Automate: "AUTOMATE";
    readonly Intercept: "INTERCEPT";
    readonly Plugin: "PLUGIN";
    readonly Replay: "REPLAY";
    readonly Sample: "SAMPLE";
    readonly Workflow: "WORKFLOW";
};
export type Source = (typeof Source)[keyof typeof Source];
/**
 * A discriminated union of all possible match and replace sections.
 * @category Match and Replace
 */
export type MatchReplaceSection = MatchReplaceSectionRequestAll | MatchReplaceSectionRequestBody | MatchReplaceSectionRequestFirstLine | MatchReplaceSectionRequestHeader | MatchReplaceSectionRequestMethod | MatchReplaceSectionRequestPath | MatchReplaceSectionRequestQuery | MatchReplaceSectionRequestSNI | MatchReplaceSectionResponseAll | MatchReplaceSectionResponseBody | MatchReplaceSectionResponseFirstLine | MatchReplaceSectionResponseHeader | MatchReplaceSectionResponseStatusCode;
/**
 * A section for the entire request.
 * @category Match and Replace
 */
export type MatchReplaceSectionRequestAll = {
    kind: "SectionRequestAll";
    operation: MatchReplaceOperationAll;
};
/**
 * A section for the entire response.
 * @category Match and Replace
 */
export type MatchReplaceSectionResponseAll = {
    kind: "SectionResponseAll";
    operation: MatchReplaceOperationAll;
};
/**
 * An operation for the entire request/response section.
 * @category Match and Replace
 */
export type MatchReplaceOperationAll = KeepOperation<MatchReplaceOperationAllRaw>;
/**
 * A raw operation for the entire request/response section.
 * @category Match and Replace
 */
export type MatchReplaceOperationAllRaw = {
    kind: "OperationAllRaw";
    matcher: MatchReplaceMatcherRaw;
    replacer: MatchReplaceReplacer;
};
/**
 * A section for the response status code.
 * @category Match and Replace
 */
export type MatchReplaceSectionResponseStatusCode = {
    kind: "SectionResponseStatusCode";
    operation: MatchReplaceOperationStatusCode;
};
/**
 * An operation for the response status code section.
 * @category Match and Replace
 */
export type MatchReplaceOperationStatusCode = KeepOperation<MatchReplaceOperationStatusCodeUpdate>;
/**
 * An operation to update the response status code.
 * @category Match and Replace
 */
export type MatchReplaceOperationStatusCodeUpdate = {
    kind: "OperationStatusCodeUpdate";
    replacer: MatchReplaceReplacer;
};
/**
 * A section for the request query string.
 * @category Match and Replace
 */
export type MatchReplaceSectionRequestQuery = {
    kind: "SectionRequestQuery";
    operation: MatchReplaceOperationQuery;
};
/**
 * An operation for the request query section.
 * @category Match and Replace
 */
export type MatchReplaceOperationQuery = MatchReplaceOperationQueryRaw | MatchReplaceOperationQueryAdd | MatchReplaceOperationQueryRemove | MatchReplaceOperationQueryUpdate;
/**
 * A raw operation for the request query section.
 * @category Match and Replace
 */
export type MatchReplaceOperationQueryRaw = {
    kind: "OperationQueryRaw";
    matcher: MatchReplaceMatcherRaw;
    replacer: MatchReplaceReplacer;
};
/**
 * An operation to add a query parameter.
 * @category Match and Replace
 */
export type MatchReplaceOperationQueryAdd = {
    kind: "OperationQueryAdd";
    matcher: MatchReplaceMatcherName;
    replacer: MatchReplaceReplacer;
};
/**
 * An operation to remove a query parameter.
 * @category Match and Replace
 */
export type MatchReplaceOperationQueryRemove = {
    kind: "OperationQueryRemove";
    matcher: MatchReplaceMatcherName;
};
/**
 * An operation to update a query parameter.
 * @category Match and Replace
 */
export type MatchReplaceOperationQueryUpdate = {
    kind: "OperationQueryUpdate";
    matcher: MatchReplaceMatcherName;
    replacer: MatchReplaceReplacer;
};
/**
 * A section for the request path.
 * @category Match and Replace
 */
export type MatchReplaceSectionRequestPath = {
    kind: "SectionRequestPath";
    operation: MatchReplaceOperationPath;
};
/**
 * An operation for the request path section.
 * @category Match and Replace
 */
export type MatchReplaceOperationPath = KeepOperation<MatchReplaceOperationPathRaw>;
/**
 * A raw operation for the request path section.
 * @category Match and Replace
 */
export type MatchReplaceOperationPathRaw = {
    kind: "OperationPathRaw";
    matcher: MatchReplaceMatcherRaw;
    replacer: MatchReplaceReplacer;
};
/**
 * A section for the request method.
 * @category Match and Replace
 */
export type MatchReplaceSectionRequestMethod = {
    kind: "SectionRequestMethod";
    operation: MatchReplaceOperationMethod;
};
/**
 * An operation for the request method section.
 * @category Match and Replace
 */
export type MatchReplaceOperationMethod = KeepOperation<MatchReplaceOperationMethodUpdate>;
/**
 * An operation to update the request method.
 * @category Match and Replace
 */
export type MatchReplaceOperationMethodUpdate = {
    kind: "OperationMethodUpdate";
    replacer: MatchReplaceReplacer;
};
/**
 * A section for the request headers.
 * @category Match and Replace
 */
export type MatchReplaceSectionRequestHeader = {
    kind: "SectionRequestHeader";
    operation: MatchReplaceOperationHeader;
};
/**
 * A section for the response headers.
 * @category Match and Replace
 */
export type MatchReplaceSectionResponseHeader = {
    kind: "SectionResponseHeader";
    operation: MatchReplaceOperationHeader;
};
/**
 * An operation for the header section.
 * @category Match and Replace
 */
export type MatchReplaceOperationHeader = MatchReplaceOperationHeaderRaw | MatchReplaceOperationHeaderAdd | MatchReplaceOperationHeaderRemove | MatchReplaceOperationHeaderUpdate;
/**
 * A raw operation for the header section.
 * @category Match and Replace
 */
export type MatchReplaceOperationHeaderRaw = {
    kind: "OperationHeaderRaw";
    matcher: MatchReplaceMatcherRaw;
    replacer: MatchReplaceReplacer;
};
/**
 * An operation to add a header.
 * @category Match and Replace
 */
export type MatchReplaceOperationHeaderAdd = {
    kind: "OperationHeaderAdd";
    matcher: MatchReplaceMatcherName;
    replacer: MatchReplaceReplacer;
};
/**
 * An operation to remove a header.
 * @category Match and Replace
 */
export type MatchReplaceOperationHeaderRemove = {
    kind: "OperationHeaderRemove";
    matcher: MatchReplaceMatcherName;
};
/**
 * An operation to update a header.
 * @category Match and Replace
 */
export type MatchReplaceOperationHeaderUpdate = {
    kind: "OperationHeaderUpdate";
    matcher: MatchReplaceMatcherName;
    replacer: MatchReplaceReplacer;
};
/**
 * A section for the request body.
 * @category Match and Replace
 */
export type MatchReplaceSectionRequestBody = {
    kind: "SectionRequestBody";
    operation: MatchReplaceOperationBody;
};
/**
 * A section for the response body.
 * @category Match and Replace
 */
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
/**
 * An operation for the request SNI section.
 * @category Match and Replace
 */
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
/**
 * An operation for the first line section.
 * @category Match and Replace
 */
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
/**
 * A matcher that matches by name (for headers, query parameters, etc.).
 * @category Match and Replace
 */
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
/**
 * The slots in the Match and Replace UI.
 * @category Match and Replace
 */
export declare const MatchReplaceSlot: {
    /**
     * The header area of the rule form update component.
     */
    readonly UpdateHeader: "update-header";
    /**
     * The header area of the rule form create component.
     */
    readonly CreateHeader: "create-header";
};
export type MatchReplaceSlot = (typeof MatchReplaceSlot)[keyof typeof MatchReplaceSlot];
/**
 * Content that can be added to match and replace slots.
 * @category Match and Replace
 */
export type MatchReplaceSlotContent = {
    [MatchReplaceSlot.UpdateHeader]: ButtonSlotContent | CustomSlotContent | CommandSlotContent;
    [MatchReplaceSlot.CreateHeader]: ButtonSlotContent | CustomSlotContent | CommandSlotContent;
};
/**
 * Event fired when the current match and replace rule changes.
 * @category Match and Replace
 */
export type CurrentMatchReplaceRuleChangeEvent = {
    /**
     * The ID of the newly selected rule, or undefined if no rule is selected.
     */
    ruleId: ID | undefined;
};
/**
 * Match and Replace page context.
 * @category Match and Replace
 */
export type MatchReplacePageContext = {
    kind: "MatchReplace";
    selection: Selection<ID>;
};
export {};
