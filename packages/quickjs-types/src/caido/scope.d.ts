declare module "caido:utils" {
  /**
   * A saved immutable Scope.
   * @category Scope
   */
  export type Scope = {
    /**
     * The unique Caido {@link ID} of the scope.
     */
    readonly id: ID;
    /**
     * The name of the scope.
     */
    readonly name: string;
    /**
     * The allowlist of the scope.
     */
    readonly allowlist: string[];
    /**
     * The denylist of the scope.
     */
    readonly denylist: string[];
  };

  /**
   * The SDK for the Scope service.
   * @category Scope
   */
  export type ScopeSDK = {
    /**
     * Get all the scopes.
     * @returns An array of {@link Scope}
     */
    getAll(): Promise<Scope[]>;
  };
}
