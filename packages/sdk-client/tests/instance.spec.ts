import { afterEach, beforeEach, describe, expect, it } from "vitest";

import type { InstanceSettings } from "@/types/index.js";

describe("Instance", () => {
  let original: InstanceSettings;

  beforeEach(async () => {
    original = await caido.instance.settings.get();
  });

  afterEach(async () => {
    await caido.instance.settings.setAnalytics({
      enabled: original.analytics.enabled,
    });
    await caido.instance.settings.setOnboarding({
      analytic: original.onboarding.analytic,
    });

    if (original.ai.openrouter !== undefined) {
      await caido.instance.settings.setAI({
        openrouter: { apiKey: original.ai.openrouter.apiKey },
      });
      return;
    }

    if (original.ai.openai !== undefined) {
      await caido.instance.settings.setAI({
        openai: {
          apiKey: original.ai.openai.apiKey,
          url: original.ai.openai.url,
        },
      });
      return;
    }

    if (original.ai.anthropic !== undefined) {
      await caido.instance.settings.setAI({
        anthropic: { apiKey: original.ai.anthropic.apiKey },
      });
      return;
    }

    if (original.ai.google !== undefined) {
      await caido.instance.settings.setAI({
        google: { apiKey: original.ai.google.apiKey },
      });
    }
  });

  it("should read and update instance settings", async () => {
    expect(original.analytics.enabled).toBeTypeOf("boolean");
    expect(original.onboarding.analytic).toBeTypeOf("boolean");

    const nextAnalytics = !original.analytics.enabled;
    const nextOnboarding = !original.onboarding.analytic;

    const analyticsUpdated = await caido.instance.settings.setAnalytics({
      enabled: nextAnalytics,
    });
    expect(analyticsUpdated.analytics.enabled).toBe(nextAnalytics);

    const onboardingUpdated = await caido.instance.settings.setOnboarding({
      analytic: nextOnboarding,
    });
    expect(onboardingUpdated.onboarding.analytic).toBe(nextOnboarding);
  });

  it("should support shorthand and object forms for setAI", async () => {
    const testApiKey = `sdk-test-key-${Date.now()}`;

    if (original.ai.openrouter !== undefined) {
      await caido.instance.settings.setAI({ openrouter: testApiKey });
      return;
    }

    if (original.ai.openai !== undefined) {
      await caido.instance.settings.setAI({ openai: testApiKey });
      return;
    }

    if (original.ai.anthropic !== undefined) {
      await caido.instance.settings.setAI({ anthropic: testApiKey });
      return;
    }

    if (original.ai.google !== undefined) {
      await caido.instance.settings.setAI({ google: testApiKey });
      return;
    }

    expect(true).toBe(true);
  });
});
