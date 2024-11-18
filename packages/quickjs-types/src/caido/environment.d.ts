declare module "caido:utils" {
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
  };
}
