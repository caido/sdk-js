import type * as Types from "./types.js";

import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

export type AssistantSessionMetaFragment = {
  id: string;
  modelId: string;
  name: string;
  updatedAt: string;
  createdAt: string;
};

export type CreateAssistantSessionMutationVariables = Types.Exact<{
  input: Types.CreateAssistantSessionInput;
}>;

export type CreateAssistantSessionMutation = {
  createAssistantSession: {
    error?:
      | { __typename: "CloudUserError"; code: string; cloudReason?: string | undefined | null }
      | { __typename: "OtherUserError"; code: string }
      | { __typename: "PermissionDeniedUserError"; code: string; permissionReason?: string | undefined | null }
      | undefined
      | null;
    session?:
      | {
          id: string;
          modelId: string;
          name: string;
          updatedAt: string;
          createdAt: string;
        }
      | undefined
      | null;
  };
};

export const AssistantSessionMetaFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "AssistantSessionMeta" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "AssistantSession" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "modelId" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AssistantSessionMetaFragment, unknown>;

export const CreateAssistantSessionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateAssistantSession" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateAssistantSessionInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createAssistantSession" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "error" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "__typename" } },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "CloudUserError" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "CloudUserErrorFull" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "OtherUserError" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "OtherUserErrorFull" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "PermissionDeniedUserError" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: {
                                kind: "Name",
                                value: "PermissionDeniedUserErrorFull",
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
                  name: { kind: "Name", value: "session" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "AssistantSessionMeta" },
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
      name: { kind: "Name", value: "UserErrorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "UserError" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "code" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "CloudUserErrorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "CloudUserError" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "UserErrorFull" },
          },
          { kind: "Field", name: { kind: "Name", value: "cloudReason" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "OtherUserErrorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "OtherUserError" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "UserErrorFull" },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "PermissionDeniedUserErrorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "PermissionDeniedUserError" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "UserErrorFull" },
          },
          { kind: "Field", name: { kind: "Name", value: "permissionReason" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "AssistantSessionMeta" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "AssistantSession" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "modelId" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateAssistantSessionMutation,
  CreateAssistantSessionMutationVariables
>;
