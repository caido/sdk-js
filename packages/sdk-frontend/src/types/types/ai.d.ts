import { type LanguageModelV2, type ProviderV2 } from "@ai-sdk/provider";
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
export type AIProvider = ProviderV2 & ((modelId: string, settings?: AILanguageModelSettings) => LanguageModelV2);
/**
 * AI upstream provider ID.
 * @category AI
 */
export type AIUpstreamProviderId = "anthropic" | "google" | "openai" | "openrouter";
/**
 * AI upstream provider information.
 * @category AI
 */
export type AIUpstreamProvider = {
    id: AIUpstreamProviderId;
    status: AIUpstreamProviderStatus;
};
/**
 * AI upstream provider status.
 * Ready: The upstream provider is ready to use.
 * Missing: The upstream provider is not configured.
 * @category AI
 */
export type AIUpstreamProviderStatus = "Ready" | "Missing";
