import type * as Types from "./types.js";

import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type InstanceAiProviderAnthropicFullFragment = { apiKey: string };

export type InstanceAiProviderGoogleFullFragment = { apiKey: string };

export type InstanceAiProviderOpenAiFullFragment = {
  apiKey: string;
  url?: string | undefined | null;
};

export type InstanceAiProviderOpenRouterFullFragment = { apiKey: string };

export type InstanceSettingsFullFragment = {
  aiProviders: {
    anthropic?: { apiKey: string } | undefined | null;
    google?: { apiKey: string } | undefined | null;
    openai?:
      | { apiKey: string; url?: string | undefined | null }
      | undefined
      | null;
    openrouter?: { apiKey: string } | undefined | null;
  };
  analytic: { enabled: boolean; cloud: boolean; local: boolean };
  onboarding: { analytic: boolean };
};

export type InstanceSettingsQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type InstanceSettingsQuery = {
  instanceSettings: {
    aiProviders: {
      anthropic?: { apiKey: string } | undefined | null;
      google?: { apiKey: string } | undefined | null;
      openai?:
        | { apiKey: string; url?: string | undefined | null }
        | undefined
        | null;
      openrouter?: { apiKey: string } | undefined | null;
    };
    analytic: { enabled: boolean; cloud: boolean; local: boolean };
    onboarding: { analytic: boolean };
  };
};

export type SetInstanceSettingsMutationVariables = Types.Exact<{
  input: Types.SetInstanceSettingsInput;
}>;

export type SetInstanceSettingsMutation = {
  setInstanceSettings: {
    settings: {
      aiProviders: {
        anthropic?: { apiKey: string } | undefined | null;
        google?: { apiKey: string } | undefined | null;
        openai?:
          | { apiKey: string; url?: string | undefined | null }
          | undefined
          | null;
        openrouter?: { apiKey: string } | undefined | null;
      };
      analytic: { enabled: boolean; cloud: boolean; local: boolean };
      onboarding: { analytic: boolean };
    };
  };
};

export const InstanceAiProviderAnthropicFullFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "InstanceAIProviderAnthropicFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "AIProviderAnthropic" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "apiKey" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<InstanceAiProviderAnthropicFullFragment, unknown>;
export const InstanceAiProviderGoogleFullFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "InstanceAIProviderGoogleFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "AIProviderGoogle" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "apiKey" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<InstanceAiProviderGoogleFullFragment, unknown>;
export const InstanceAiProviderOpenAiFullFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "InstanceAIProviderOpenAIFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "AIProviderOpenAI" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "apiKey" } },
          { kind: "Field", name: { kind: "Name", value: "url" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<InstanceAiProviderOpenAiFullFragment, unknown>;
export const InstanceAiProviderOpenRouterFullFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "InstanceAIProviderOpenRouterFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "AIProviderOpenRouter" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "apiKey" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<InstanceAiProviderOpenRouterFullFragment, unknown>;
export const InstanceSettingsFullFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "InstanceSettingsFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "InstanceSettings" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "aiProviders" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "anthropic" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "InstanceAIProviderAnthropicFull",
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "google" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "InstanceAIProviderGoogleFull",
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "openai" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "InstanceAIProviderOpenAIFull",
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "openrouter" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "InstanceAIProviderOpenRouterFull",
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "analytic" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "enabled" } },
                { kind: "Field", name: { kind: "Name", value: "cloud" } },
                { kind: "Field", name: { kind: "Name", value: "local" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "onboarding" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "analytic" } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "InstanceAIProviderAnthropicFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "AIProviderAnthropic" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "apiKey" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "InstanceAIProviderGoogleFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "AIProviderGoogle" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "apiKey" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "InstanceAIProviderOpenAIFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "AIProviderOpenAI" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "apiKey" } },
          { kind: "Field", name: { kind: "Name", value: "url" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "InstanceAIProviderOpenRouterFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "AIProviderOpenRouter" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "apiKey" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<InstanceSettingsFullFragment, unknown>;
export const InstanceSettingsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "InstanceSettings" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "instanceSettings" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "InstanceSettingsFull" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "InstanceAIProviderAnthropicFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "AIProviderAnthropic" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "apiKey" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "InstanceAIProviderGoogleFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "AIProviderGoogle" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "apiKey" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "InstanceAIProviderOpenAIFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "AIProviderOpenAI" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "apiKey" } },
          { kind: "Field", name: { kind: "Name", value: "url" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "InstanceAIProviderOpenRouterFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "AIProviderOpenRouter" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "apiKey" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "InstanceSettingsFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "InstanceSettings" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "aiProviders" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "anthropic" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "InstanceAIProviderAnthropicFull",
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "google" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "InstanceAIProviderGoogleFull",
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "openai" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "InstanceAIProviderOpenAIFull",
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "openrouter" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "InstanceAIProviderOpenRouterFull",
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "analytic" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "enabled" } },
                { kind: "Field", name: { kind: "Name", value: "cloud" } },
                { kind: "Field", name: { kind: "Name", value: "local" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "onboarding" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "analytic" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  InstanceSettingsQuery,
  InstanceSettingsQueryVariables
>;
export const SetInstanceSettingsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SetInstanceSettings" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "SetInstanceSettingsInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "setInstanceSettings" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "settings" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "InstanceSettingsFull" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "InstanceAIProviderAnthropicFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "AIProviderAnthropic" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "apiKey" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "InstanceAIProviderGoogleFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "AIProviderGoogle" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "apiKey" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "InstanceAIProviderOpenAIFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "AIProviderOpenAI" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "apiKey" } },
          { kind: "Field", name: { kind: "Name", value: "url" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "InstanceAIProviderOpenRouterFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "AIProviderOpenRouter" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "apiKey" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "InstanceSettingsFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "InstanceSettings" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "aiProviders" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "anthropic" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "InstanceAIProviderAnthropicFull",
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "google" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "InstanceAIProviderGoogleFull",
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "openai" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "InstanceAIProviderOpenAIFull",
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "openrouter" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "InstanceAIProviderOpenRouterFull",
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "analytic" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "enabled" } },
                { kind: "Field", name: { kind: "Name", value: "cloud" } },
                { kind: "Field", name: { kind: "Name", value: "local" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "onboarding" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "analytic" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SetInstanceSettingsMutation,
  SetInstanceSettingsMutationVariables
>;
