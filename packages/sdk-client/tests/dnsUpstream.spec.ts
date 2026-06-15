import { describe, expect, it } from "vitest";

describe("DNSUpstream", () => {
  it("should be able to list DNS upstreams", async () => {
    const upstreams = await caido.dnsUpstream.list();
    expect(Array.isArray(upstreams)).toBe(true);
  });

  it("should be able to create a DNS upstream resolver", async () => {
    const upstream = await caido.dnsUpstream.create({
      ip: "1.1.1.1",
      name: "Cloudflare DNS",
    });

    expect(upstream).toBeDefined();
    expect(upstream.id).toBeDefined();
    expect(upstream.ip).toBe("1.1.1.1");
    expect(upstream.name).toBe("Cloudflare DNS");
  });
});
