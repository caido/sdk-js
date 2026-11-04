import { afterEach, beforeEach, describe, expect, it } from "vitest";

import type { InstanceSettings } from "@/types/index.js";

describe("Instance", () => {
  let original: InstanceSettings;

  beforeEach(async () => {
    original = await caido.instance.settings.get();
  });

  afterEach(async () => {
    await caido.instance.settings.setAnalytics({
      enabled: original.analytics.local,
    });
    await caido.instance.settings.setOnboarding({
      analytic: original.onboarding.analytic,
    });
  });

  // `enabled` is `local && cloud`, so only `local` reflects this write.
  it("should read and update instance settings", async () => {
    expect(original.analytics.local).toBeTypeOf("boolean");
    expect(original.onboarding.analytic).toBeTypeOf("boolean");

    const nextAnalytics = !original.analytics.local;
    const nextOnboarding = !original.onboarding.analytic;

    const analyticsUpdated = await caido.instance.settings.setAnalytics({
      enabled: nextAnalytics,
    });
    expect(analyticsUpdated.analytics.local).toBe(nextAnalytics);

    const onboardingUpdated = await caido.instance.settings.setOnboarding({
      analytic: nextOnboarding,
    });
    expect(onboardingUpdated.onboarding.analytic).toBe(nextOnboarding);
  });
});

describe("Instance AI", () => {
  it("should read AI providers", async () => {
    if (await caido.version.gte("0.59.0")) {
      await expect(caido.instance.ai.get()).rejects.toThrow("0.59.0");
      return;
    }

    const providers = await caido.instance.ai.get();
    expect(providers).toBeTypeOf("object");
  });

  // 0.58 can overwrite a provider but never clear one, so only a provider that
  // is already set can be written to and put back.
  it("should round-trip a configured provider", async () => {
    if (await caido.version.gte("0.59.0")) {
      await expect(
        caido.instance.ai.set({ openai: "sdk-test-key" }),
      ).rejects.toThrow("0.59.0");
      return;
    }

    const original = await caido.instance.ai.get();
    if (original.openai === undefined) {
      return;
    }

    const updated = await caido.instance.ai.set({ openai: "sdk-test-key" });
    expect(updated.openai?.apiKey).toBe("sdk-test-key");

    const restored = await caido.instance.ai.set({ openai: original.openai });
    expect(restored.openai?.apiKey).toBe(original.openai.apiKey);
  });
});
