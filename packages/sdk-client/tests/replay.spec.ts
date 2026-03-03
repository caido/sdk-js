import { describe, expect, it } from "vitest";

import { bytes, createMockReplaySession } from "./utils.js";

describe("Replay", () => {
  it("should be able to send", async () => {
    const session = await createMockReplaySession();

    const result = await caido.replay.send(session.id, {
      raw: "GET / HTTP/1.1\r\nHost: perdu.com\r\n\r\n",
      connection: {
        host: "perdu.com",
        port: 443,
        isTLS: true,
      },
    });
    expect(result.entry.request!.host).toBe("perdu.com");
    expect(result.entry.request!.port).toBe(443);
    expect(result.entry.response!.statusCode).toBe(200);
    expect(result.entry.response!.raw).toContainBytes(bytes("Pas de panique"));
  });
});
