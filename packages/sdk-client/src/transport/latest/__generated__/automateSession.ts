import type * as Types from "./types.js";

import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type AutomateSessionFullFragment = {
  id: string;
  name: string;
  createdAt: number;
  connection: {
    host: string;
    port: number;
    isTLS: boolean;
    SNI?: string | undefined | null;
  };
  entries: Array<{
    id: string;
    name: string;
    createdAt: number;
    raw: string;
    settings: unknown;
    connection: {
      host: string;
      port: number;
      isTLS: boolean;
      SNI?: string | undefined | null;
    };
  }>;
  settings: unknown;
  raw: string;
};

export type AutomateSessionsQueryVariables = Types.Exact<
  { [key: string]: never }
>;

export type AutomateSessionsQuery = {
  automateSessions: {
    nodes: Array<AutomateSessionFullFragment>;
  };
};

export type AutomateSessionQueryVariables = Types.Exact<{
  id: Types.Scalars["ID"]["input"];
}>;

export type AutomateSessionQuery = {
  automateSession?: AutomateSessionFullFragment | undefined | null;
};

export type CreateAutomateSessionMutationVariables = Types.Exact<{
  input: Types.CreateAutomateSessionInput;
}>;

export type CreateAutomateSessionMutation = {
  createAutomateSession: {
    session?: AutomateSessionFullFragment | undefined | null;
  };
};

export type DeleteAutomateSessionMutationVariables = Types.Exact<{
  automateSessionId: Types.Scalars["ID"]["input"];
}>;

export type DeleteAutomateSessionMutation = {
  deleteAutomateSession: { deletedId?: string | undefined | null };
};

export type RenameAutomateSessionMutationVariables = Types.Exact<{
  automateSessionId: Types.Scalars["ID"]["input"];
  name: string;
}>;

export type RenameAutomateSessionMutation = {
  renameAutomateSession: {
    session?: AutomateSessionFullFragment | undefined | null;
  };
};

export const AutomateSessionsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AutomateSessions" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "automateSessions" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "nodes" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "AutomateSessionFull" },
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
      name: { kind: "Name", value: "AutomateSessionFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "AutomateSession" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "connection" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "host" } },
                { kind: "Field", name: { kind: "Name", value: "port" } },
                { kind: "Field", name: { kind: "Name", value: "isTLS" } },
                { kind: "Field", name: { kind: "Name", value: "SNI" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "raw" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AutomateSessionsQuery, AutomateSessionsQueryVariables>;

export const AutomateSessionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AutomateSession" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "ID" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "automateSession" },
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
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "AutomateSessionFull" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "AutomateSessionFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "AutomateSession" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "connection" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "host" } },
                { kind: "Field", name: { kind: "Name", value: "port" } },
                { kind: "Field", name: { kind: "Name", value: "isTLS" } },
                { kind: "Field", name: { kind: "Name", value: "SNI" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "raw" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AutomateSessionQuery, AutomateSessionQueryVariables>;

export const CreateAutomateSessionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateAutomateSession" },
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
              name: { kind: "Name", value: "CreateAutomateSessionInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createAutomateSession" },
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
                  name: { kind: "Name", value: "session" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "AutomateSessionFull",
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
      name: { kind: "Name", value: "AutomateSessionFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "AutomateSession" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "connection" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "host" } },
                { kind: "Field", name: { kind: "Name", value: "port" } },
                { kind: "Field", name: { kind: "Name", value: "isTLS" } },
                { kind: "Field", name: { kind: "Name", value: "SNI" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "raw" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateAutomateSessionMutation, CreateAutomateSessionMutationVariables>;

export const DeleteAutomateSessionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteAutomateSession" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "automateSessionId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "ID" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteAutomateSession" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "automateSessionId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "automateSessionId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "deletedId" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteAutomateSessionMutation, DeleteAutomateSessionMutationVariables>;

export const RenameAutomateSessionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "RenameAutomateSession" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "automateSessionId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "ID" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "renameAutomateSession" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "automateSessionId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "automateSessionId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "name" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "session" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "AutomateSessionFull",
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
      name: { kind: "Name", value: "AutomateSessionFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "AutomateSession" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "connection" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "host" } },
                { kind: "Field", name: { kind: "Name", value: "port" } },
                { kind: "Field", name: { kind: "Name", value: "isTLS" } },
                { kind: "Field", name: { kind: "Name", value: "SNI" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "raw" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RenameAutomateSessionMutation, RenameAutomateSessionMutationVariables>;
