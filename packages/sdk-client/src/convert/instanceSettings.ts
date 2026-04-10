import type { InstanceSettingsFullFragment } from "@/graphql/index.js";
import type {
  AISettings,
  AnalyticsSettings,
  InstanceSettings,
  OnboardingSettings,
} from "@/types/index.js";
import { isPresent } from "@/utils/optional.js";

export const mapToInstanceSettings = (
  data: InstanceSettingsFullFragment,
): InstanceSettings => {
  return {
    ai: mapToAISettings(data),
    analytics: mapToAnalyticsSettings(data),
    onboarding: mapToOnboardingSettings(data),
  };
};

const mapToAISettings = (data: InstanceSettingsFullFragment): AISettings => {
  const anthropic = data.aiProviders.anthropic;
  const google = data.aiProviders.google;
  const openai = data.aiProviders.openai;
  const openrouter = data.aiProviders.openrouter;

  return {
    anthropic: isPresent(anthropic)
      ? {
          apiKey: anthropic.apiKey,
        }
      : undefined,
    google: isPresent(google)
      ? {
          apiKey: google.apiKey,
        }
      : undefined,
    openai: isPresent(openai)
      ? {
          apiKey: openai.apiKey,
          url: openai.url ?? undefined,
        }
      : undefined,
    openrouter: isPresent(openrouter)
      ? {
          apiKey: openrouter.apiKey,
        }
      : undefined,
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
