import type * as Types from "./types.js";

import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type DnsRewriteFullFragment = {
  id: string;
  allowlist: Array<string>;
  denylist: Array<string>;
  enabled: boolean;
  rank: string;
  resolution:
    | { __typename: "DNSIpResolver"; ip: string }
    | { __typename: "DNSUpstreamResolver"; id: string };
};

export type CreateDnsRewriteMutationVariables = Types.Exact<{
  input: Types.CreateDnsRewriteInput;
}>;

export type CreateDnsRewriteMutation = {
  createDnsRewrite: {
    error?:
      | { __typename: "OtherUserError"; code: string }
      | { __typename: "UnknownIdUserError"; id: string; code: string }
      | undefined
      | null;
    rewrite?:
      | {
          id: string;
          allowlist: Array<string>;
          denylist: Array<string>;
          enabled: boolean;
          rank: string;
          resolution:
            | { __typename: "DNSIpResolver"; ip: string }
            | { __typename: "DNSUpstreamResolver"; id: string };
        }
      | undefined
      | null;
  };
};

export const DnsRewriteFullFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "DnsRewriteFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "DNSRewrite" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "allowlist" } },
          { kind: "Field", name: { kind: "Name", value: "denylist" } },
          { kind: "Field", name: { kind: "Name", value: "enabled" } },
          { kind: "Field", name: { kind: "Name", value: "rank" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "resolution" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "DNSIpResolver" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "ip" } },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "DNSUpstreamResolver" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
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
} as unknown as DocumentNode<DnsRewriteFullFragment, unknown>;
export const CreateDnsRewriteDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateDnsRewrite" },
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
              name: { kind: "Name", value: "CreateDNSRewriteInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createDnsRewrite" },
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
                  name: { kind: "Name", value: "error" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
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
                              name: {
                                kind: "Name",
                                value: "OtherUserErrorFull",
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "UnknownIdUserError" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: {
                                kind: "Name",
                                value: "UnknownIdUserErrorFull",
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
                  name: { kind: "Name", value: "rewrite" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "DnsRewriteFull" },
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
      name: { kind: "Name", value: "UnknownIdUserErrorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "UnknownIdUserError" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "UserErrorFull" },
          },
          { kind: "Field", name: { kind: "Name", value: "id" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "DnsRewriteFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "DNSRewrite" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "allowlist" } },
          { kind: "Field", name: { kind: "Name", value: "denylist" } },
          { kind: "Field", name: { kind: "Name", value: "enabled" } },
          { kind: "Field", name: { kind: "Name", value: "rank" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "resolution" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "DNSIpResolver" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "ip" } },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "DNSUpstreamResolver" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
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
  CreateDnsRewriteMutation,
  CreateDnsRewriteMutationVariables
>;
