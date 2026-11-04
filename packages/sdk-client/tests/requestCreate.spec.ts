import { describe, expect, it } from "vitest";

import { bytes } from "./utils.js";

import { Source } from "@/types/index.js";

describe("Request create", () => {
  it("should create a request and read it back", async () => {
    const raw = bytes("GET /created HTTP/1.1\r\nHost: example.com\r\n\r\n");

    const created = await caido.request.create({
      host: "example.com",
      method: "GET",
      path: "/created",
      port: 80,
      query: "",
      raw,
      source: Source.Plugin,
    });

    expect(created.request.host).toBe("example.com");
    expect(created.request.path).toBe("/created");
    expect(created.request.method).toBe("GET");
    expect(created.request.raw).toContainBytes(bytes("/created"));
  });
});
