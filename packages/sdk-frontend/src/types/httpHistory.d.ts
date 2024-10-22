import type { HTTPQL } from "./utils";
/**
 * Utilities to interact with the HTTP History page.
 * @category HTTP History
 */
export type HTTPHistorySDK = {
    /**
     * Set the HTTPQL query that will be applied on the HTTP History table results.
     * @param query The HTTPQL query.
     */
    setQuery: (query: HTTPQL) => void;
    /**
     * Get the current HTTPQL query.
     * @returns The current HTTPQL query.
     */
    getQuery: () => HTTPQL;
};
