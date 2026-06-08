import type * as Types from "./types.js";

import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type ConnectionInfoFullFragment = {
  __typename: "ConnectionInfo";
  host: string;
  port: number;
  isTLS: boolean;
  SNI?: string | undefined | null;
};

export const ConnectionInfoFullFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ConnectionInfoFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ConnectionInfo" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "host" } },
          { kind: "Field", name: { kind: "Name", value: "port" } },
          { kind: "Field", name: { kind: "Name", value: "isTLS" } },
          { kind: "Field", name: { kind: "Name", value: "SNI" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ConnectionInfoFullFragment, unknown>;
