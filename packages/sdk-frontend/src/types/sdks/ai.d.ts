import type { AIProvider, AIUpstreamProvider } from "../types/ai";
/**
 * Utilities to interact with AI.
 * @category AI
 */
export type AiSDK = {
    /**
     * Creates a new AI provider instance that can be used with the [ai](https://ai-sdk.dev/) library.
     * @returns A provider instance compatible with the [ai](https://ai-sdk.dev/) library.
     */
    createProvider: () => AIProvider;
    /**
     * Gets the list of upstream AI providers with their configuration status.
     * @returns An array of AI upstream providers with their configuration status.
     */
    getUpstreamProviders: () => AIUpstreamProvider[];
};
