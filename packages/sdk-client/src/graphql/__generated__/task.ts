import type * as Types from "./types.js";

import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type TaskMeta_DataExportTask_Fragment = {
  id: string;
  createdAt: string;
};

export type TaskMeta_DeleteStreamWsMessageTask_Fragment = {
  id: string;
  createdAt: string;
};

export type TaskMeta_ReplayTask_Fragment = { id: string; createdAt: string };

export type TaskMeta_WorkflowTask_Fragment = { id: string; createdAt: string };

export type TaskMetaFragment =
  | TaskMeta_DataExportTask_Fragment
  | TaskMeta_DeleteStreamWsMessageTask_Fragment
  | TaskMeta_ReplayTask_Fragment
  | TaskMeta_WorkflowTask_Fragment;

export type TasksQueryVariables = Types.Exact<{ [key: string]: never }>;

export type TasksQuery = {
  tasks: Array<
    | { __typename: "DataExportTask"; id: string; createdAt: string }
    | { __typename: "DeleteStreamWsMessageTask"; id: string; createdAt: string }
    | {
        __typename: "ReplayTask";
        id: string;
        createdAt: string;
        replayEntry: { id: string };
      }
    | { __typename: "WorkflowTask"; id: string; createdAt: string }
  >;
};

export type CancelTaskMutationVariables = Types.Exact<{
  id: Types.Scalars["ID"]["input"];
}>;

export type CancelTaskMutation = {
  cancelTask: { cancelledId?: string | undefined | null };
};

export type FinishedTaskSubscriptionVariables = Types.Exact<{
  [key: string]: never;
}>;

export type FinishedTaskSubscription = {
  finishedTask: {
    status: Types.TaskStatus;
    error?:
      | { __typename: "AIUserError"; code: string }
      | { __typename: "AliasTakenUserError"; code: string }
      | { __typename: "AssistantUserError"; code: string }
      | { __typename: "AuthenticationUserError"; code: string }
      | { __typename: "AuthorizationUserError"; code: string }
      | { __typename: "AutomateTaskUserError"; code: string }
      | { __typename: "BackupUserError"; code: string }
      | { __typename: "CertificateUserError"; code: string }
      | { __typename: "CloudUserError"; code: string }
      | { __typename: "InternalUserError"; code: string }
      | { __typename: "InvalidGlobTermsUserError"; code: string }
      | { __typename: "InvalidHTTPQLUserError"; code: string }
      | { __typename: "InvalidRegexUserError"; code: string }
      | { __typename: "NameTakenUserError"; code: string }
      | { __typename: "NewerVersionUserError"; code: string }
      | { __typename: "OtherUserError"; code: string }
      | { __typename: "PermissionDeniedUserError"; code: string }
      | { __typename: "PluginUserError"; code: string }
      | { __typename: "ProjectUserError"; code: string }
      | { __typename: "RankUserError"; code: string }
      | { __typename: "ReadOnlyUserError"; code: string }
      | { __typename: "RenderFailedUserError"; code: string }
      | { __typename: "StoreUserError"; code: string }
      | { __typename: "TaskInProgressUserError"; code: string }
      | { __typename: "UnknownIdUserError"; code: string }
      | { __typename: "UnsupportedPlatformUserError"; code: string }
      | { __typename: "WorkflowUserError"; code: string }
      | undefined
      | null;
    task:
      | { __typename: "DataExportTask"; id: string }
      | { __typename: "DeleteStreamWsMessageTask"; id: string }
      | { __typename: "ReplayTask"; id: string; replayEntry: { id: string } }
      | { __typename: "WorkflowTask"; id: string };
  };
};

export const TaskMetaFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "TaskMeta" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Task" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TaskMetaFragment, unknown>;
export const TasksDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Tasks" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "tasks" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "TaskMeta" },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "ReplayTask" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "replayEntry" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
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
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "TaskMeta" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Task" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TasksQuery, TasksQueryVariables>;
export const CancelTaskDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CancelTask" },
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
            name: { kind: "Name", value: "cancelTask" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "cancelledId" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CancelTaskMutation, CancelTaskMutationVariables>;
export const FinishedTaskDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "subscription",
      name: { kind: "Name", value: "FinishedTask" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "finishedTask" },
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
                      { kind: "Field", name: { kind: "Name", value: "code" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "status" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "task" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "ReplayTask" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "replayEntry" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
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
      },
    },
  ],
} as unknown as DocumentNode<
  FinishedTaskSubscription,
  FinishedTaskSubscriptionVariables
>;
