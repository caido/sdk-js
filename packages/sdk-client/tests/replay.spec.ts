import { describe, expect, it } from "vitest";

import { bytes, createMockReplaySession } from "./utils.js";

describe("Replay", () => {
  it("should be able to send", async () => {
    const session = await createMockReplaySession();

    const result = await caido.replay.send(session.id, {
      raw: "GET / HTTP/1.1\r\nHost: httpforever.com\r\n\r\n",
      connection: {
        host: "httpforever.com",
        port: 80,
        isTLS: false,
      },
    });
    expect(result.entry.request!.host).toBe("httpforever.com");
    expect(result.entry.request!.port).toBe(80);
    expect(result.entry.response!.statusCode).toBe(200);
    expect(result.entry.response!.raw).toContainBytes(
      bytes("A reliably insecure connection"),
    );
  });
});
