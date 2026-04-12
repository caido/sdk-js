import type * as Types from "./types.js";

import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type TaskMeta_DataExportTask_Fragment = {
  __typename: "DataExportTask";
  id: string;
  createdAt: string;
};

export type TaskMeta_DeleteStreamWsMessageTask_Fragment = {
  __typename: "DeleteStreamWsMessageTask";
  id: string;
  createdAt: string;
};

export type TaskMeta_ReplayTask_Fragment = {
  __typename: "ReplayTask";
  id: string;
  createdAt: string;
};

export type TaskMeta_WorkflowTask_Fragment = {
  __typename: "WorkflowTask";
  id: string;
  createdAt: string;
};

export type TaskMetaFragment =
  | TaskMeta_DataExportTask_Fragment
  | TaskMeta_DeleteStreamWsMessageTask_Fragment
  | TaskMeta_ReplayTask_Fragment
  | TaskMeta_WorkflowTask_Fragment;

export type ReplayTaskMetaFragment = {
  __typename: "ReplayTask";
  id: string;
  createdAt: string;
  replayEntry: { id: string };
};

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
  cancelTask: {
    cancelledId?: string | undefined | null;
    error?:
      | { __typename: "OtherUserError"; code: string }
      | { __typename: "UnknownIdUserError"; id: string; code: string }
      | undefined
      | null;
  };
};

export type FinishedTaskSubscriptionVariables = Types.Exact<{
  [key: string]: never;
}>;

export type FinishedTaskSubscription = {
  finishedTask: {
    status: Types.TaskStatus;
    task:
      | { __typename: "DataExportTask"; id: string; createdAt: string }
      | {
          __typename: "DeleteStreamWsMessageTask";
          id: string;
          createdAt: string;
        }
      | {
          __typename: "ReplayTask";
          id: string;
          createdAt: string;
          replayEntry: { id: string };
        }
      | { __typename: "WorkflowTask"; id: string; createdAt: string };
    error?:
      | { code: string }
      | { code: string }
      | { code: string }
      | { code: string }
      | { code: string }
      | { code: string }
      | { code: string }
      | { code: string }
      | { code: string }
      | { code: string }
      | { code: string }
      | { code: string }
      | { code: string }
      | { code: string }
      | { code: string }
      | { code: string }
      | { code: string }
      | { code: string }
      | { code: string }
      | { code: string }
      | { code: string }
      | { code: string }
      | { code: string }
      | { code: string }
      | { code: string }
      | { code: string }
      | { code: string }
      | undefined
      | null;
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
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TaskMetaFragment, unknown>;
export const ReplayTaskMetaFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayTaskMeta" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayTask" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "FragmentSpread", name: { kind: "Name", value: "TaskMeta" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "replayEntry" },
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
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ReplayTaskMetaFragment, unknown>;
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
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "ReplayTaskMeta" },
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
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayTaskMeta" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayTask" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "FragmentSpread", name: { kind: "Name", value: "TaskMeta" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "replayEntry" },
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
} as unknown as DocumentNode<TasksQuery, TasksQueryVariables>;
export const CancelTaskDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "cancelTask" },
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
                {
                  kind: "Field",
                  name: { kind: "Name", value: "error" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
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
                  name: { kind: "Name", value: "task" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
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
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "ReplayTaskMeta" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "status" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "error" },
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
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayTaskMeta" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayTask" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "FragmentSpread", name: { kind: "Name", value: "TaskMeta" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "replayEntry" },
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
} as unknown as DocumentNode<
  FinishedTaskSubscription,
  FinishedTaskSubscriptionVariables
>;
