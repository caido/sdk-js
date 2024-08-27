declare module "caido:workflow" {
  import {
    Bytes,
    FindingsSDK,
    RequestsSDK,
    Request,
    Response,
  } from "caido:utils";

  export type HttpInput = {
    request: Request | undefined;
    response: Response | undefined;
  };
  /**
   * @deprecated Use HttpInput instead.
   */
  export type PassiveInput = HttpInput;
  export type BytesInput = Array<number>;
  /**
   * @deprecated Use BytesInput instead.
   */
  export type ConvertInput = BytesInput;

  export type Data = Bytes;
  export type Decision = boolean;

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
     * Converts bytes to a string.
     *
     * Unprintable characters will be replaced with `�`.
     */
    asString(array: Bytes): string;
  };
}
