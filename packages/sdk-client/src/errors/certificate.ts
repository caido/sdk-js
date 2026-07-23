import { BaseError } from "./base.js";

import { type CertificateErrorReason } from "@/graphql/index.js";

export class CertificateUserError extends BaseError {
  readonly reason: CertificateErrorReason;

  constructor(reason: CertificateErrorReason) {
    super(`Certificate operation failed: ${reason}`);
    this.name = "CertificateUserError";
    this.reason = reason;
  }
}
