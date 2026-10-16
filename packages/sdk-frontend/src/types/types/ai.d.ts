import { type LanguageModelV3, type ProviderV3 } from "@ai-sdk/provider";
/**
 * Controls whether reasoning content is included in the response.
 * @category AI
 */
export type AIReasoningOutput = "include" | "omit";
/**
 * Settings for AI reasoning.
 *
 * The legacy untagged shape `{ effort }` is still accepted and treated as
 * `{ kind: "effort", effort }`.
 * @category AI
 */
export type AIReasoningSettings = {
    kind: "disabled";
} | {
    kind: "effort";
    effort: AIUpstreamModelReasoningEffort;
    output?: AIReasoningOutput;
} | {
    kind: "budget";
    tokens: number;
    output?: AIReasoningOutput;
}
/**
 * @deprecated Use `{ kind: "effort", effort }` instead.
 */
 | {
    kind?: undefined;
    effort: "low" | "medium" | "high";
};
/**
 * Settings for structured output (`responseFormat: { type: "json" }`).
 * @category AI
 */
export type AIStructuredOutputSettings = {
    /**
     * Whether the provider must follow the response schema exactly.
     *
     * Strict mode requires a schema compatible with the provider's strict
     * subset: every property listed in `required` and
     * `additionalProperties: false` on every object.
     * @default false
     */
    strict?: boolean;
};
/**
 * Settings for AI language model.
 * @category AI
 */
export type AILanguageModelSettings = {
    reasoning?: AIReasoningSettings;
    parallelToolCalls?: boolean;
    structuredOutput?: AIStructuredOutputSettings;
};
/**
 * AI model identifier in the form `"<alias>/<model-id>"`.
 *
 * The alias is everything before the first `/` and must match the `id` of a
 * configured upstream provider (see {@link AIUpstreamProvider}). Everything
 * after it is sent to that provider as the model name, so ids with their own
 * slashes such as `openrouter/anthropic/claude-sonnet-4.6` work as expected.
 * @category AI
 */
export type AIModelId = `${string}/${string}`;
/**
 * Options for {@link AiSDK.createProvider}.
 * @category AI
 */
export type AICreateProviderOptions = {
    /**
     * Whether Caido shows a toast when a request fails.
     *
     * Set to `false` when the plugin reports failures itself, for example with
     * {@link getAIError}.
     * @default true
     */
    notifyErrors?: boolean;
};
/**
 * Official AI Provider to be used by the [ai](https://ai-sdk.dev/) library.
 *
 * Only language models are supported: `imageModel` and `embeddingModel`
 * throw an AI SDK `NoSuchModelError`.
 *
 * The following AI SDK features are not supported by language models and
 * throw an `UnsupportedFunctionalityError` before any request is sent:
 * - file parts in user or assistant messages
 * - provider-defined tools, tool input examples, and provider-executed tool
 *   calls
 * - tool results in assistant messages, multipart (`content`) tool results,
 *   `execution-denied` tool results, and tool approval responses
 * - `responseFormat: { type: "json" }` without a schema
 * - the reserved `caido` namespace in call-level `providerOptions`
 *
 * `providerOptions` on system, user, and tool messages, on tool definitions,
 * and on tool results are dropped with a warning because the backend has no
 * slot for them. Assistant content keeps its upstream namespaces. Compaction
 * results and provider tool results returned by the provider are dropped
 * from the response (and surfaced as `raw` stream parts when
 * `includeRawChunks` is set).
 *
 * `abortSignal` cancels the request or the running stream; the resulting
 * `AbortError` is rethrown unchanged and never reported as a failure.
 * Tool input streaming (`tool-input-start`, `tool-input-delta`,
 * `tool-input-end`) is supported.
 * @category AI
 */
export type AIProvider = Omit<ProviderV3, "languageModel"> & {
    languageModel: (modelId: AIModelId, settings?: AILanguageModelSettings) => LanguageModelV3;
} & ((modelId: AIModelId, settings?: AILanguageModelSettings) => LanguageModelV3);
/**
 * AI upstream provider ID.
 * @category AI
 */
export type AIUpstreamProviderId = string;
/**
 * The response API a provider speaks.
 * @category AI
 */
export type AIUpstreamProviderApi = "ANTHROPIC" | "BEDROCK" | "CHATGPT_RESPONSE" | "GEMINI" | "OPENAI_COMPLETION" | "OPENAI_RESPONSE" | "OPENROUTER" | "XAI_COMPLETION" | "XAI_RESPONSE";
/**
 * The kind of a configured upstream provider.
 *
 * `CUSTOM` providers are user-defined endpoints; every other kind is one of
 * the providers Caido offers directly.
 * @category AI
 */
export type AIUpstreamProviderKind = "ANTHROPIC" | "BEDROCK" | "CHATGPT" | "CUSTOM" | "GEMINI" | "OPENAI" | "OPENROUTER" | "XAI";
/**
 * How a configured upstream provider authenticates.
 *
 * - `API_KEY`: the user stored an API key.
 * - `OAUTH`: the user signed in with a subscription account.
 * - `AWS`: requests are signed with AWS credentials, from a stored key pair
 *   or an AWS profile on the machine running Caido.
 * - `NONE`: no credentials are stored (for example a local endpoint).
 * @category AI
 */
export type AIUpstreamProviderAuth = "API_KEY" | "OAUTH" | "AWS" | "NONE";
/**
 * Whether the stored credentials of a configured upstream provider are
 * currently usable.
 *
 * - `VALID`: the last request or sign-in succeeded.
 * - `UNVERIFIED`: the credentials have not been used yet.
 * - `INVALID`: the backend saw the credentials rejected. It flips back to
 *   `VALID` after the next successful request or sign-in.
 * @category AI
 */
export type AIUpstreamProviderAuthentication = "VALID" | "UNVERIFIED" | "INVALID";
/**
 * AI upstream provider information.
 * Only configured providers are returned.
 * @category AI
 */
export type AIUpstreamProvider = {
    /**
     * The provider alias, used before the first `/` of an {@link AIModelId}.
     */
    id: AIUpstreamProviderId;
    /**
     * The response API the provider speaks.
     */
    api: AIUpstreamProviderApi;
    /**
     * The provider kind.
     */
    kind: AIUpstreamProviderKind;
    /**
     * How the provider authenticates.
     */
    auth: AIUpstreamProviderAuth;
    /**
     * Whether the stored credentials are currently usable.
     */
    authentication: AIUpstreamProviderAuthentication;
};
/**
 * The kind of a failed AI request, as reported by the Caido backend.
 *
 * - `provider-not-configured`: the alias of the model id matches no
 *   configured provider.
 * - `invalid-request`: the backend rejected the request payload.
 * - `authorization`: the Caido session is not allowed to use AI.
 * - `provider`: the upstream provider request failed, see
 *   {@link AIError.providerError}.
 * - `internal`: the backend failed unexpectedly.
 * @category AI
 */
export type AIErrorKind = "provider-not-configured" | "invalid-request" | "authorization" | "provider" | "internal";
/**
 * The kind of an upstream provider failure.
 * @category AI
 */
export type AIProviderErrorKind = "configuration" | "invalid-request" | "unsupported-capability" | "unsupported-content" | "authentication" | "permission" | "content-policy" | "not-found" | "rate-limited" | "overloaded" | "context-length" | "transport" | "timeout" | "malformed-response" | "truncated-stream" | "provider";
/**
 * Details of an upstream provider failure.
 * @category AI
 */
export type AIProviderError = {
    /**
     * The kind of failure.
     */
    kind: AIProviderErrorKind;
    /**
     * The failure message.
     */
    message: string;
    /**
     * The provider API profile that produced the failure.
     */
    origin?: string;
    /**
     * The model that was requested.
     */
    model?: string;
    /**
     * The HTTP status returned by the provider.
     */
    status?: number;
    /**
     * The provider-specific error code.
     */
    code?: string;
    /**
     * The provider request id, useful when contacting provider support.
     */
    requestId?: string;
    /**
     * Whether retrying the same request may succeed.
     */
    retryable: boolean;
    /**
     * The delay suggested by the provider before retrying, in milliseconds.
     */
    retryAfterMs?: number;
};
/**
 * Normalized details of a failed AI request.
 *
 * Attached as `data` to the AI SDK `APICallError` of a failed request, for
 * both `/ai/completion` and `/ai/stream`. Use {@link getAIError} to read it
 * from an unknown error.
 * @category AI
 */
export type AIError = {
    /**
     * The kind of failure.
     */
    kind: AIErrorKind;
    /**
     * The failure message.
     */
    message: string;
    /**
     * The HTTP status of the failure: the provider status when the provider
     * reported one, otherwise the Caido backend response status.
     */
    status?: number;
    /**
     * The provider-specific error code, when the provider reported one.
     */
    code?: string;
    /**
     * Whether retrying the same request may succeed.
     */
    retryable?: boolean;
    /**
     * The delay suggested by the provider before retrying, in milliseconds.
     */
    retryAfterMs?: number;
    /**
     * The upstream provider failure, present when `kind` is `provider`.
     */
    providerError?: AIProviderError;
};
/**
 * Reads the normalized {@link AIError} of a failed AI request.
 *
 * Accepts the error thrown by `generateText` or passed to the `onError`
 * callback / `error` stream part of `streamText`: an AI SDK `APICallError`, or
 * the `RetryError` wrapping it once retries are exhausted, in which case the
 * last attempt's error is read.
 *
 * Failures that never reached the Caido backend (for example a network
 * error) carry no `data`, so this returns `undefined` for them.
 * @category AI
 */
export declare const getAIError: (error: unknown) => AIError | undefined;
/**
 * A capability an upstream model is known to support.
 * @category AI
 */
export type AIUpstreamModelCapability = "TOOL_CALLING" | "REASONING" | "STRUCTURED_OUTPUT" | "TEMPERATURE";
/**
 * Tri-state capability knowledge for an upstream model.
 *
 * Caido is permissive: `UNKNOWN` capabilities are still sent to the provider,
 * only `UNSUPPORTED` ones are constrained.
 * @category AI
 */
export type AIUpstreamModelCapabilitySupport = "SUPPORTED" | "UNSUPPORTED" | "UNKNOWN";
/**
 * A reasoning effort accepted by an upstream model, from least to most.
 * @category AI
 */
export type AIUpstreamModelReasoningEffort = "minimal" | "low" | "medium" | "high" | "xhigh" | "max";
/**
 * Where an upstream model comes from.
 *
 * - `CATALOG`: from Caido's model catalog.
 * - `CUSTOM`: user-defined in Settings → AI → Models, replacing the catalog
 *   model of the same id.
 * @category AI
 */
export type AIUpstreamModelSource = "CATALOG" | "CUSTOM";
/**
 * A model available on a configured upstream AI provider, as managed in
 * Settings → AI → Models.
 * @category AI
 */
export type AIUpstreamModel = {
    /**
     * The model name without the provider prefix. May itself contain `/`, for
     * example OpenRouter ids such as `anthropic/claude-sonnet-4.6`.
     */
    id: string;
    /** The alias of the provider serving this model; matches {@link AIUpstreamProvider.id}. */
    providerId: AIUpstreamProviderId;
    /** Ready-made id for {@link AIProvider.languageModel}: `` `${providerId}/${id}` ``. */
    modelId: AIModelId;
    displayName: string;
    /**
     * The capabilities known to be supported.
     *
     * Absence means unsupported OR unknown; check {@link support} to tell the
     * two apart.
     */
    capabilities: AIUpstreamModelCapability[];
    /** Tri-state knowledge for every capability. */
    support: {
        toolCalling: AIUpstreamModelCapabilitySupport;
        reasoning: AIUpstreamModelCapabilitySupport;
        structuredOutput: AIUpstreamModelCapabilitySupport;
        temperature: AIUpstreamModelCapabilitySupport;
    };
    /** The accepted reasoning efforts. Empty when the model declares no constraint. */
    reasoningEfforts: AIUpstreamModelReasoningEffort[];
    /** The context window in tokens, when known. */
    contextWindow?: number;
    /** The maximum output tokens, when known. */
    outputTokenLimit?: number;
    source: AIUpstreamModelSource;
};
/**
 * Options for {@link AiSDK.getUpstreamModels}.
 * @category AI
 */
export type AIGetUpstreamModelsOptions = {
    /**
     * Only return models of this provider (the provider alias, see
     * {@link AIUpstreamProvider.id}).
     */
    providerId?: AIUpstreamProviderId;
};
/**
 * Builds an {@link AIModelId} from a provider alias and a model name.
 * @category AI
 */
export declare const createAIModelId: (providerId: AIUpstreamProviderId, modelId: string) => AIModelId;
