import { isPresent } from "@/utils/optional.js";

export const withUserAgent = (
  fetchFn: typeof globalThis.fetch,
  userAgent: string,
): typeof globalThis.fetch => {
  return (input, init) => {
    const baseHeaders = input instanceof Request ? input.headers : undefined;
    const headers = new Headers(baseHeaders);

    if (!headers.has("User-Agent")) {
      headers.set("User-Agent", userAgent);
    }

    if (isPresent(init?.headers)) {
      new Headers(init.headers).forEach((value, key) => {
        headers.set(key, value);
      });
    }

    return fetchFn(input, { ...init, headers });
  };
};
