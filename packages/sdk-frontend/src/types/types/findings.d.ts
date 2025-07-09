import { type ID } from "./utils";
/**
 * Represents a {@link https://docs.caido.io/reference/features/logging/findings|Finding}.
 * @category Findings
 */
export type Finding = {
    /**
     * The ID of the finding.
     */
    id: ID;
    /**
     * The title of the finding.
     */
    title: string;
    /**
     * The description of the finding.
     */
    description?: string;
    /**
     * The reporter of the finding.
     */
    reporter: string;
    /**
     * The host of the request attached to this finding
     */
    host: string;
    /**
     * The path of the request attached to this finding
     */
    path: string;
};
