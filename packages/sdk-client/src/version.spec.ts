import { describe, expect, it, vi } from "vitest";

import type { RestClient } from "@/rest/index.js";
import { Version } from "@/version.js";

describe("Version", () => {
  it("returns seeded semver without fetching", async () => {
    const version = Version.of("0.55.0");

    await expect(version.get()).resolves.toBe("0.55.0");
    await expect(version.gte("0.54.0")).resolves.toBe(true);
    await expect(version.gte("0.56.0")).resolves.toBe(false);
  });

  it("fetches semver lazily from /health", async () => {
    const rest = {
      get: vi.fn().mockResolvedValue({
        name: "caido",
        version: "0.55.3",
        ready: true,
      }),
    } as unknown as RestClient;

    const version = Version.lazy(rest);

    await expect(version.get()).resolves.toBe("0.55.3");
    await expect(version.gte("0.55.0")).resolves.toBe(true);
    expect(rest.get).toHaveBeenCalledTimes(1);

    await expect(version.get()).resolves.toBe("0.55.3");
    expect(rest.get).toHaveBeenCalledTimes(1);
  });

  it("dedupes concurrent lazy fetches", async () => {
    let resolveGet: (value: unknown) => void = () => {};
    const rest = {
      get: vi.fn().mockImplementation(
        () =>
          new Promise((resolve) => {
            resolveGet = resolve;
          }),
      ),
    } as unknown as RestClient;

    const version = Version.lazy(rest);
    const first = version.get();
    const second = version.gte("0.55.0");

    resolveGet({ name: "caido", version: "0.55.3", ready: true });

    await expect(Promise.all([first, second])).resolves.toEqual([
      "0.55.3",
      true,
    ]);
    expect(rest.get).toHaveBeenCalledTimes(1);
  });
});
