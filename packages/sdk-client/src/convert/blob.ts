import { isPresent } from "@/utils/optional.js";

export const decodeBlob = (raw: string | undefined): Uint8Array | undefined => {
  if (!isPresent(raw)) {
    return undefined;
  }

  const binary = atob(raw);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
};

export const encodeBlob = (bytes: string | Uint8Array): string => {
  if (typeof bytes === "string") {
    return btoa(bytes);
  }
  return btoa(String.fromCharCode(...bytes));
};
