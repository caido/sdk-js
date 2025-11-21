declare module "caido:utils" {
  /**
   * A specification for creating a hosted file.
   * @category HostedFile
   */
  export type HostedFileSpec = {
    name: string;
    content: Bytes;
  };

  /**
   * A hosted file.
   * @category HostedFile
   */
  export type HostedFile = {
    /**
     * The unique Caido {@link ID} of the project.
     */
    id: string;
    /**
     * The name of the project.
     */
    name: string;
    /**
     * The path of the file.
     */
    path: string;
  };

  /**
   * The SDK for the HostedFile service.
   * @category HostedFile
   */
  export type HostedFileSDK = {
    /**
     * Get all hosted files.
     *
     * @example
     * ```js
     * await sdk.hostedFile.getAll();
     * ```
     */
    getAll(): Promise<HostedFile[]>;
    /**
     * Create a hosted file.
     *
     * @example
     * ```js
     * await sdk.hostedFile.create({ name: "My File", content: "Hello, world!" });
     * ```
     */
    create(spec: HostedFileSpec): Promise<HostedFile>;
  };
}
