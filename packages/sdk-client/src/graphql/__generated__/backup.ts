import type * as Types from "./types.js";

import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

export type BackupFullFragment = {
  id: string;
  name: string;
  status: Types.BackupStatus;
  size: number;
  path: string;
  createdAt: string;
  updatedAt: string;
};

export type BackupsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type BackupsQuery = {
  backups: Array<{
    id: string;
    name: string;
    status: Types.BackupStatus;
    size: number;
    path: string;
    createdAt: string;
    updatedAt: string;
  }>;
};

export type BackupQueryVariables = Types.Exact<{
  id: Types.Scalars["ID"]["input"];
}>;

export type BackupQuery = {
  backup?:
    | {
        id: string;
        name: string;
        status: Types.BackupStatus;
        size: number;
        path: string;
        createdAt: string;
        updatedAt: string;
      }
    | undefined
    | null;
};

export type CreateBackupMutationVariables = Types.Exact<{
  projectId: Types.Scalars["ID"]["input"];
}>;

export type CreateBackupMutation = {
  createBackup: {
    error?:
      | {
          __typename: "TaskInProgressUserError";
          taskId: string;
          code: string;
        }
      | {
          __typename: "OtherUserError";
          code: string;
        }
      | undefined
      | null;
    task: {
      backup: {
        id: string;
        name: string;
        status: Types.BackupStatus;
        size: number;
        path: string;
        createdAt: string;
        updatedAt: string;
      };
    };
  };
};

export const BackupFullFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "BackupFull" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Backup" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "status" } },
          { kind: "Field", name: { kind: "Name", value: "size" } },
          { kind: "Field", name: { kind: "Name", value: "path" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<BackupFullFragment, any>;

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
                { kind: "FragmentSpread", name: { kind: "Name", value: "BackupFull" } },
              ],
            },
          },
        ],
      },
    },
    BackupFullFragmentDoc.definitions[0],
  ],
} as unknown as DocumentNode<BackupsQuery, BackupsQueryVariables>;

export const BackupDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Backup" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "backup" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "id" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "FragmentSpread", name: { kind: "Name", value: "BackupFull" } },
              ],
            },
          },
        ],
      },
    },
    BackupFullFragmentDoc.definitions[0],
  ],
} as unknown as DocumentNode<BackupQuery, BackupQueryVariables>;

export const CreateBackupDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateBackup" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "projectId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createBackup" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "projectId" },
                value: { kind: "Variable", name: { kind: "Name", value: "projectId" } },
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
                          name: { kind: "Name", value: "TaskInProgressUserError" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "taskId" } },
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
                            { kind: "Field", name: { kind: "Name", value: "code" } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "task" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "backup" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "FragmentSpread", name: { kind: "Name", value: "BackupFull" } },
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
    BackupFullFragmentDoc.definitions[0],
  ],
} as unknown as DocumentNode<CreateBackupMutation, CreateBackupMutationVariables>;
