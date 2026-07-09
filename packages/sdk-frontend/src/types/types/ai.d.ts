import { type LanguageModelV3, type ProviderV3 } from "@ai-sdk/provider";
/**
 * Settings for AI reasoning.
 * @category AI
 */
export type AIReasoningSettings = {
    effort: "low" | "medium" | "high";
};
/**
 * Settings for AI language model.
 * @category AI
 */
export type AILanguageModelSettings = {
    reasoning?: AIReasoningSettings;
    capabilities?: {
        reasoning: boolean;
        structured_output: boolean;
    };
};
/**
 * Official AI Provider to be used by the [ai](https://ai-sdk.dev/) library.
 * @category AI
 */
export type AIProvider = ProviderV3 & ((modelId: string, settings?: AILanguageModelSettings) => LanguageModelV3);
/**
 * AI upstream provider ID.
 * @category AI
 */
export type AIUpstreamProviderId = string;
/**
 * The response API a provider speaks.
 * @category AI
 */
export type AIUpstreamProviderApi = "ANTHROPIC" | "GEMINI" | "OPENAI_COMPLETION" | "OPENAI_RESPONSE" | "OPENROUTER";
/**
 * AI upstream provider information.
 * Only configured providers are returned.
 * @category AI
 */
export type AIUpstreamProvider = {
    id: AIUpstreamProviderId;
    api: AIUpstreamProviderApi;
};
