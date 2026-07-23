import {
  mapToCertificate,
  mapToCertificateGeneration,
} from "@/convert/certificate.js";
import {
  GetCertificateDocument,
  type GraphQLClient,
  ImportCertificateDocument,
  type ImportCertificateInput,
  RegenerateCertificateDocument,
} from "@/graphql/index.js";
import type { ImportCertificateOptions } from "@/types/index.js";
import { handleGraphQLError } from "@/utils/errors.js";
import { isPresent } from "@/utils/optional.js";

/**
 * Higher-level SDK for certificate operations.
 */
export class CertificateSDK {
  constructor(private readonly graphql: GraphQLClient) {}

  /**
   * Export the current certificate as a PKCS#12 bundle.
   */
  async export(password?: string): Promise<Uint8Array> {
    const result = await this.graphql.query(GetCertificateDocument, {
      password,
    });

    return mapToCertificate(result.runtime.certificate.p12);
  }

  /**
   * Import a PKCS#12 certificate bundle.
   */
  async import(options: ImportCertificateOptions): Promise<void> {
    const input = {
      certificate: {
        p12: {
          file: options.file,
          password: options.password,
        },
      },
    } satisfies ImportCertificateInput;

    const result = await this.graphql.mutation(ImportCertificateDocument, {
      input,
    });
    const error = result.importCertificate.error;

    if (isPresent(error)) {
      handleGraphQLError(error);
    }
  }

  /**
   * Generate a new certificate.
   */
  async generate(): Promise<boolean> {
    const result = await this.graphql.mutation(RegenerateCertificateDocument);
    return mapToCertificateGeneration(result.regenerateCertificate.success);
  }
}
