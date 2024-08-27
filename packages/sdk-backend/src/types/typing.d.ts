declare module "caido:plugin" {
  import {
    MaybePromise,
    FindingsSDK,
    RequestsSDK,
    Request,
    Response,
  } from "caido:utils";

  export type DefineAPI<
    API extends Record<string, (...args: any[]) => MaybePromise<any>>,
  > = {
    [K in keyof API]: DefineCallback<API[K]>;
  };

  export type DefineCallback<F> = F extends (
    sdk: SDK,
    ...args: infer A
  ) => infer R
    ? (...args: A) => R
    : "Your callback must respect the format (sdk: SDK, ...args: unknown[]) => MaybePromise<unknown>";

  /**
   * The SDK for the API RPC service.
   */
  export type APISDK = {
    /**
     * Registers a new backend function for the RPC.
     *
     * @example
     * sdk.api.register("multiply", (sdk: SDK, a: number, b: number) => {
     *    return a * b;
     * });
     */
    register(
      name: string,
      callback: (sdk: SDK, ...args: any[]) => MaybePromise<any>,
    ): void;
  };

  /**
   * The SDK for the API RPC service.
   */
  export type EventsSDK = {
    /**
     * Registers an callback on new intercepted requests.
     *
     * This callback is called asynchronously and cannot modify requests.
     *
     * @example
     * sdk.events.onInterceptRequest((sdk: SDK, request: Request) => {
     *    // Do something with the request
     * });
     */
    onInterceptRequest(
      callback: (sdk: SDK, request: Request) => MaybePromise<void>,
    ): void;

    /**
     * Registers an callback on new intercepted responses.
     *
     * This callback is called asynchronously and cannot modify responses.
     *
     * @example
     * sdk.events.onInterceptResponse((sdk: SDK, request: Request, response: Response) => {
     *    // Do something with the request/response
     * });
     */
    onInterceptResponse(
      callback: (
        sdk: SDK,
        request: Request,
        response: Response,
      ) => MaybePromise<void>,
    ): void;
  };

  /**
   * The SDK object available to all scripts.
   */
  export type SDK = {
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
     * The SDK for the Requests services
     */
    requests: RequestsSDK;
    /**
     * The SDK for the API RPC service.
     */
    api: APISDK;
    /**
     * The SDK for the Events service.
     */
    events: EventsSDK;
  };
}
