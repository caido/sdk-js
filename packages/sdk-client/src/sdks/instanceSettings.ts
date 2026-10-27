import { mapToInstanceSettings } from "@/convert/instanceSettings.js";
import { OtherUserError } from "@/errors/index.js";
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
  InstanceAiProvidersDocument,
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
import { TransportVersion } from "@/types/index.js";
import type { Version } from "@/version.js";

/**
 * SDK for instance settings.
 */
export class InstanceSettingsSDK {
  constructor(
    private readonly graphql: GraphQLClient,
    private readonly version: Version,
  ) {}

  /**
   * Get current instance settings.
   */
  async get(): Promise<InstanceSettings> {
    const result = await this.graphql.query(InstanceSettingsDocument);
    if (!(await this.supportsAIProviders())) {
      return mapToInstanceSettings(result.instanceSettings);
    }

    const ai = await this.graphql.query(InstanceAiProvidersDocument);
    return mapToInstanceSettings(result.instanceSettings, ai.instanceSettings);
  }

  /**
   * Set an instance setting group.
   */
  async set(input: SetInstanceSettingsInput): Promise<InstanceSettings> {
    if ("ai" in input && input.ai !== undefined) {
      if (!(await this.supportsAIProviders())) {
        throw new OtherUserError(
          "UNSUPPORTED",
          "AI providers moved out of instance settings in Caido 0.59.0",
        );
      }
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
    await this.graphql.mutation(SetInstanceSettingsDocument, { input });
    return this.get();
  }

  /** AI providers live in instance settings only before Caido 0.59.0. */
  private async supportsAIProviders(): Promise<boolean> {
    return !(await this.version.gte(TransportVersion.V0_59));
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
