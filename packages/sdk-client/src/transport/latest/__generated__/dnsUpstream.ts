import type * as Types from "./types.js";

import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type DnsUpstreamFullFragment = {
  id: string;
  ip: string;
  name: string;
};

export type DnsUpstreamsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type DnsUpstreamsQuery = {
  dnsUpstreams: Array<{
    id: string;
    ip: string;
    name: string;
  }>;
};

export type CreateDnsUpstreamMutationVariables = Types.Exact<{
  input: Types.CreateDnsUpstreamInput;
}>;

export type CreateDnsUpstreamMutation = {
  createDnsUpstream: {
    upstream: DnsUpstreamFullFragment;
  };
};

export const DnsUpstreamFullFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "DnsUpstreamFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "DNSUpstream" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "ip" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DnsUpstreamFullFragment, unknown>;
export const DnsUpstreamsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "DnsUpstreams" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "dnsUpstreams" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "DnsUpstreamFull" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "DnsUpstreamFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "DNSUpstream" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "ip" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DnsUpstreamsQuery, DnsUpstreamsQueryVariables>;
export const CreateDnsUpstreamDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateDnsUpstream" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateDNSUpstreamInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createDnsUpstream" },
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
                  name: { kind: "Name", value: "upstream" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "DnsUpstreamFull" },
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
      name: { kind: "Name", value: "DnsUpstreamFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "DNSUpstream" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "ip" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateDnsUpstreamMutation,
  CreateDnsUpstreamMutationVariables
>;
