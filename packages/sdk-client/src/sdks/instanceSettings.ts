import { mapToInstanceSettings } from "@/convert/instanceSettings.js";
import type {
  AiProviderAnthropicInput,
  AiProviderGoogleInput,
  AiProviderOpenAiInput,
  AiProviderOpenRouterInput,
  GraphQLClient,
  SetInstanceSettingsInput as GraphQLSetInstanceSettingsInput,
  SettingsAiProviderInput,
} from "@/graphql/index.js";
import {
  InstanceSettingsDocument,
  SetInstanceSettingsDocument,
} from "@/graphql/index.js";
import type {
  InstanceSettings,
  SetAISettingsInput,
  SetAnalyticsSettingsInput,
  SetAnthropicAISettingInput,
  SetGoogleAISettingInput,
  SetInstanceSettingsInput,
  SetOnboardingSettingsInput,
  SetOpenAIAISettingInput,
  SetOpenRouterAISettingInput,
} from "@/types/index.js";

/**
 * SDK for instance settings.
 */
export class InstanceSettingsSDK {
  constructor(private readonly graphql: GraphQLClient) {}

  /**
   * Get current instance settings.
   */
  async get(): Promise<InstanceSettings> {
    const result = await this.graphql.query(InstanceSettingsDocument);
    return mapToInstanceSettings(result.instanceSettings);
  }

  /**
   * Set an instance setting group.
   */
  async set(input: SetInstanceSettingsInput): Promise<InstanceSettings> {
    if ("ai" in input && input.ai !== undefined) {
      return this.setRaw({
        aiProvider: normalizeAIInput(input.ai),
      });
    }

    if ("analytics" in input && input.analytics !== undefined) {
      return this.setRaw({
        analytics: input.analytics,
      });
    }

    if ("onboarding" in input && input.onboarding !== undefined) {
      return this.setRaw({
        onboarding: input.onboarding,
      });
    }

    throw new Error("Invalid instance settings input");
  }

  /**
   * Set AI settings for one provider.
   */
  async setAI(input: SetAISettingsInput): Promise<InstanceSettings> {
    return this.set({ ai: input });
  }

  /**
   * Set analytics settings.
   */
  async setAnalytics(
    input: SetAnalyticsSettingsInput,
  ): Promise<InstanceSettings> {
    return this.set({ analytics: input });
  }

  /**
   * Set onboarding settings.
   */
  async setOnboarding(
    input: SetOnboardingSettingsInput,
  ): Promise<InstanceSettings> {
    return this.set({ onboarding: input });
  }

  private async setRaw(
    input: GraphQLSetInstanceSettingsInput,
  ): Promise<InstanceSettings> {
    const result = await this.graphql.mutation(SetInstanceSettingsDocument, {
      input,
    });

    return mapToInstanceSettings(result.setInstanceSettings.settings);
  }
}

function normalizeAIInput(input: SetAISettingsInput): SettingsAiProviderInput {
  if ("anthropic" in input && input.anthropic !== undefined) {
    return {
      anthropic: normalizeAnthropic(input.anthropic),
    };
  }

  if ("google" in input && input.google !== undefined) {
    return {
      google: normalizeGoogle(input.google),
    };
  }

  if ("openai" in input && input.openai !== undefined) {
    return {
      openai: normalizeOpenAI(input.openai),
    };
  }

  if ("openrouter" in input && input.openrouter !== undefined) {
    return {
      openrouter: normalizeOpenRouter(input.openrouter),
    };
  }

  throw new Error("Invalid AI settings input");
}

function normalizeAnthropic(
  value: SetAnthropicAISettingInput,
): AiProviderAnthropicInput {
  if (typeof value === "string") {
    return { apiKey: value };
  }

  return { apiKey: value.apiKey };
}

function normalizeGoogle(
  value: SetGoogleAISettingInput,
): AiProviderGoogleInput {
  if (typeof value === "string") {
    return { apiKey: value };
  }

  return { apiKey: value.apiKey };
}

function normalizeOpenAI(
  value: SetOpenAIAISettingInput,
): AiProviderOpenAiInput {
  if (typeof value === "string") {
    return { apiKey: value };
  }

  return {
    apiKey: value.apiKey,
    url: value.url,
  };
}

function normalizeOpenRouter(
  value: SetOpenRouterAISettingInput,
): AiProviderOpenRouterInput {
  if (typeof value === "string") {
    return { apiKey: value };
  }

  return { apiKey: value.apiKey };
}
