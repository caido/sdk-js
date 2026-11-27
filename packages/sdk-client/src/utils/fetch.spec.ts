import { describe, expect, it, vi } from "vitest";

import { withUserAgent } from "@/utils/fetch.js";

const createFetch = () =>
  vi.fn<typeof globalThis.fetch>(() => Promise.resolve(new Response()));

const getSentHeaders = (fetchFn: ReturnType<typeof createFetch>) =>
  new Headers(fetchFn.mock.calls[0]?.[1]?.headers);

describe("withUserAgent", () => {
  it("adds the user agent and keeps the other request options", async () => {
    const fetchFn = createFetch();

    await withUserAgent(fetchFn, "my-agent")("http://localhost:8080", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const headers = getSentHeaders(fetchFn);
    expect(fetchFn.mock.calls[0]?.[1]?.method).toBe("POST");
    expect(headers.get("User-Agent")).toBe("my-agent");
    expect(headers.get("Content-Type")).toBe("application/json");
  });

  it("keeps the headers of a Request input", async () => {
    const fetchFn = createFetch();
    const request = new Request("http://localhost:8080", {
      headers: { Authorization: "Bearer token" },
    });

    await withUserAgent(fetchFn, "my-agent")(request);

    const headers = getSentHeaders(fetchFn);
    expect(headers.get("Authorization")).toBe("Bearer token");
    expect(headers.get("User-Agent")).toBe("my-agent");
  });

  it("keeps the user agent already set on a Request input", async () => {
    const fetchFn = createFetch();
    const request = new Request("http://localhost:8080", {
      headers: { "User-Agent": "request-agent" },
    });

    await withUserAgent(fetchFn, "my-agent")(request);

    expect(getSentHeaders(fetchFn).get("User-Agent")).toBe("request-agent");
  });

  it("lets the call headers override the user agent", async () => {
    const fetchFn = createFetch();

    await withUserAgent(fetchFn, "my-agent")("http://localhost:8080", {
      headers: { "User-Agent": "caller-agent" },
    });

    expect(getSentHeaders(fetchFn).get("User-Agent")).toBe("caller-agent");
  });
});
