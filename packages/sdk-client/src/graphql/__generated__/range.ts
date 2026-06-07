import type * as Types from "./types.js";

import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type RangeFullFragment = { start: number; end: number };

export const RangeFullFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RangeFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Range" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "start" } },
          { kind: "Field", name: { kind: "Name", value: "end" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RangeFullFragment, unknown>;
