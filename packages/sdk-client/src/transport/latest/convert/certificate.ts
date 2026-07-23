import { decodeBlob } from "./blob.js";

export const mapToCertificate = (p12: string): Uint8Array => decodeBlob(p12)!;

export const mapToCertificateGeneration = (success: boolean): boolean =>
  success;
