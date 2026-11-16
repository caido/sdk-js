import type { InstanceSettingsFullFragment } from "@/graphql/index.js";
import type {
  AnalyticsSettings,
  InstanceSettings,
  OnboardingSettings,
} from "@/types/index.js";

export const mapToInstanceSettings = (
  data: InstanceSettingsFullFragment,
): InstanceSettings => {
  return {
    analytics: mapToAnalyticsSettings(data),
    onboarding: mapToOnboardingSettings(data),
  };
};

const mapToAnalyticsSettings = (
  data: InstanceSettingsFullFragment,
): AnalyticsSettings => {
  return {
    enabled: data.analytic.enabled,
    cloud: data.analytic.cloud,
    local: data.analytic.local,
  };
};

const mapToOnboardingSettings = (
  data: InstanceSettingsFullFragment,
): OnboardingSettings => {
  return {
    analytic: data.onboarding.analytic,
  };
};
