import { describe, expect, it, vi } from "vitest";

import { InstanceSettingsSDK } from "./instanceSettings.js";

import type { GraphQLClient } from "@/graphql/index.js";
import { Version } from "@/version.js";

const baseSettings = {
  analytic: { enabled: false, cloud: false, local: true },
  onboarding: { analytic: true },
};

const aiSettings = {
  aiProviders: {
    anthropic: null,
    google: null,
    openai: { apiKey: "key", url: null },
    openrouter: null,
  },
};

const sdkFor = (semver: string, graphql: unknown): InstanceSettingsSDK => {
  return new InstanceSettingsSDK(
    graphql as GraphQLClient,
    Version.of(semver as "0.58.0"),
  );
};

describe("InstanceSettingsSDK.get", () => {
  it("reads AI providers from instance settings before 0.59", async () => {
    const query = vi.fn(async (document: unknown) =>
      JSON.stringify(document).includes("aiProviders")
        ? { instanceSettings: aiSettings }
        : { instanceSettings: baseSettings },
    );

    const settings = await sdkFor("0.58.0", { query }).get();

    expect(settings.ai.openai?.apiKey).toBe("key");
    expect(settings.analytics.local).toBe(true);
    expect(query).toHaveBeenCalledTimes(2);
  });

  // 0.59.0 moved AI providers out of instance settings, so asking for them
  // there is a validation error rather than an empty result.
  it("never asks for AI providers on 0.59 and later", async () => {
    const query = vi.fn(async (_document: unknown) => ({
      instanceSettings: baseSettings,
    }));

    const settings = await sdkFor("0.59.0", { query }).get();

    expect(settings.ai).toEqual({});
    expect(query).toHaveBeenCalledTimes(1);
    expect(JSON.stringify(query.mock.calls[0]?.[0])).not.toContain(
      "aiProviders",
    );
  });
});

describe("InstanceSettingsSDK.set", () => {
  it("returns the mutation result without a second read", async () => {
    const query = vi.fn(async () => ({ instanceSettings: baseSettings }));
    const mutation = vi.fn(async () => ({
      setInstanceSettings: { settings: baseSettings },
    }));

    const settings = await sdkFor("0.59.0", { query, mutation }).setAnalytics({
      enabled: true,
    });

    expect(settings.analytics.local).toBe(true);
    expect(mutation).toHaveBeenCalledTimes(1);
    expect(query).not.toHaveBeenCalled();
  });

  it("refuses to write AI settings on 0.59 and later", async () => {
    const mutation = vi.fn();
    const sdk = sdkFor("0.59.0", { mutation });

    await expect(sdk.setAI({ openai: "key" })).rejects.toThrow("0.59.0");
    expect(mutation).not.toHaveBeenCalled();
  });
});
