import type { AICreateProviderOptions, AIGetUpstreamModelsOptions, AIProvider, AIUpstreamModel, AIUpstreamProvider } from "../types/ai";
import type { ListenerHandle } from "../types/utils";
/**
 * Utilities to interact with AI.
 * @category AI
 */
export type AiSDK = {
    /**
     * Creates a new AI provider instance that can be used with the [ai](https://ai-sdk.dev/) library.
     *
     * Models are addressed as `"<alias>/<model-id>"`, see {@link AIModelId}.
     * Failed requests surface as an AI SDK `APICallError`, wrapped in a
     * `RetryError` when the AI SDK retried it; use {@link getAIError} to read
     * the normalized {@link AIError} details from either.
     * @param options - Provider options.
     * @returns A provider instance compatible with the [ai](https://ai-sdk.dev/) library.
     */
    createProvider: (options?: AICreateProviderOptions) => AIProvider;
    /**
     * Gets the list of configured upstream AI providers.
     * @returns An array of configured AI upstream providers.
     */
    getUpstreamProviders: () => AIUpstreamProvider[];
    /**
     * Gets the models of the configured upstream AI providers, as managed in
     * Settings → AI → Models (catalog models plus user-defined ones).
     * @param options - Optional provider filter.
     * @returns An array of upstream models.
     */
    getUpstreamModels: (options?: AIGetUpstreamModelsOptions) => AIUpstreamModel[];
    /**
     * Registers a callback invoked whenever the upstream model list changes
     * (user edits, provider added or removed).
     * @param callback - Receives the current list of upstream models.
     * @returns A handle to stop listening.
     */
    onUpstreamModelsChange: (callback: (models: AIUpstreamModel[]) => void) => ListenerHandle;
};
