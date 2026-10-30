import { beforeEach, describe, expect, it } from "vitest";

import type { InstanceSettings } from "@/types/index.js";

describe("Instance", () => {
  let original: InstanceSettings;

  beforeEach(async () => {
    original = await caido.instance.settings.get();
  });

  // `analytics.enabled` is derived as `local && cloud`, and `cloud` is owned by
  // the cloud connection, so only `local` reflects what this mutation writes.
  it("should read and update instance settings", async () => {
    expect(original.analytics.local).toBeTypeOf("boolean");
    expect(original.onboarding.analytic).toBeTypeOf("boolean");

    const nextAnalytics = !original.analytics.local;
    const nextOnboarding = !original.onboarding.analytic;

    try {
      const analyticsUpdated = await caido.instance.settings.setAnalytics({
        enabled: nextAnalytics,
      });
      expect(analyticsUpdated.analytics.local).toBe(nextAnalytics);

      const onboardingUpdated = await caido.instance.settings.setOnboarding({
        analytic: nextOnboarding,
      });
      expect(onboardingUpdated.onboarding.analytic).toBe(nextOnboarding);
    } finally {
      await caido.instance.settings.setAnalytics({
        enabled: original.analytics.local,
      });
      await caido.instance.settings.setOnboarding({
        analytic: original.onboarding.analytic,
      });
    }
  });
});
