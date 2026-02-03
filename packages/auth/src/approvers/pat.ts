import type { AuthenticationRequest, DeviceInformation } from "../types.js";
import { DeviceApprovalError, DeviceInformationError } from "../errors.js";
import type { AuthApprover } from "./types.js";

const DEFAULT_API_URL = "https://api.caido.io";

/**
 * Options for the PATApprover.
 */
export interface PATApproverOptions {
  /** The Personal Access Token to use for approval */
  pat: string;
  /** If provided, only approve these scopes. Others will be filtered out. */
  allowedScopes?: string[];
  /** The API URL to use. Defaults to "https://api.caido.io" */
  apiUrl?: string;
}

/**
 * PAT-based approver that automatically approves device code requests.
 * Uses a Personal Access Token to call the Caido API directly.
 *
 * @example
 * ```typescript
 * // Approve all scopes
 * const approver = new PATApprover({ pat: "caido_xxxxx" });
 *
 * // Approve only specific scopes
 * const limitedApprover = new PATApprover({
 *   pat: "caido_xxxxx",
 *   allowedScopes: ["read:projects", "write:requests"],
 * });
 * ```
 */
export class PATApprover implements AuthApprover {
  private readonly pat: string;
  private readonly allowedScopes?: string[];
  private readonly apiUrl: string;

  /**
   * Create a new PATApprover.
   *
   * @param options - Configuration options for the approver
   */
  constructor(options: PATApproverOptions) {
    this.pat = options.pat;
    this.allowedScopes = options.allowedScopes;
    this.apiUrl = (options.apiUrl ?? DEFAULT_API_URL).replace(/\/$/, "");
  }

  /**
   * Approve the authentication request using the PAT.
   * First fetches device information to get available scopes,
   * then filters scopes if allowedScopes is set,
   * and finally approves the device.
   *
   * @param request - The authentication request
   * @throws {DeviceInformationError} If fetching device information fails
   * @throws {DeviceApprovalError} If approving the device fails
   */
  async approve(request: AuthenticationRequest): Promise<void> {
    // Step 1: Get device information to retrieve available scopes
    const deviceInfo = await this.getDeviceInformation(request.userCode);

    // Step 2: Filter scopes if allowedScopes is provided
    let scopesToApprove = deviceInfo.scopes.map((s) => s.name);
    if (this.allowedScopes) {
      scopesToApprove = scopesToApprove.filter((scope) =>
        this.allowedScopes!.includes(scope)
      );
    }

    // Step 3: Approve the device with the filtered scopes
    await this.approveDevice(request.userCode, scopesToApprove);
  }

  /**
   * Fetch device information from the API.
   *
   * @param userCode - The user code from the authentication request
   * @returns The device information including available scopes
   * @throws {DeviceInformationError} If the request fails
   */
  private async getDeviceInformation(
    userCode: string
  ): Promise<DeviceInformation> {
    const url = `${this.apiUrl}/oauth2/device/information?user_code=${encodeURIComponent(userCode)}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.pat}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      throw new DeviceInformationError(
        `Failed to get device information: ${errorText}`,
        response.status
      );
    }

    const data = (await response.json()) as DeviceInformation;
    return data;
  }

  /**
   * Approve the device with the specified scopes.
   *
   * @param userCode - The user code from the authentication request
   * @param scopes - The scopes to approve
   * @throws {DeviceApprovalError} If the request fails
   */
  private async approveDevice(
    userCode: string,
    scopes: string[]
  ): Promise<void> {
    const url = `${this.apiUrl}/oauth2/device/approve`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.pat}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user_code: userCode,
        scopes: scopes,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      throw new DeviceApprovalError(
        `Failed to approve device: ${errorText}`,
        response.status
      );
    }
  }
}
