declare module "caido:workflow" {
  import {
    Bytes,
    FindingsSDK,
    RequestsSDK,
    Request,
    Response,
    ReplaySDK,
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
   * The SDK object available to all scripts.
   * @category SDK
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
     * The SDK for the Requests service.
     */
    requests: RequestsSDK;
    /**
     * The SDK for the Replay service.
     */
    replay: ReplaySDK;
    /**
     * Converts bytes to a string.
     *
     * Unprintable characters will be replaced with `�`.
     */
    asString(array: Bytes): string;
  };
}
