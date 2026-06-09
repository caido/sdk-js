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
