import { type ID, type Selection } from "./utils";
/**
 * Represents an environment variable.
 * @category Environment
 */
export type EnvironmentVariable = {
    /**
     * The name of the environment variable.
     */
    name: string;
    /**
     * The value of the environment variable.
     */
    value: string;
    /**
     * Whether the environment variable is a secret.
     */
    isSecret: boolean;
};
/**
 * Environment page context.
 * @category Environment
 */
export type EnvironmentPageContext = {
    kind: "Environment";
    selection: Selection<ID>;
};
