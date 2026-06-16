import type * as Types from "./types.js";

import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

export type TamperRuleFullFragment = {
  __typename?: "TamperRule";
  id: string;
  name: string;
};

export type TamperRuleCollectionFullFragment = {
  __typename?: "TamperRuleCollection";
  id: string;
  name: string;
  rules: Array<{
    __typename?: "TamperRule";
    id: string;
    name: string;
  }>;
};

export type CreateTamperRuleCollectionMutationVariables = Types.Exact<{
  input: Types.CreateTamperRuleCollectionInput;
}>;

export type CreateTamperRuleCollectionMutation = {
  createTamperRuleCollection: {
    collection?:
      | {
          __typename?: "TamperRuleCollection";
          id: string;
          name: string;
          rules: Array<{
            __typename?: "TamperRule";
            id: string;
            name: string;
          }>;
        }
      | undefined
      | null;
  };
};

export const CreateTamperRuleCollectionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateTamperRuleCollection" },
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
              name: { kind: "Name", value: "CreateTamperRuleCollectionInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createTamperRuleCollection" },
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
                  name: { kind: "Name", value: "collection" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "rules" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
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
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateTamperRuleCollectionMutation,
  CreateTamperRuleCollectionMutationVariables
>;
