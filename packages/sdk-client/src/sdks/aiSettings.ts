import { OtherUserError } from "@/errors/index.js";
import type { GraphQLClient } from "@/graphql/index.js";
import {
  type AiProviderAnthropicInput as V058AiProviderAnthropicInput,
  type AiProviderGoogleInput as V058AiProviderGoogleInput,
  type AiProviderOpenAiInput as V058AiProviderOpenAiInput,
  type AiProviderOpenRouterInput as V058AiProviderOpenRouterInput,
  InstanceAiProvidersDocument as V058InstanceAiProvidersDocument,
  type InstanceAiProvidersFullFragment as V058InstanceAiProvidersFullFragment,
  SetInstanceAiProviderDocument as V058SetInstanceAiProviderDocument,
  type SettingsAiProviderInput as V058SettingsAiProviderInput,
} from "@/transport/v0.58/index.js";
import type {
  AISettings,
  SetAISettingsInput,
  SetAnthropicAISettingInput,
  SetGoogleAISettingInput,
  SetOpenAIAISettingInput,
  SetOpenRouterAISettingInput,
} from "@/types/index.js";
import { TransportVersion } from "@/types/index.js";
import { isPresent } from "@/utils/optional.js";
import type { Version } from "@/version.js";

/**
 * SDK for the AI provider credentials of an instance.
 *
 * Removed in: Caido v0.59.0, which moved providers to their own API.
 */
export class AISettingsSDK {
  constructor(
    private readonly graphql: GraphQLClient,
    private readonly version: Version,
  ) {}

  /**
   * Get the configured AI providers.
   */
  async get(): Promise<AISettings> {
    await this.assertSupported();

    const result = await this.graphql.query(V058InstanceAiProvidersDocument);
    return mapToAISettings(result.instanceSettings);
  }

  /**
   * Set the credentials of one AI provider.
   * @param input - Exactly one provider to write.
   * @returns The providers as stored after the write.
   */
  async set(input: SetAISettingsInput): Promise<AISettings> {
    await this.assertSupported();

    const result = await this.graphql.mutation(
      V058SetInstanceAiProviderDocument,
      { input: { aiProvider: toProviderInput(input) } },
    );
    return mapToAISettings(result.setInstanceSettings.settings);
  }

  private async assertSupported(): Promise<void> {
    if (await this.version.gte(TransportVersion.V0_59)) {
      throw new OtherUserError(
        "UNSUPPORTED",
        "AI providers moved out of instance settings in Caido 0.59.0",
      );
    }
  }
}

const mapToAISettings = (
  data: V058InstanceAiProvidersFullFragment,
): AISettings => {
  const anthropic = data.aiProviders.anthropic;
  const google = data.aiProviders.google;
  const openai = data.aiProviders.openai;
  const openrouter = data.aiProviders.openrouter;

  return {
    anthropic: isPresent(anthropic) ? { apiKey: anthropic.apiKey } : undefined,
    google: isPresent(google) ? { apiKey: google.apiKey } : undefined,
    openai: isPresent(openai)
      ? { apiKey: openai.apiKey, url: openai.url ?? undefined }
      : undefined,
    openrouter: isPresent(openrouter)
      ? { apiKey: openrouter.apiKey }
      : undefined,
  };
};

const toProviderInput = (
  input: SetAISettingsInput,
): V058SettingsAiProviderInput => {
  if ("anthropic" in input && input.anthropic !== undefined) {
    return { anthropic: toAnthropicInput(input.anthropic) };
  }
  if ("google" in input && input.google !== undefined) {
    return { google: toGoogleInput(input.google) };
  }
  if ("openai" in input && input.openai !== undefined) {
    return { openai: toOpenAIInput(input.openai) };
  }
  if ("openrouter" in input && input.openrouter !== undefined) {
    return { openrouter: toOpenRouterInput(input.openrouter) };
  }
  throw new OtherUserError("INTERNAL", "Invalid AI settings input");
};

const toAnthropicInput = (
  value: SetAnthropicAISettingInput,
): V058AiProviderAnthropicInput => {
  return typeof value === "string"
    ? { apiKey: value }
    : { apiKey: value.apiKey };
};

const toGoogleInput = (
  value: SetGoogleAISettingInput,
): V058AiProviderGoogleInput => {
  return typeof value === "string"
    ? { apiKey: value }
    : { apiKey: value.apiKey };
};

const toOpenAIInput = (
  value: SetOpenAIAISettingInput,
): V058AiProviderOpenAiInput => {
  return typeof value === "string"
    ? { apiKey: value }
    : { apiKey: value.apiKey, url: value.url };
};

const toOpenRouterInput = (
  value: SetOpenRouterAISettingInput,
): V058AiProviderOpenRouterInput => {
  return typeof value === "string"
    ? { apiKey: value }
    : { apiKey: value.apiKey };
};
