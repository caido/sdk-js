import type * as Types from "./types.js";

import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type BackupFullFragment = {
  id: string;
  name: string;
  createdAt: string;
  status: Types.BackupStatus;
};

export type BackupsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type BackupsQuery = {
  backups: Array<{
    id: string;
    name: string;
    createdAt: string;
    status: Types.BackupStatus;
  }>;
};

export const BackupFullFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "BackupFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Backup" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "status" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<BackupFullFragment, unknown>;
export const BackupsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Backups" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "backups" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "BackupFull" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "BackupFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Backup" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "status" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<BackupsQuery, BackupsQueryVariables>;
