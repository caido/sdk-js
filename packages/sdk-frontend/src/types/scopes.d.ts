/**
 * Represents a scope.
 */
export type Scope = {
    /**
     * The unique ID of the scope.
     */
    id: string;
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
