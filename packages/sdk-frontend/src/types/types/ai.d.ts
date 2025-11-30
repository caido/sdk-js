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
};
/**
 * Official AI Provider to be used by the [ai](https://ai-sdk.dev/) library.
 * @category AI
 */
export type AIProvider = ProviderV2 & ((modelId: string, settings?: AILanguageModelSettings) => LanguageModelV2);
