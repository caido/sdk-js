import { type ID, type Selection } from "./utils";
/**
 * An entry in sitemap.
 * @category Sitemap
 */
export type SitemapEntry = {
    /**
     * The ID of the entry.
     */
    id: ID;
    /**
     * The label of the entry.
     */
    label: string;
    /**
     * The kind of the entry.
     */
    kind: SitemapEntryKind;
    /**
     * The ID of the parent entry.
     */
    parentId?: ID;
    /**
     * The child state of the entry.
     */
    childState: ChildState;
};
export type SitemapRootEntry = {
    /**
     * The ID of the entry.
     */
    id: ID;
    /**
     * The label of the entry.
     */
    label: string;
    /**
     * The child state of the entry.
     */
    childState: ChildState;
};
/**
 * The kind of a sitemap entry.
 * @category Sitemap
 */
export declare const SitemapEntryKind: {
    readonly Directory: "DIRECTORY";
    readonly Domain: "DOMAIN";
    readonly Request: "REQUEST";
    readonly RequestBody: "REQUEST_BODY";
    readonly RequestQuery: "REQUEST_QUERY";
};
/**
 * The kind of a sitemap entry.
 * @category Sitemap
 * @example
 * ```ts
 * const entry = {
 *   id: "123",
 *   label: "Example",
 *   kind: SitemapEntryKind.Request,
 * };
 * ```
 */
export type SitemapEntryKind = (typeof SitemapEntryKind)[keyof typeof SitemapEntryKind];
export type ChildState = {
    kind: "Empty";
} | {
    kind: "NotLoaded";
} | {
    kind: "Loaded";
    items: ID[];
};
/**
 * Event fired when the child state of a sitemap entry changes.
 * @category Sitemap
 */
export type SitemapEntryChildStateUpdateEvent = {
    /**
     * The ID of the entry that changed.
     */
    entryId: ID;
    /**
     * The new child state of the entry.
     */
    newChildState: ChildState;
};
/**
 * Sitemap page context.
 * @category Sitemap
 */
export type SitemapPageContext = {
    kind: "Sitemap";
    entrySelection: Selection<ID>;
    requestSelection: Selection<ID>;
};
