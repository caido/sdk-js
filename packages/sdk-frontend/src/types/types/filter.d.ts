import { type HTTPQL, type ID } from "./utils";
/**
 * Represents a filter.
 * @category Filters
 */
export type Filter = {
    /**
     * The ID of the filter.
     */
    id: ID;
    /**
     * The name of the filter.
     */
    name: string;
    /**
     * The alias of the filter.
     * This alias is used when referencing the filter in an HTTPQL query (e.g. `preset:my-alias`).
     */
    alias: string;
    /**
     * The HTTPQL expression of the filter.
     */
    query: HTTPQL;
};
