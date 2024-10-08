declare module "caido:utils" {
  /**
   * The body of a {@link Request} or {@link Response}.
   *
   * Calling `to<FORMAT>` will try to convert the body to the desired format.
   * @category Requests
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
   * @category Requests
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
   * @category Requests
   */
  export type Request = {
    /**
     * The unique Caido {@link ID} of the request.
     */
    getId(): ID;
    /**
     * The target host of the request.
     */
    getHost(): string;
    /**
     * The target port of the request.
     */
    getPort(): number;
    /**
     * If the request uses TLS (HTTPS).
     */
    getTls(): boolean;
    /**
     * The HTTP method of the request.
     */
    getMethod(): string;
    /**
     * The path of the request.
     */
    getPath(): string;
    /**
     * The unparsed query of the request.
     *
     * Excludes the leading `?`.
     */
    getQuery(): string;
    /**
     * The full URL of the request.
     */
    getUrl(): string;
    /**
     * The headers of the request.
     *
     * Header names are case-insensitive.
     * Each header might have multiple values.
     *
     * @example
     * ```json
     * {
     *   "Host": ["caido.io"],
     *   "Connection": ["keep-alive"],
     *   "Content-Length": ["95"]
     * }
     * ```
     */
    getHeaders(): Record<string, Array<string>>;
    /**
     * Get a header value.
     *
     * Header name is case-insensitive.
     * The header might have multiple values.
     */
    getHeader(name: string): Array<string> | undefined;
    /**
     * The body of the request.
     */
    getBody(): Body | undefined;
    /**
     * The raw version of the request.
     *
     * Used to access the bytes directly.
     */
    getRaw(): RequestRaw;
    /**
     * The datetime the request was recorded by the proxy.
     */
    getCreatedAt(): Date;
    /**
     * Copied the request to a mutable un-saved {@link RequestSpec}.
     * This enables you to make modify a request before re-sending it.
     */
    toSpec(): RequestSpec;
    /**
     * Copied the request to a mutable un-saved {@link RequestSpecRaw}.
     * The raw requests are not parsed and can be used to send invalid HTTP Requests.
     */
    toSpecRaw(): RequestSpecRaw;
  };

  /**
   * Options when setting the body of a Request.
   * @category Requests
   */
  export type SetBodyOptions = {
    /**
     * Should update the Content-export type header.
     *
     * @default true
     */
    updateContentLength: boolean;
  };

  /**
   * A mutable Request that has not yet been sent.
   * @category Requests
   */
  export class RequestSpec {
    /**
     * Build a new {@link RequestSpec} from a URL string. Only the host, port and scheme will be parsed.
     *
     * You can convert a saved immutable {@link Request} object into a {@link RequestSpec} object by using the `toSpec()` method.
     *
     * By default:
     * - Method is `GET`.
     * - Path is `/`.
     *
     * @throws {Error} If the URL is invalid.
     *
     * @example
     * ```js
     * const spec = new RequestSpec("https://example.com");
     * ```
     */
    constructor(url: string);
    /**
     * Parses raw bytes into a {@link RequestSpec}.
     *
     * @throws {Error} If the bytes are not a valid HTTP request.
     * @example
     * ```js
     * const rawInput = 'GET / HTTP/1.1\r\nHost: example.com\r\n\r\n';
     * const spec = RequestSpec.parse(rawInput);
     * spec.setHeader('x-caido', 'test');
     * const specRaw = spec.getRaw();
     * const rawOutput = specRaw.getRaw(); // Will contain the new header
     * ```
     */
    static parse(bytes: Bytes): RequestSpec;
    /**
     * Get the host of the request.
     */
    getHost(): string;
    /**
     * Set the host of the request.
     *
     * It will also update the `Host` header.
     */
    setHost(host: string): void;
    /**
     * Get the port of the request.
     */
    getPort(): number;
    /**
     * Set the port of the request.
     *
     * The port number must be between 1 and 65535.
     */
    setPort(port: number): void;
    /**
     * Get if the request uses TLS (HTTPS).
     */
    getTls(): boolean;
    /**
     * Set if the request uses TLS (HTTPS).
     */
    setTls(tls: boolean): void;
    /**
     * Get the HTTP method of the request.
     */
    getMethod(): string;
    /**
     * Set the HTTP method of the request.
     *
     * All strings are accepted.
     */
    setMethod(method: string): void;
    /**
     * Get the path of the request.
     */
    getPath(): string;
    /**
     * Set the path of the request.
     */
    setPath(path: string): void;
    /**
     * Get the unparsed query of the request.
     *
     * Excludes the leading `?`.
     */
    getQuery(): string;
    /**
     * Set the unparsed query of the request.
     *
     * The query string should not include the leading `?`.
     *
     * @example
     * ```js
     * spec.setQuery("q=hello");
     * ```
     */
    setQuery(query: string): void;
    /**
     * The headers of the request.
     *
     * Header names are case-insensitive.
     * Each header might have multiple values.
     *
     * @example
     * ```json
     * {
     *   "Host": ["caido.io"],
     *   "Connection": ["keep-alive"],
     *   "Content-Length": ["95"]
     * }
     * ```
     */
    getHeaders(): Record<string, Array<string>>;
    /**
     * Get a header value.
     *
     * Header name is case-insensitive.
     * The header might have multiple values.
     */
    getHeader(name: string): Array<string> | undefined;
    /**
     * Set a header value.
     *
     * This will overwrite any existing values.
     */
    setHeader(name: string, value: string): void;
    /**
     * Removes a header.
     */
    removeHeader(name: string): void;
    /**
     * The body of the request.
     */
    getBody(): Body | undefined;
    /**
     * Set the body of the request.
     *
     * The body can either be a {@link Body} or any type that can be converted to {@link Bytes}.
     *
     * @example
     * ```js
     * const body = new Body("Hello world.");
     * const options = { updateContentLength: true };
     * request.setBody(body, options);
     * ```
     */
    setBody(body: Body | Bytes, options?: SetBodyOptions): void;
    /**
     * This method sets the raw {@link Bytes} of the request and converts it to a {@link RequestSpecRaw}.
     *
     * This is useful when you have a prepared {@link RequestSpec} and you just want to modify the raw data.
     *
     * @example
     * ```js
     * const rawBytes = []; // RAW BYTES HERE
     * const request = new RequestSpec("https://example.com");
     * const rawRequest = request.setRaw(rawBytes);
     * ```
     */
    setRaw(raw: Bytes): RequestSpecRaw;
    /**
     * This methods converts the {@link RequestSpec} to a {@link RequestSpecRaw}.
     *
     * This is useful to retrieve the raw bytes of the request.
     *
     * @example
     * ```js
     * const spec = new RequestSpec("https://example.com");
     * const specRaw = spec.getRaw();
     * const bytes = specRaw.getRaw(); // GET / HTTP/1.1\r\nHost: example.com\r\n\r\n
     * ```
     */
    getRaw(): RequestSpecRaw;
  }

  /**
   * A mutable raw Request that has not yet been sent.
   * @category Requests
   */
  export class RequestSpecRaw {
    /**
     * Build a new {@link RequestSpecRaw} from a URL string. Only the host, port and scheme will be parsed.
     *
     * You can convert a saved immutable {@link Request} object into a {@link RequestSpecRaw} object by using the `toSpecRaw()` method.
     *
     * You MUST use `setRaw` to set the raw bytes of the request.
     *
     * @example
     * ```js
     * const spec = new RequestSpecRaw("https://example.com");
     * ```
     */
    constructor(url: string);
    /**
     * Get the host of the request.
     */
    getHost(): string;
    /**
     * Set the host of the request.
     *
     * It will NOT update the `Host` header.
     */
    setHost(host: string): void;
    /**
     * Get the port of the request.
     */
    getPort(): number;
    /**
     * Set the port of the request.
     *
     * The port number must be between 1 and 65535.
     */
    setPort(port: number): void;
    /**
     * Get if the request uses TLS (HTTPS).
     */
    getTls(): boolean;
    /**
     * Set if the request uses TLS (HTTPS).
     */
    setTls(tls: boolean): void;
    /**
     * Get the raw bytes of the request.
     */
    getRaw(): Uint8Array;
    /**
     * Set the raw {@link Bytes} of the request.
     */
    setRaw(raw: Bytes): void;
  }

  /**
   * An immutable saved raw Response.
   * @category Requests
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
   * @category Requests
   */
  export type Response = {
    /**
     * The unique Caido {@link ID} of the response.
     */
    getId(): ID;
    /**
     * The status code of the response.
     */
    getCode(): number;
    /**
     * The headers of the response.
     *
     * Header names are case-insensitive.
     * Each header might have multiple values.
     *
     * @example
     * ```json
     * {
     *   "Date": ["Sun, 26 May 2024 10:59:21 GMT"],
     *   "Content-Type": ["text/html"]
     * }
     * ```
     */
    getHeaders(): Record<string, Array<string>>;
    /**
     * Get a header value.
     *
     * Header name is case-insensitive.
     * The header might have multiple values.
     */
    getHeader(name: string): Array<string> | undefined;
    /**
     * The body of the response
     */
    getBody(): Body | undefined;
    /**
     * The raw version of the response.
     *
     * Used to access the bytes directly.
     */
    getRaw(): ResponseRaw;
    /**
     * The time it took to send the request and receive the response in milliseconds.
     */
    getRoundtripTime(): number;
    /**
     * The datetime the response was recorded by the proxy.
     */
    getCreatedAt(): Date;
  };

  /**
   * An immutable saved Request and Response pair.
   * @category Requests
   */
  export type RequestResponse = {
    request: Request;
    response: Response;
  };

  /**
   * An immutable saved Request and optional Response pair.
   * @category Requests
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
    startCursor: Cursor;
    endCursor: Cursor;
  };

  /**
   * Field to order requests by.
   * @category Requests
   */
  export type RequestOrderField =
    | "ext"
    | "host"
    | "id"
    | "method"
    | "path"
    | "query"
    | "created_at"
    | "source";
  /**
   * Field to order responses by.
   * @category Requests
   */
  export type ResponseOrderField = "length" | "roundtrip" | "code";

  /**
   * An item in a connection of requests.
   * @category Requests
   */
  export type RequestsConnectionItem = {
    cursor: Cursor;
    request: Request;
    response?: Response;
  };

  /**
   * A connection of requests.
   * @category Requests
   */
  export type RequestsConnection = {
    pageInfo: PageInfo;
    items: Array<RequestsConnectionItem>;
  };

  /**
   * The source of a request.
   * @category Shared
   */
  export type RequestSource = ID | Request | RequestSpec | RequestSpecRaw;

  /**
   * Query builder to fetch requests.
   * @category Requests
   */
  export type RequestsQuery = {
    /**
     * Requests after a given cursor.
     * @param cursor {@link Cursor} of the request
     */
    after(cursor: Cursor): RequestsQuery;

    /**
     * Requests before a given cursor.
     * @param cursor {@link Cursor} of the request
     */
    before(cursor: Cursor): RequestsQuery;

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
   * @category Requests
   */
  export type RequestsSDK = {
    /**
     * Query requests of the current project.
     *
     * @example
     * ```js
     * const page = await sqk.requests.query().first(2).execute();
     * sdk.console.log(`ID: ${page.items[1].request.getId()}`);
     * ```
     */
    query(): RequestsQuery;
    /**
     * Get a request by its unique {@link ID}.
     *
     * @example
     * ```js
     * await sdk.requests.get("1");
     * ```
     */
    get(id: ID): Promise<RequestResponseOpt | undefined>;
    /**
     * Sends an HTTP request, either a {@link RequestSpec} or {@link RequestSpecRaw}.
     *
     * This respects the upstream proxy settings.
     *
     * @throws {Error} If the request cannot be sent.
     *
     * @example
     * ```js
     * const spec = new RequestSpec("https://example.com");
     * try {
     *   const res = await sdk.requests.send(request)
     *   sdk.console.log(res.request.getId());
     *   sdk.console.log(res.response.getCode());
     * } catch (err) {
     *   sdk.console.error(err);
     * }
     * ```
     */
    send(request: RequestSpec | RequestSpecRaw): Promise<RequestResponse>;
    /**
     * Checks if a request is in scope.
     *
     * @example
     * ```js
     * if (sdk.requests.inScope(request)) {
     *  sdk.console.log("In scope");
     * }
     * ```
     */
    inScope(request: Request | RequestSpec): boolean;
  };

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

  /**
   * A replay session.
   * @category Replay
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
   * @category Replay
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
   * @category Replay
   */
  export type ReplaySDK = {
    createSession(
      source?: RequestSource,
      collection?: ID | ReplayCollection,
    ): Promise<ReplaySession>;
    getCollections(): Promise<Array<ReplayCollection>>;
  };

  /**
   * A unique identifier.
   * @category Shared
   */
  export type ID = string & { __id?: never };
  /**
   * A cursor for pagination.
   * @category Shared
   */
  export type Cursor = string & { __cursor?: never };
  /**
   * Types that can be converted to bytes in inputs.
   * @category Shared
   */
  export type Bytes = string | Array<number> | Uint8Array;
  /**
   * Promise or value.
   * @category Shared
   */
  export type MaybePromise<T> = T | Promise<T>;
}
