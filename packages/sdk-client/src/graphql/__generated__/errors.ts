import type * as Types from "./types.js";

import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type UserErrorFull_AiUserError_Fragment = {
  __typename: "AIUserError";
  code: string;
};

export type UserErrorFull_AliasTakenUserError_Fragment = {
  __typename: "AliasTakenUserError";
  code: string;
};

export type UserErrorFull_AssistantUserError_Fragment = {
  __typename: "AssistantUserError";
  code: string;
};

export type UserErrorFull_AuthenticationUserError_Fragment = {
  __typename: "AuthenticationUserError";
  code: string;
};

export type UserErrorFull_AuthorizationUserError_Fragment = {
  __typename: "AuthorizationUserError";
  code: string;
};

export type UserErrorFull_AutomateTaskUserError_Fragment = {
  __typename: "AutomateTaskUserError";
  code: string;
};

export type UserErrorFull_BackupUserError_Fragment = {
  __typename: "BackupUserError";
  code: string;
};

export type UserErrorFull_CertificateUserError_Fragment = {
  __typename: "CertificateUserError";
  code: string;
};

export type UserErrorFull_CloudUserError_Fragment = {
  __typename: "CloudUserError";
  code: string;
};

export type UserErrorFull_InternalUserError_Fragment = {
  __typename: "InternalUserError";
  code: string;
};

export type UserErrorFull_InvalidGlobTermsUserError_Fragment = {
  __typename: "InvalidGlobTermsUserError";
  code: string;
};

export type UserErrorFull_InvalidHttpqlUserError_Fragment = {
  __typename: "InvalidHTTPQLUserError";
  code: string;
};

export type UserErrorFull_InvalidRegexUserError_Fragment = {
  __typename: "InvalidRegexUserError";
  code: string;
};

export type UserErrorFull_NameTakenUserError_Fragment = {
  __typename: "NameTakenUserError";
  code: string;
};

export type UserErrorFull_NewerVersionUserError_Fragment = {
  __typename: "NewerVersionUserError";
  code: string;
};

export type UserErrorFull_OtherUserError_Fragment = {
  __typename: "OtherUserError";
  code: string;
};

export type UserErrorFull_PermissionDeniedUserError_Fragment = {
  __typename: "PermissionDeniedUserError";
  code: string;
};

export type UserErrorFull_PluginUserError_Fragment = {
  __typename: "PluginUserError";
  code: string;
};

export type UserErrorFull_ProjectUserError_Fragment = {
  __typename: "ProjectUserError";
  code: string;
};

export type UserErrorFull_RankUserError_Fragment = {
  __typename: "RankUserError";
  code: string;
};

export type UserErrorFull_ReadOnlyUserError_Fragment = {
  __typename: "ReadOnlyUserError";
  code: string;
};

export type UserErrorFull_RenderFailedUserError_Fragment = {
  __typename: "RenderFailedUserError";
  code: string;
};

export type UserErrorFull_StoreUserError_Fragment = {
  __typename: "StoreUserError";
  code: string;
};

export type UserErrorFull_TaskInProgressUserError_Fragment = {
  __typename: "TaskInProgressUserError";
  code: string;
};

export type UserErrorFull_UnknownIdUserError_Fragment = {
  __typename: "UnknownIdUserError";
  code: string;
};

export type UserErrorFull_UnsupportedPlatformUserError_Fragment = {
  __typename: "UnsupportedPlatformUserError";
  code: string;
};

export type UserErrorFull_WorkflowUserError_Fragment = {
  __typename: "WorkflowUserError";
  code: string;
};

export type UserErrorFullFragment =
  | UserErrorFull_AiUserError_Fragment
  | UserErrorFull_AliasTakenUserError_Fragment
  | UserErrorFull_AssistantUserError_Fragment
  | UserErrorFull_AuthenticationUserError_Fragment
  | UserErrorFull_AuthorizationUserError_Fragment
  | UserErrorFull_AutomateTaskUserError_Fragment
  | UserErrorFull_BackupUserError_Fragment
  | UserErrorFull_CertificateUserError_Fragment
  | UserErrorFull_CloudUserError_Fragment
  | UserErrorFull_InternalUserError_Fragment
  | UserErrorFull_InvalidGlobTermsUserError_Fragment
  | UserErrorFull_InvalidHttpqlUserError_Fragment
  | UserErrorFull_InvalidRegexUserError_Fragment
  | UserErrorFull_NameTakenUserError_Fragment
  | UserErrorFull_NewerVersionUserError_Fragment
  | UserErrorFull_OtherUserError_Fragment
  | UserErrorFull_PermissionDeniedUserError_Fragment
  | UserErrorFull_PluginUserError_Fragment
  | UserErrorFull_ProjectUserError_Fragment
  | UserErrorFull_RankUserError_Fragment
  | UserErrorFull_ReadOnlyUserError_Fragment
  | UserErrorFull_RenderFailedUserError_Fragment
  | UserErrorFull_StoreUserError_Fragment
  | UserErrorFull_TaskInProgressUserError_Fragment
  | UserErrorFull_UnknownIdUserError_Fragment
  | UserErrorFull_UnsupportedPlatformUserError_Fragment
  | UserErrorFull_WorkflowUserError_Fragment;

export type CloudUserErrorFullFragment = {
  __typename: "CloudUserError";
  code: string;
  cloudReason: Types.CloudErrorReason;
};

export type NameTakenUserErrorFullFragment = {
  __typename: "NameTakenUserError";
  name: string;
  code: string;
};

export type UnknownIdUserErrorFullFragment = {
  __typename: "UnknownIdUserError";
  id: string;
  code: string;
};

export type PermissionDeniedUserErrorFullFragment = {
  __typename: "PermissionDeniedUserError";
  code: string;
  permissionReason: Types.PermissionDeniedErrorReason;
};

export type ProjectUserErrorFullFragment = {
  __typename: "ProjectUserError";
  code: string;
  projectReason: Types.ProjectErrorReason;
};

export type OtherUserErrorFullFragment = {
  __typename: "OtherUserError";
  code: string;
};

export type InvalidGlobTermsUserErrorFullFragment = {
  __typename: "InvalidGlobTermsUserError";
  terms: Array<string>;
  code: string;
};

export type AliasTakenUserErrorFullFragment = {
  __typename: "AliasTakenUserError";
  alias: string;
  code: string;
};

export type NewerVersionUserErrorFullFragment = {
  __typename: "NewerVersionUserError";
  version: number;
  code: string;
};

export const UserErrorFullFragmentDoc = {
  kind: "Document",
  definitions: [
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
  ],
} as unknown as DocumentNode<UserErrorFullFragment, unknown>;
export const CloudUserErrorFullFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "CloudUserErrorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "CloudUserError" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "UserErrorFull" },
          },
          {
            kind: "Field",
            alias: { kind: "Name", value: "cloudReason" },
            name: { kind: "Name", value: "reason" },
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
  ],
} as unknown as DocumentNode<CloudUserErrorFullFragment, unknown>;
export const NameTakenUserErrorFullFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "NameTakenUserErrorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "NameTakenUserError" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "UserErrorFull" },
          },
          { kind: "Field", name: { kind: "Name", value: "name" } },
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
  ],
} as unknown as DocumentNode<NameTakenUserErrorFullFragment, unknown>;
export const UnknownIdUserErrorFullFragmentDoc = {
  kind: "Document",
  definitions: [
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
  ],
} as unknown as DocumentNode<UnknownIdUserErrorFullFragment, unknown>;
export const PermissionDeniedUserErrorFullFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "PermissionDeniedUserErrorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "PermissionDeniedUserError" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "UserErrorFull" },
          },
          {
            kind: "Field",
            alias: { kind: "Name", value: "permissionReason" },
            name: { kind: "Name", value: "reason" },
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
  ],
} as unknown as DocumentNode<PermissionDeniedUserErrorFullFragment, unknown>;
export const ProjectUserErrorFullFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ProjectUserErrorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ProjectUserError" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "UserErrorFull" },
          },
          {
            kind: "Field",
            alias: { kind: "Name", value: "projectReason" },
            name: { kind: "Name", value: "reason" },
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
  ],
} as unknown as DocumentNode<ProjectUserErrorFullFragment, unknown>;
export const OtherUserErrorFullFragmentDoc = {
  kind: "Document",
  definitions: [
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
  ],
} as unknown as DocumentNode<OtherUserErrorFullFragment, unknown>;
export const InvalidGlobTermsUserErrorFullFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "InvalidGlobTermsUserErrorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "InvalidGlobTermsUserError" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "UserErrorFull" },
          },
          { kind: "Field", name: { kind: "Name", value: "terms" } },
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
  ],
} as unknown as DocumentNode<InvalidGlobTermsUserErrorFullFragment, unknown>;
export const AliasTakenUserErrorFullFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "AliasTakenUserErrorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "AliasTakenUserError" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "UserErrorFull" },
          },
          { kind: "Field", name: { kind: "Name", value: "alias" } },
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
  ],
} as unknown as DocumentNode<AliasTakenUserErrorFullFragment, unknown>;
export const NewerVersionUserErrorFullFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "NewerVersionUserErrorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "NewerVersionUserError" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "UserErrorFull" },
          },
          { kind: "Field", name: { kind: "Name", value: "version" } },
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
  ],
} as unknown as DocumentNode<NewerVersionUserErrorFullFragment, unknown>;
