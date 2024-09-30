declare module "caido:utils" {
  /**
   * The body of a Request or Response.
   *
   * Calling `to<FORMAT>` will try to convert the body to the desired format.
   */
  export class Body {
    constructor(data: string | Array<number> | Uint8Array);
    /**
     * Parse the body as a string.
     *
     * Unprintable characters will be replaced with `�`.
     */
    toText(): string;
    /**
     * Try to parse the body as JSON.
     *
     * @throws {SyntaxError} If the body is not valid JSON.
     */
    toJson(): any;
    /**
     * Get the raw body as an array of bytes.
     */
    toRaw(): Uint8Array;
  }

  /**
   * An immutable saved raw Request.
   */
  export type RequestRaw = {
    /**
     * Parse the raw request as a string.
     *
     * Unprintable characters will be replaced with `�`.
     */
    toText(): string;
    /**
     * Get the raw request as an array of bytes.
     */
    toBytes(): Uint8Array;
  };

  /**
   * An immutable saved Request.
   *
   * To modify, use `toSpec` to get a `RequestSpec` object.
   */
  export type Request = {
    getId(): ID;
    getHost(): string;
    getPort(): number;
    getTls(): boolean;
    getMethod(): string;
    getPath(): string;
    getQuery(): string;
    getUrl(): string;
    getHeaders(): Record<string, Array<string>>;
    getHeader(name: string): Array<string> | undefined;
    getBody(): Body | undefined;
    getRaw(): RequestRaw;
    getCreatedAt(): Date;
    toSpec(): RequestSpec;
    toSpecRaw(): RequestSpecRaw;
  };

  export type SetBodyOptions = {
    /**
     * Should update the Content-export type header.
     *
     * @default true
     */
    updateContentLength: boolean;
  };

  /**
   * A mutable Request not yet sent.
   */
  export class RequestSpec {
    constructor(url: string);
    getHost(): string;
    setHost(host: string): void;
    getPort(): number;
    setPort(port: number): void;
    getTls(): boolean;
    setTls(tls: boolean): void;
    getMethod(): string;
    setMethod(method: string): void;
    getPath(): string;
    setPath(path: string): void;
    getQuery(): string;
    setQuery(query: string): void;
    getHeaders(): Record<string, Array<string>>;
    getHeader(name: string): Array<string> | undefined;
    setHeader(name: string, value: string): void;
    removeHeader(name: string): void;
    getBody(): Body | undefined;
    setBody(body: Body | Bytes, options?: SetBodyOptions): void;
    setRaw(raw: Bytes): RequestSpecRaw;
  }

  /**
   * A mutable raw Request not yet sent.
   */
  export class RequestSpecRaw {
    constructor(url: string);
    getHost(): string;
    setHost(host: string): void;
    getPort(): number;
    setPort(port: number): void;
    getTls(): boolean;
    setTls(tls: boolean): void;
    getRaw(): Uint8Array;
    setRaw(raw: Bytes): void;
  }

  /**
   * An immutable saved raw Response.
   */
  export type ResponseRaw = {
    /**
     * Parse the raw response as a string.
     *
     * Unprintable characters will be replaced with `�`.
     */
    toText(): string;
    /**
     * Get the raw response as an array of bytes.
     */
    toBytes(): Uint8Array;
  };

  /**
   * An immutable saved Response.
   */
  export type Response = {
    getId(): ID;
    getCode(): number;
    getHeaders(): Record<string, Array<string>>;
    getHeader(name: string): Array<string> | undefined;
    getBody(): Body | undefined;
    getRaw(): ResponseRaw;
    getRoundtripTime(): number;
    getCreatedAt(): Date;
  };

  /**
   * An immutable saved Request and Response pair.
   */
  export type RequestResponse = {
    request: Request;
    response: Response;
  };

  /**
   * An immutable saved Request and optional Response pair.
   */
  export type RequestResponseOpt = {
    request: Request;
    response?: Response | undefined;
  };

  /**
   * Information on the current page of paginated data.
   */
  export type PageInfo = {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
    endCursor: string;
  };

  export type RequestOrderField =
    | "ext"
    | "host"
    | "id"
    | "method"
    | "path"
    | "query"
    | "created_at"
    | "source";
  export type ResponseOrderField = "length" | "roundtrip" | "code";

  export type RequestsConnectionItem = {
    cursor: string;
    request: Request;
    response?: Response;
  };

  export type RequestsConnection = {
    pageInfo: PageInfo;
    items: Array<RequestsConnectionItem>;
  };

  /*
   * The source of a request.
   */
  export type RequestSource = ID | Request | RequestSpec | RequestSpecRaw;

  /**
   * Query builder to fetch requests.
   */
  export type RequestsQuery = {
    /**
     * Requests after a given cursor.
     * @param cursor Cursor of the request
     */
    after(cursor: string): RequestsQuery;

    /**
     * Requests before a given cursor.
     * @param cursor Cursor of the request
     */
    before(cursor: string): RequestsQuery;

    /**
     * First n requests.
     * @param n Number of requests to return
     */
    first(n: number): RequestsQuery;

    /**
     * Last n requests.
     * @param n Number of requests to return
     */
    last(n: number): RequestsQuery;

    /**
     * Filter requests.
     * @param filter HTTPQL filter
     */
    filter(filter: string): RequestsQuery;

    /**
     * Ascending ordering.
     * @param target Target of the ordering: req or resp.
     * @param field Field to order by.
     */
    ascending(target: "req", field: RequestOrderField): RequestsQuery;
    ascending(target: "resp", field: ResponseOrderField): RequestsQuery;

    /**
     * Descending ordering.
     * @param target Target of the ordering: req or resp.
     * @param field Field to order by.
     */
    descending(target: "req", field: RequestOrderField): RequestsQuery;
    descending(target: "resp", field: ResponseOrderField): RequestsQuery;

    /**
     * Execute the query.
     *
     * @throws {Error} If a query parameter is invalid or the query cannot be executed.
     */
    execute(): Promise<RequestsConnection>;
  };

  /**
   * The SDK for the Requests service.
   */
  export type RequestsSDK = {
    /**
     * Query requests of the current project.
     *
     * @example
     * const page = await sqk.requests.query().first(2).execute();
     * sdk.console.log(`ID: ${page.items[1].request.getId()}`);
     */
    query(): RequestsQuery;
    /**
     * Get a request by its unique {@link ID}.
     *
     * @example
     * await sdk.requests.get("1");
     */
    get(id: ID): Promise<RequestResponseOpt | undefined>;
    /**
     * Sends a request.
     *
     * This respects the upstream proxy settings.
     *
     * @throws {Error} If the request cannot be sent.
     *
     * @example
     * const spec = new RequestSpec("https://example.com");
     * try {
     *   const res = await sdk.requests.send(request)
     *   sdk.console.log(res.request.getId());
     *   sdk.console.log(res.response.getCode());
     * } catch (err) {
     *   sdk.console.error(err);
     * }
     */
    send(request: RequestSpec | RequestSpecRaw): Promise<RequestResponse>;

    /**
     * Checks if a request is in scope.
     *
     * @example
     * if (sdk.requests.inScope(request)) {
     *  sdk.console.log("In scope");
     * }
     */
    inScope(request: Request | RequestSpec): boolean;
  };

  /**
   * A saved immutable Finding.
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
   */
  export type FindingsSDK = {
    /**
     * Try to get a {@link Finding} for a request.
     * Since a request can have multiple findings, this will return the first one found.
     * You can also filter by reporter to get a specific finding.
     *
     * @example
     * await sdk.findings.get({
     *  reporter: "Reporter",
     *  request,
     * });
     */
    get(input: GetFindingInput): Promise<Finding | undefined>;
    /**
     * Creates a new Finding.
     *
     * @throws {Error} If the request cannot be saved.
     *
     * @example
     * await sdk.findings.create({
     *   title: "Title",
     *   description: "Description",
     *   reporter: "Reporter",
     *   dedupe: `${request.getHost()}-${request.getPath()}`,
     *   request,
     * });
     */
    create(spec: FindingSpec): Promise<Finding>;
  };

  /**
   * A replay session.
   */
  export type ReplaySession = {
    /**
     * The unique Caido {@link ID} of the replay session.
     */
    getId(): ID;
    /**
     * The name of the replay session.
     */
    getName(): string;
  };

  /**
   * A collection of replay sessions.
   */
  export type ReplayCollection = {
    /**
     * The unique Caido {@link ID} of the replay collection.
     */
    getId(): ID;
    /**
     * The name of the replay collection.
     */
    getName(): string;
  };

  /**
   * The SDK for the Replay service.
   */
  export type ReplaySDK = {
    createSession(
      source?: RequestSource,
      collection?: ID | ReplayCollection,
    ): Promise<ReplaySession>;
    getCollections(): Promise<Array<ReplayCollection>>;
  };

  export type ID = string & { __id?: never };
  export type Bytes = string | Array<number> | Uint8Array;
  export type MaybePromise<T> = T | Promise<T>;
}
