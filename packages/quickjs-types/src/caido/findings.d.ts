declare module "caido:utils" {
  /**
   * A saved immutable Finding.
   * @category Findings
   */
  export type Finding = {
    /**
     * The unique Caido {@link ID} of the finding.
     */
    getId(): ID;
    /**
     * The title of the finding.
     */
    getTitle(): string;
    /**
     * The description of the finding.
     */
    getDescription(): string | undefined;
    /**
     * The name of the reporter.
     */
    getReporter(): string;
  };

  /**
   * A mutable Finding not yet created.
   * @category Findings
   */
  export type FindingSpec = {
    /**
     * The title of the finding.
     */
    title: string;
    /**
     * The description of the finding.
     */
    description?: string | undefined;
    /**
     * The name of the reporter.
     * It will be used to group findings.
     */
    reporter: string;
    /**
     * Deduplication key for findings.
     * If a finding with the same dedupe key already exists, it will not be created.
     */
    dedupeKey?: string | undefined;
    /**
     * The associated {@link Request}.
     */
    request: Request;
  };

  /**
   * Input to get a {@link Finding}.
   * @category Findings
   */
  export type GetFindingInput = {
    /**
     * The name of the reporter.
     */
    reporter?: string | undefined;
    /**
     * The associated {@link Request}.
     */
    request: Request;
  };

  /**
   * The SDK for the Findings service.
   * @category Findings
   */
  export type FindingsSDK = {
    /**
     * Try to get a {@link Finding} for a request.
     * Since a request can have multiple findings, this will return the first one found.
     * You can also filter by reporter to get a specific finding.
     *
     * @example
     * ```js
     * await sdk.findings.get({
     *  reporter: "Reporter",
     *  request,
     * });
     * ```
     */
    get(input: GetFindingInput): Promise<Finding | undefined>;
    /**
     * Creates a new Finding.
     *
     * @throws {Error} If the request cannot be saved.
     *
     * @example
     * ```js
     * await sdk.findings.create({
     *   title: "Title",
     *   description: "Description",
     *   reporter: "Reporter",
     *   dedupe: `${request.getHost()}-${request.getPath()}`,
     *   request,
     * });
     * ```
     */
    create(spec: FindingSpec): Promise<Finding>;
  };
}
