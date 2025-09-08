import { type LanguageModelV2, type ProviderV2 } from "@ai-sdk/provider";
/**
 * Official AI Provider to be used by the [ai](https://ai-sdk.dev/) library.
 * @category AI
 */
export type AIProvider = ProviderV2 & ((modelId: string) => LanguageModelV2);
