/**
 * Utilities to interact with the Search page.
 * @category Search
 */
export type SearchSDK = {
    /**
     * Set the HTTPQL query that will be applied on the search table results.
     * @param query The HTTPQL query.
     */
    setQuery: (query: string) => void;
    /**
     * Get the current HTTPQL query.
     * @returns The current HTTPQL query.
     */
    getQuery: () => string;
};