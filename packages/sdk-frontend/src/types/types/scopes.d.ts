import { type ID } from "./utils";
/**
 * Represents a scope.
 * @category Scopes
 */
export type Scope = {
    /**
     * The unique ID of the scope.
     */
    id: ID;
    /**
     * The name of the scope.
     */
    name: string;
    /**
     * The list of included items.
     */
    allowlist: string[];
    /**
     * The list of excluded items.
     */
    denylist: string[];
};
