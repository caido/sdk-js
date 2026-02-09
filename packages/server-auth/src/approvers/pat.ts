import { CloudError } from "../errors.js";
import type { AuthenticationRequest, DeviceInformation } from "../types.js";

import type { AuthApprover } from "./types.js";

const DEFAULT_API_URL = "https://api.caido.io";

interface OAuth2ErrorResponse {
  error?: string;
  error_description?: string;
}

type OAuth2ErrorData = OAuth2ErrorResponse | string;

interface ParsedOAuth2Error {
  errorText: string;
  errorCode: string | undefined;
  errorDescription: string | undefined;
}

interface RequestOptions {
  method: string;
  headers: Record<string, string>;
}

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
  /** Request timeout in milliseconds */
  timeout?: number;
  /** Custom fetch implementation */
  fetch?: typeof globalThis.fetch;
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
  private readonly allowedScopes: string[] | undefined;
  private readonly apiUrl: string;
  private readonly fetchFn: typeof globalThis.fetch;
  private readonly timeout: number | undefined;

  constructor(options: PATApproverOptions) {
    this.pat = options.pat;
    this.allowedScopes = options.allowedScopes;
    this.apiUrl = (options.apiUrl ?? DEFAULT_API_URL).replace(/\/$/, "");
    this.fetchFn = options.fetch ?? globalThis.fetch;
    this.timeout = options.timeout;
  }

  /**
   * Approve the authentication request using the PAT.
   * First fetches device information to get available scopes,
   * then filters scopes if allowedScopes is set,
   * and finally approves the device.
   *
   * @param request - The authentication request
   * @throws {CloudError} If fetching device information or approving the device fails
   */
  async approve(request: AuthenticationRequest): Promise<void> {
    // Step 1: Get device information to retrieve available scopes
    const deviceInfo = await this.getDeviceInformation(request.userCode);

    // Step 2: Filter scopes if allowedScopes is provided
    let scopesToApprove = deviceInfo.scopes.map((s) => s.name);
    if (this.allowedScopes) {
      scopesToApprove = scopesToApprove.filter((scope) =>
        this.allowedScopes!.includes(scope),
      );
    }

    // Step 3: Approve the device with the filtered scopes
    await this.approveDevice(request.userCode, scopesToApprove);
  }

  private async sendRequest(
    url: URL,
    options: RequestOptions,
  ): Promise<Response> {
    const fetchOptions: RequestInit = {
      method: options.method,
      headers: options.headers,
    };

    if (this.timeout !== undefined) {
      fetchOptions.signal = AbortSignal.timeout(this.timeout);
    }

    return this.fetchFn(url, fetchOptions);
  }

  private async parseOAuth2Error(
    response: Response,
  ): Promise<ParsedOAuth2Error> {
    let errorText: string;
    let errorCode: string | undefined;
    let errorDescription: string | undefined;

    try {
      const errorData = (await response.json()) as OAuth2ErrorData;
      if (typeof errorData === "string") {
        errorText = errorData;
      } else {
        errorCode = errorData.error;
        errorDescription = errorData.error_description;
        errorText = errorDescription ?? errorCode ?? "Unknown error";
      }
    } catch {
      errorText = await response.text().catch(() => "Unknown error");
    }

    return { errorText, errorCode, errorDescription };
  }

  private async getDeviceInformation(
    userCode: string,
  ): Promise<DeviceInformation> {
    const params = new URLSearchParams();
    params.append("user_code", userCode);
    const url = new URL(`${this.apiUrl}/oauth2/device/information`);
    url.search = params.toString();

    const response = await this.sendRequest(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.pat}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const { errorText, errorCode, errorDescription } =
        await this.parseOAuth2Error(response);

      throw new CloudError(`Failed to get device information: ${errorText}`, {
        statusCode: response.status,
        code: errorCode,
        reason: errorDescription,
      });
    }

    const data = (await response.json()) as DeviceInformation;
    return data;
  }

  private async approveDevice(
    userCode: string,
    scopes: string[],
  ): Promise<void> {
    const params = new URLSearchParams();
    params.append("user_code", userCode);
    params.append("scope", scopes.join(","));
    const url = new URL(`${this.apiUrl}/oauth2/device/approve`);
    url.search = params.toString();

    const response = await this.sendRequest(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.pat}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const { errorText, errorCode, errorDescription } =
        await this.parseOAuth2Error(response);

      throw new CloudError(`Failed to approve device: ${errorText}`, {
        statusCode: response.status,
        code: errorCode,
        reason: errorDescription,
      });
    }
  }
}
