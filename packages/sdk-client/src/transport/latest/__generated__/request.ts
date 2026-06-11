import type * as Types from "./types.js";

import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

export type CreateRequestMutationVariables = Types.Exact<{
  input: Types.CreateRequestInput;
  includeRequestRaw: Types.Scalars["Boolean"]["input"];
  includeResponseRaw: Types.Scalars["Boolean"]["input"];
}>;

export type CreateRequestMutation = {
  createRequest: {
    error?:
      | {
          __typename: "OtherUserError";
          code: string;
        }
      | {
          __typename: "UnknownIdUserError";
          id: string;
          code: string;
        }
      | undefined
      | null;
    request?: {
      id: string;
      host: string;
      port: number;
      method: string;
      path: string;
      query: string;
      isTls: boolean;
      createdAt: string;
      raw?: string;
      metadata: { id: string; color?: string | undefined | null };
      response?:
        | {
            id: string;
            statusCode: number;
            roundtripTime: number;
            length: number;
            createdAt: string;
            raw?: string;
          }
        | undefined
        | null;
    } | undefined | null;
  };
};

export type ResponseFullFragment = {
  id: string;
  statusCode: number;
  roundtripTime: number;
  length: number;
  createdAt: string;
  raw?: string;
};

export type RequestFullFragment = {
  id: string;
  host: string;
  port: number;
  method: string;
  path: string;
  query: string;
  isTls: boolean;
  createdAt: string;
  raw?: string;
  metadata: { id: string; color?: string | undefined | null };
  response?:
    | {
        id: string;
        statusCode: number;
        roundtripTime: number;
        length: number;
        createdAt: string;
        raw?: string;
      }
    | undefined
    | null;
};

export type RequestQueryVariables = Types.Exact<{
  id: Types.Scalars["ID"]["input"];
  includeRequestRaw: Types.Scalars["Boolean"]["input"];
  includeResponseRaw: Types.Scalars["Boolean"]["input"];
}>;

export type RequestQuery = {
  request?:
    | {
        id: string;
        host: string;
        port: number;
        method: string;
        path: string;
        query: string;
        isTls: boolean;
        createdAt: string;
        raw?: string;
        metadata: { id: string; color?: string | undefined | null };
        response?:
          | {
              id: string;
              statusCode: number;
              roundtripTime: number;
              length: number;
              createdAt: string;
              raw?: string;
            }
          | undefined
          | null;
      }
    | undefined
    | null;
};

export type ResponseQueryVariables = Types.Exact<{
  id: Types.Scalars["ID"]["input"];
  includeResponseRaw: Types.Scalars["Boolean"]["input"];
}>;

export type ResponseQuery = {
  response?:
    | {
        id: string;
        statusCode: number;
        roundtripTime: number;
        length: number;
        createdAt: string;
        raw?: string;
      }
    | undefined
    | null;
};

export type RequestsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars["Int"]["input"]>;
  after?: Types.InputMaybe<Types.Scalars["String"]["input"]>;
  last?: Types.InputMaybe<Types.Scalars["Int"]["input"]>;
  before?: Types.InputMaybe<Types.Scalars["String"]["input"]>;
  filter?: Types.InputMaybe<Types.HttpqlInput>;
  order?: Types.InputMaybe<Types.RequestResponseOrderInput>;
  scopeId?: Types.InputMaybe<Types.Scalars["ID"]["input"]>;
  includeRequestRaw: Types.Scalars["Boolean"]["input"];
  includeResponseRaw: Types.Scalars["Boolean"]["input"];
}>;

export type RequestsQuery = {
  requests: {
    edges: Array<{
      cursor: string;
      node: {
        id: string;
        host: string;
        port: number;
        method: string;
        path: string;
        query: string;
        isTls: boolean;
        createdAt: string;
        raw?: string;
        metadata: { id: string; color?: string | undefined | null };
        response?:
          | {
              id: string;
              statusCode: number;
              roundtripTime: number;
              length: number;
              createdAt: string;
              raw?: string;
            }
          | undefined
          | null;
      };
    }>;
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string | undefined | null;
      endCursor?: string | undefined | null;
    };
  };
};

export const ResponseFullFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ResponseFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Response" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "statusCode" } },
          { kind: "Field", name: { kind: "Name", value: "roundtripTime" } },
          { kind: "Field", name: { kind: "Name", value: "length" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "raw" },
            directives: [
              {
                kind: "Directive",
                name: { kind: "Name", value: "include" },
                arguments: [
                  {
                    kind: "Argument",
                    name: { kind: "Name", value: "if" },
                    value: {
                      kind: "Variable",
                      name: { kind: "Name", value: "includeResponseRaw" },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ResponseFullFragment, unknown>;
export const RequestFullFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RequestFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Request" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "host" } },
          { kind: "Field", name: { kind: "Name", value: "port" } },
          { kind: "Field", name: { kind: "Name", value: "method" } },
          { kind: "Field", name: { kind: "Name", value: "path" } },
          { kind: "Field", name: { kind: "Name", value: "query" } },
          { kind: "Field", name: { kind: "Name", value: "isTls" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "metadata" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "color" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "raw" },
            directives: [
              {
                kind: "Directive",
                name: { kind: "Name", value: "include" },
                arguments: [
                  {
                    kind: "Argument",
                    name: { kind: "Name", value: "if" },
                    value: {
                      kind: "Variable",
                      name: { kind: "Name", value: "includeRequestRaw" },
                    },
                  },
                ],
              },
            ],
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "response" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ResponseFull" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ResponseFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Response" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "statusCode" } },
          { kind: "Field", name: { kind: "Name", value: "roundtripTime" } },
          { kind: "Field", name: { kind: "Name", value: "length" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "raw" },
            directives: [
              {
                kind: "Directive",
                name: { kind: "Name", value: "include" },
                arguments: [
                  {
                    kind: "Argument",
                    name: { kind: "Name", value: "if" },
                    value: {
                      kind: "Variable",
                      name: { kind: "Name", value: "includeResponseRaw" },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RequestFullFragment, unknown>;
export const RequestDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Request" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "includeRequestRaw" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Boolean" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "includeResponseRaw" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Boolean" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "request" },
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
                  name: { kind: "Name", value: "RequestFull" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ResponseFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Response" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "statusCode" } },
          { kind: "Field", name: { kind: "Name", value: "roundtripTime" } },
          { kind: "Field", name: { kind: "Name", value: "length" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "raw" },
            directives: [
              {
                kind: "Directive",
                name: { kind: "Name", value: "include" },
                arguments: [
                  {
                    kind: "Argument",
                    name: { kind: "Name", value: "if" },
                    value: {
                      kind: "Variable",
                      name: { kind: "Name", value: "includeResponseRaw" },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RequestFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Request" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "host" } },
          { kind: "Field", name: { kind: "Name", value: "port" } },
          { kind: "Field", name: { kind: "Name", value: "method" } },
          { kind: "Field", name: { kind: "Name", value: "path" } },
          { kind: "Field", name: { kind: "Name", value: "query" } },
          { kind: "Field", name: { kind: "Name", value: "isTls" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "metadata" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "color" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "raw" },
            directives: [
              {
                kind: "Directive",
                name: { kind: "Name", value: "include" },
                arguments: [
                  {
                    kind: "Argument",
                    name: { kind: "Name", value: "if" },
                    value: {
                      kind: "Variable",
                      name: { kind: "Name", value: "includeRequestRaw" },
                    },
                  },
                ],
              },
            ],
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "response" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ResponseFull" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RequestQuery, RequestQueryVariables>;
export const ResponseDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Response" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "includeResponseRaw" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Boolean" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "response" },
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
                  name: { kind: "Name", value: "ResponseFull" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ResponseFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Response" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "statusCode" } },
          { kind: "Field", name: { kind: "Name", value: "roundtripTime" } },
          { kind: "Field", name: { kind: "Name", value: "length" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "raw" },
            directives: [
              {
                kind: "Directive",
                name: { kind: "Name", value: "include" },
                arguments: [
                  {
                    kind: "Argument",
                    name: { kind: "Name", value: "if" },
                    value: {
                      kind: "Variable",
                      name: { kind: "Name", value: "includeResponseRaw" },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ResponseQuery, ResponseQueryVariables>;
export const RequestsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Requests" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "first" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "after" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "last" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "before" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "filter" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "HTTPQLInput" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "order" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "RequestResponseOrderInput" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "scopeId" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "includeRequestRaw" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Boolean" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "includeResponseRaw" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Boolean" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "requests" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "first" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "after" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "after" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "last" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "last" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "before" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "before" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "filter" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "filter" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "order" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "order" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "scopeId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "scopeId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "cursor" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "RequestFull" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "hasNextPage" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "hasPreviousPage" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "startCursor" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "endCursor" },
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
      name: { kind: "Name", value: "ResponseFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Response" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "statusCode" } },
          { kind: "Field", name: { kind: "Name", value: "roundtripTime" } },
          { kind: "Field", name: { kind: "Name", value: "length" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "raw" },
            directives: [
              {
                kind: "Directive",
                name: { kind: "Name", value: "include" },
                arguments: [
                  {
                    kind: "Argument",
                    name: { kind: "Name", value: "if" },
                    value: {
                      kind: "Variable",
                      name: { kind: "Name", value: "includeResponseRaw" },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RequestFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Request" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "host" } },
          { kind: "Field", name: { kind: "Name", value: "port" } },
          { kind: "Field", name: { kind: "Name", value: "method" } },
          { kind: "Field", name: { kind: "Name", value: "path" } },
          { kind: "Field", name: { kind: "Name", value: "query" } },
          { kind: "Field", name: { kind: "Name", value: "isTls" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "metadata" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "color" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "raw" },
            directives: [
              {
                kind: "Directive",
                name: { kind: "Name", value: "include" },
                arguments: [
                  {
                    kind: "Argument",
                    name: { kind: "Name", value: "if" },
                    value: {
                      kind: "Variable",
                      name: { kind: "Name", value: "includeRequestRaw" },
                    },
                  },
                ],
              },
            ],
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "response" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ResponseFull" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RequestsQuery, RequestsQueryVariables>;
export const CreateRequestDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateRequest" },
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
              name: { kind: "Name", value: "CreateRequestInput" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "includeRequestRaw" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Boolean" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "includeResponseRaw" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Boolean" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createRequest" },
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
                          name: {
                            kind: "Name",
                            value: "UnknownIdUserError",
                          },
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
                  name: { kind: "Name", value: "request" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "RequestFull" },
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
      name: { kind: "Name", value: "ResponseFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Response" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "statusCode" } },
          { kind: "Field", name: { kind: "Name", value: "roundtripTime" } },
          { kind: "Field", name: { kind: "Name", value: "length" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "raw" },
            directives: [
              {
                kind: "Directive",
                name: { kind: "Name", value: "include" },
                arguments: [
                  {
                    kind: "Argument",
                    name: { kind: "Name", value: "if" },
                    value: {
                      kind: "Variable",
                      name: { kind: "Name", value: "includeResponseRaw" },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RequestFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Request" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "host" } },
          { kind: "Field", name: { kind: "Name", value: "port" } },
          { kind: "Field", name: { kind: "Name", value: "method" } },
          { kind: "Field", name: { kind: "Name", value: "path" } },
          { kind: "Field", name: { kind: "Name", value: "query" } },
          { kind: "Field", name: { kind: "Name", value: "isTls" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "metadata" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "color" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "raw" },
            directives: [
              {
                kind: "Directive",
                name: { kind: "Name", value: "include" },
                arguments: [
                  {
                    kind: "Argument",
                    name: { kind: "Name", value: "if" },
                    value: {
                      kind: "Variable",
                      name: { kind: "Name", value: "includeRequestRaw" },
                    },
                  },
                ],
              },
            ],
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "response" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ResponseFull" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateRequestMutation, CreateRequestMutationVariables>;
