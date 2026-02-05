import type { AuthenticationRequest } from "../types.js";

/**
 * Interface for authentication approval strategies.
 * Implementations handle how the device code flow is approved.
 */
export interface AuthApprover {
  /**
   * Approve the authentication request.
   * This method is called after the authentication flow is started and should
   * trigger the approval process (e.g., showing a URL to the user or auto-approving via PAT).
   *
   * @param request - The authentication request containing the user code and verification URL
   */
  approve(request: AuthenticationRequest): Promise<void>;
}
