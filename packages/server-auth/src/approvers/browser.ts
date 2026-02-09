import type { AuthenticationRequest } from "../types.js";

import type { AuthApprover } from "./types.js";

/**
 * Callback function that receives the authentication request details.
 * Used to display the verification URL and user code to the user.
 */
export type OnRequestCallback = (
  request: AuthenticationRequest,
) => Promise<void> | void;

/**
 * Browser-based approver that delegates to a callback function.
 * The callback should display the verification URL and user code to the user,
 * who then manually approves the request in their browser.
 *
 * @example
 * ```typescript
 * const approver = new BrowserApprover((request) => {
 *   console.log(`Visit ${request.verificationUrl}`);
 * });
 * ```
 */
export class BrowserApprover implements AuthApprover {
  private readonly onRequest: OnRequestCallback;

  /**
   * Create a new BrowserApprover.
   *
   * @param onRequest - Callback function that will be called with the authentication request
   */
  constructor(onRequest: OnRequestCallback) {
    this.onRequest = onRequest;
  }

  /**
   * Approve the authentication request by calling the callback.
   * The actual approval happens when the user visits the URL and enters the code.
   *
   * @param request - The authentication request
   */
  async approve(request: AuthenticationRequest): Promise<void> {
    await this.onRequest(request);
  }
}
