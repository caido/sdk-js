import type { ID } from "./index.js";

import type { HostedFileStatus } from "@/graphql/index.js";

/**
 * Hosted file information
 */
export type HostedFile = {
  id: ID;
  name: string;
  path: string;
  size: number;
  status: HostedFileStatus;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Options for uploading a hosted file
 */
export type UploadHostedFileOptions = {
  /** The name of the hosted file */
  name: string;
  /** The file to upload */
  file: File;
};
