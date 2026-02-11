declare module "caido:utils" {
  /**
   * A saved immutable Environment.
   * @category Environment
   */
  export type Environment = {
    /**
     * The ID of the environment.
     */
    readonly id: ID;
    /**
     * The name of the environment.
     */
    readonly name: string;
    /**
     * The version of the environment.
     */
    readonly version: number;
    /**
     * The variables of the environment.
     */
    readonly variables: Array<EnvironmentVariable>;
  };

  /**
   * A saved immutable Finding.
   * @category Environment
   */
  export type EnvironmentVariable = {
    /**
     * The name of the environment variable
     */
    readonly name: string;
    /**
     * The value of the environment variable
     */
    readonly value: string;
    /**
     * If the environment variable is a secret
     */
    readonly isSecret: boolean;
  };

  /**
   * Input for the `setVar` of {@link EnvironmentSDK}.
   * @category Environment
   */
  export type SetVarInput = {
    /**
     * Name of the environment variable
     */
    name: string;
    /**
     * Value of the environment variable
     */
    value: string;
    /**
     * If the environment variable should be treated as secret.
     * @default false
     */
    secret: boolean;
    /**
     * If the environment variable should be set on the global
     * environment or the currently selected environment.
     * By default, it will be set globally.
     * @default true
     */
    global: boolean;
    /**
     * The `name` of the Environment to set the variable on.
     * This will take precedence over the `global` flag if provided.
     */
    env?: string;
  };

  export type EnvironmentVariableInput = {
    /**
     * The name of the environment variable.
     */
    name: string;
    /**
     * The value of the environment variable.
     */
    value: string;
    /**
     * If the environment variable should be treated as secret.
     */
    secret: boolean;
  };

  export type CreateEnvironmentInput = {
    /**
     * The name of the environment.
     */
    name: string;
    /**
     * The variables of the environment.
     */
    variables: Array<EnvironmentVariable>;
  };

  export type UpdateEnvironmentInput = {
    /**
     * The version of the environment to update.
     * If not equal to the current version, the update will fail.
     */
    version: number;
    /**
     * The name of the environment.
     */
    name?: string;
    /**
     * The variables of the environment.
     */
    variables?: Array<EnvironmentVariableInput>;
  };

  /**
   * The SDK for the Environment service.
   * @category Environment
   */
  export type EnvironmentSDK = {
    /**
     * Get the value of an environment variable.
     * @param name The name of the environment variable.
     * @returns The value of the environment variable.
     */
    getVar(name: string): string | undefined;
    /**
     * Get all the environment variables.
     * It includes the global environment and the selected environment.
     * Those variables can change over time so avoid caching them.
     * @returns An array of {@link EnvironmentVariable}
     */
    getVars(): Array<EnvironmentVariable>;
    /**
     * Sets an environment variable to a given value.
     * This will override any existing value.
     * The environment variable can be set either on the currently
     * selected environment or the global environment.
     *
     * @throws {Error} If trying to set when a project is not selected.
     * @throws {Error} If trying to set when an environment is not selected (with `global: false`).
     *
     * @example
     * ```js
     * await sdk.env.setVar({
     *   name: "USER_SECRET",
     *   value: "my secret value",
     *   secret: true,
     *   global: false
     * });
     * ```
     */
    setVar(input: SetVarInput): Promise<void>;
    /**
     * Get all the environments.
     * @returns An array of {@link Environment}
     */
    getEnvironments(): Promise<Array<Environment>>;
    /**
     * Get an environment by its ID.
     * @param id The ID of the environment.
     * @returns The environment or undefined if not found.
     */
    getEnvironment(id: ID): Promise<Environment | undefined>;
    /**
     * Create a new environment.
     * @param input The input for the creation.
     * @returns The created environment.
     */
    createEnvironment(input: CreateEnvironmentInput): Promise<Environment>;
    /**
     * Update an environment.
     * @param id The ID of the environment.
     * @param input The input for the update.
     * @returns The updated environment.
     *
     * @throws {Error} If the version passed in is not equal to the current version of the environment.
     *
     * @example
     * ```js
     * const environment = await sdk.env.getEnvironment(id);
     * await sdk.env.updateEnvironment(id, {
     *   version: environment.version,
     *   name: "new name",
     *   variables: [{ name: "USER_SECRET", value: "new secret value", secret: true }],
     * });
     * ```
     */
    updateEnvironment(
      id: ID,
      input: UpdateEnvironmentInput,
    ): Promise<Environment>;
    /**
     * Delete an environment by its ID.
     * @param id The ID of the environment.
     */
    deleteEnvironment(id: ID): Promise<void>;
  };
}
