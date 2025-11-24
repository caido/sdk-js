import { type LanguageModelV2, type ProviderV2 } from "@ai-sdk/provider";
export type AIReasoningSettings = {
    effort: "low" | "medium" | "high";
};
export type AILanguageModelSettings = {
    reasoning?: AIReasoningSettings;
};
/**
 * Official AI Provider to be used by the [ai](https://ai-sdk.dev/) library.
 * @category AI
 */
export type AIProvider = ProviderV2 & ((modelId: string, settings?: AILanguageModelSettings) => LanguageModelV2);
