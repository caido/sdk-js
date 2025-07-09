import { type Finding } from "../types/findings";
import type { ID } from "../types/utils";
/**
 * Utilities to interact with findings
 * @category Findings
 */
export type FindingsSDK = {
    /**
     * Create a {@link Finding}.
     * @param requestId The id of the request the finding is associated with.
     * @param options Options for the finding.
     * @param options.title The title of the finding.
     * @param options.description The description of the finding.
     * @param options.reporter The reporter of the finding.
     * @param options.dedupeKey If a finding with the same deduplication key already exists, it will not create a new finding.
     * @returns The created finding.
     */
    createFinding: (requestId: ID, options: {
        title: string;
        description?: string;
        reporter: string;
        dedupeKey?: string;
    }) => Promise<Finding | undefined>;
};
