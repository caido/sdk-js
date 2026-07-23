/**
 * Options for importing a PKCS#12 certificate bundle.
 */
export type ImportCertificateOptions = {
  /** The PKCS#12 certificate bundle to import. */
  file: File;
  /** The password protecting the bundle, when applicable. */
  password?: string;
};
