import { mapToInstanceSettings } from "@/convert/instanceSettings.js";
import type {
  GraphQLClient,
  SetInstanceSettingsInput as GraphQLSetInstanceSettingsInput,
} from "@/graphql/index.js";
import {
  InstanceSettingsDocument,
  SetInstanceSettingsDocument,
} from "@/graphql/index.js";
import type {
  InstanceSettings,
  SetAnalyticsSettingsInput,
  SetInstanceSettingsInput,
  SetOnboardingSettingsInput,
} from "@/types/index.js";

/**
 * SDK for instance settings. AI providers live in `client.instance.ai`.
 */
export class InstanceSettingsSDK {
  constructor(private readonly graphql: GraphQLClient) {}

  /**
   * Get current instance settings.
   */
  async get(): Promise<InstanceSettings> {
    const result = await this.graphql.query(InstanceSettingsDocument);
    return mapToInstanceSettings(result.instanceSettings);
  }

  /**
   * Set an instance setting group.
   * @param input - Exactly one setting group to write.
   */
  async set(input: SetInstanceSettingsInput): Promise<InstanceSettings> {
    if ("analytics" in input && input.analytics !== undefined) {
      return this.setRaw({ analytics: input.analytics });
    }

    if ("onboarding" in input && input.onboarding !== undefined) {
      return this.setRaw({ onboarding: input.onboarding });
    }

    throw new Error("Invalid instance settings input");
  }

  /**
   * Set analytics settings.
   */
  async setAnalytics(
    input: SetAnalyticsSettingsInput,
  ): Promise<InstanceSettings> {
    return this.set({ analytics: input });
  }

  /**
   * Set onboarding settings.
   */
  async setOnboarding(
    input: SetOnboardingSettingsInput,
  ): Promise<InstanceSettings> {
    return this.set({ onboarding: input });
  }

  private async setRaw(
    input: GraphQLSetInstanceSettingsInput,
  ): Promise<InstanceSettings> {
    const result = await this.graphql.mutation(SetInstanceSettingsDocument, {
      input,
    });
    return mapToInstanceSettings(result.setInstanceSettings.settings);
  }
}
