declare module "caido:workflow" {
  import {
    Bytes,
    FindingsSDK,
    RequestsSDK,
    Request,
    Response,
    ReplaySDK,
    ProjectsSDK,
    EnvironmentSDK,
    RuntimeSDK,
    ScopeSDK,
    GraphQLSDK,
    HostedFileSDK,
  } from "caido:utils";

  /**
   * The input for the HTTP Javascript Nodes
   * @category Data
   */
  export type HttpInput = {
    request: Request | undefined;
    response: Response | undefined;
  };
  /**
   * @deprecated Use HttpInput instead.
   * @category Data
   */
  export type PassiveInput = HttpInput;
  /**
   * The input for the Javascript Nodes.
   * @category Data
   */
  export type BytesInput = Array<number>;
  /**
   * @deprecated Use BytesInput instead.
   * @category Data
   */
  export type ConvertInput = BytesInput;

  /**
   * The output for the Javascript Nodes.
   * @category Data
   */
  export type Data = Bytes;
  /**
   * The output for the If/Else Javascript Nodes.
   * @category Data
   */
  export type Decision = boolean;

  /**
   * The input for the JavaScript V2+ Nodes.
   * @category Data
   */
  export type NodeInput = {
    data?: Bytes;
    extra?: Record<string, any>;
  };

  /**
   * The result for the JavaScript V2+ Nodes.
   * @category Data
   */
  export type NodeResult = {
    data?: Bytes;
    extra?: Record<string, any>;
  };

  /**
   * The SDK object available to all scripts.
   * @category SDK
   */
  export type SDK = {
    /**
     * The console for logging.
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
     * The SDK for the Scope service.
     */
    scope: ScopeSDK;
    /**
     * The SDK for the Environment service.
     */
    env: EnvironmentSDK;
    /**
     * The SDK for the runtime information.
     */
    runtime: RuntimeSDK;
    /**
     * The SDK for the GraphQL service.
     */
    graphql: GraphQLSDK;
    /**
     * The SDK for the HostedFile service.
     */
    hostedFile: HostedFileSDK;
    /**
     * Converts bytes to a string.
     *
     * Unprintable characters will be replaced with `�`.
     *
     * @example
     * ```js
     * export function run(input, sdk) {
     *   let parsed = sdk.asString(input);
     *   sdk.console.log(parsed);
     *   return parsed;
     * }
     * ```
     */
    asString(array: Bytes): string;
  };
}
