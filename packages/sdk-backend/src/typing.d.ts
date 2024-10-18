declare module "caido:plugin" {
  import { Database } from "sqlite";
  import {
    MaybePromise,
    FindingsSDK,
    RequestsSDK,
    Request,
    Response,
    ReplaySDK,
    ProjectsSDK,
  } from "caido:utils";

  /**
   * The SDK for the API RPC service.
   * @category API
   */
  export type APISDK<API = {}, Events = {}> = {
    /**
     * Sends an event to the frontend plugin.
     *
     * @example
     * ```ts
     * sdk.api.send("myEvent", 5, "hello");
     * ```
     */
    send(event: keyof Events, ...args: any[]): void;

    /**
     * Registers a new backend function for the RPC.
     *
     * @example
     * ```ts
     * sdk.api.register("multiply", (sdk: SDK, a: number, b: number) => {
     *    return a * b;
     * });
     * ```
     */
    register(
      name: keyof API,
      callback: (sdk: SDK, ...args: any[]) => MaybePromise<any>,
    ): void;
  };

  /**
   * The SDK for the API RPC service.
   * @category Events
   */
  export type EventsSDK<API = {}, Events = {}> = {
    /**
     * Registers an callback on new intercepted requests.
     *
     * This callback is called asynchronously and cannot modify requests.
     *
     * @example
     * ```ts
     * sdk.events.onInterceptRequest((sdk, request) => {
     *    // Do something with the request
     * });
     * ```
     */
    onInterceptRequest(
      callback: (sdk: SDK<API, Events>, request: Request) => MaybePromise<void>,
    ): void;

    /**
     * Registers an callback on new intercepted responses.
     *
     * This callback is called asynchronously and cannot modify responses.
     *
     * @example
     * ```ts
     * sdk.events.onInterceptResponse((sdk, request, response) => {
     *    // Do something with the request/response
     * });
     * ```
     */
    onInterceptResponse(
      callback: (
        sdk: SDK<API, Events>,
        request: Request,
        response: Response,
      ) => MaybePromise<void>,
    ): void;
  };

  /**
   * The SDK for metadata information about the plugin.
   * @category Meta
   */
  export type MetaSDK = {
    /**
     * The directory of the plugin in Caido Data.
     * You can store data related to your plugin in this directory.
     */
    path(): string;
    /**
     * Get a sqlite database for the plugin stored in Caido Data.
     * You can use this to store data related to your plugin.
     */
    db(): Promise<Database>;
  };

  /**
   * The SDK object available to all scripts.
   * @category SDK
   */
  export interface SDK<API = {}, Events = {}> {
    /**
     * The console.
     *
     * This is currently the same as the global `console`.
     */
    console: Console;
    /**
     * The SDK for the Findings service.
     */
    findings: FindingsSDK;
    /**
     * The SDK for the Requests service.
     */
    requests: RequestsSDK;
    /**
     * The SDK for the Replay service.
     */
    replay: ReplaySDK;
    /**
     * The SDK for the Projects service.
     */
    projects: ProjectsSDK;
    /**
     * The SDK for the API RPC service.
     */
    api: APISDK<API, Events>;
    /**
     * The SDK for the Events service.
     */
    events: EventsSDK<API, Events>;
    /**
     * The SDK for metadata information about the plugin.
     */
    meta: MetaSDK;
  }
}
