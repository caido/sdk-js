/**
 * Provider settings for Anthropic.
 * @category Instance
 */
export type AnthropicAISetting = {
  apiKey: string;
};

/**
 * Provider settings for Google.
 * @category Instance
 */
export type GoogleAISetting = {
  apiKey: string;
};

/**
 * Provider settings for OpenAI.
 * @category Instance
 */
export type OpenAIAISetting = {
  apiKey: string;
  url?: string;
};

/**
 * Provider settings for OpenRouter.
 * @category Instance
 */
export type OpenRouterAISetting = {
  apiKey: string;
};

/**
 * Current AI provider settings.
 * @category Instance
 */
export type AISettings = {
  anthropic?: AnthropicAISetting;
  google?: GoogleAISetting;
  openai?: OpenAIAISetting;
  openrouter?: OpenRouterAISetting;
};

/**
 * Current analytics settings.
 * @category Instance
 */
export type AnalyticsSettings = {
  enabled: boolean;
  cloud: boolean;
  local: boolean;
};

/**
 * Current onboarding settings.
 * @category Instance
 */
export type OnboardingSettings = {
  analytic: boolean;
};

/**
 * Current instance settings.
 * @category Instance
 */
export type InstanceSettings = {
  ai: AISettings;
  analytics: AnalyticsSettings;
  onboarding: OnboardingSettings;
};

/**
 * Input for setting Anthropic AI settings.
 * @category Instance
 */
export type SetAnthropicAISettingInput = string | AnthropicAISetting;

/**
 * Input for setting Google AI settings.
 * @category Instance
 */
export type SetGoogleAISettingInput = string | GoogleAISetting;

/**
 * Input for setting OpenAI settings.
 * @category Instance
 */
export type SetOpenAIAISettingInput = string | OpenAIAISetting;

/**
 * Input for setting OpenRouter settings.
 * @category Instance
 */
export type SetOpenRouterAISettingInput = string | OpenRouterAISetting;

/**
 * Input for setting AI provider settings.
 * Exactly one provider must be provided.
 * @category Instance
 */
export type SetAISettingsInput =
  | {
      anthropic: SetAnthropicAISettingInput;
      google?: never;
      openai?: never;
      openrouter?: never;
    }
  | {
      anthropic?: never;
      google: SetGoogleAISettingInput;
      openai?: never;
      openrouter?: never;
    }
  | {
      anthropic?: never;
      google?: never;
      openai: SetOpenAIAISettingInput;
      openrouter?: never;
    }
  | {
      anthropic?: never;
      google?: never;
      openai?: never;
      openrouter: SetOpenRouterAISettingInput;
    };

/**
 * Input for setting analytics settings.
 * @category Instance
 */
export type SetAnalyticsSettingsInput = {
  enabled: boolean;
};

/**
 * Input for setting onboarding settings.
 * @category Instance
 */
export type SetOnboardingSettingsInput = {
  analytic: boolean;
};

/**
 * Input for setting instance settings.
 * Exactly one setting group must be provided.
 * @category Instance
 */
export type SetInstanceSettingsInput =
  | {
      ai: SetAISettingsInput;
      analytics?: never;
      onboarding?: never;
    }
  | {
      ai?: never;
      analytics: SetAnalyticsSettingsInput;
      onboarding?: never;
    }
  | {
      ai?: never;
      analytics?: never;
      onboarding: SetOnboardingSettingsInput;
    };
