import type {
  AliasTakenUserErrorFullFragment,
  CertificateUserErrorFullFragment,
  CloudUserErrorFullFragment,
  InvalidGlobTermsUserErrorFullFragment,
  NameTakenUserErrorFullFragment,
  NewerVersionUserErrorFullFragment,
  OtherUserErrorFullFragment,
  PermissionDeniedUserErrorFullFragment,
  PluginUserErrorFullFragment,
  ProjectUserErrorFullFragment,
  RankUserErrorFullFragment,
  ReadOnlyUserErrorFullFragment,
  StoreUserErrorFullFragment,
  TaskInProgressUserErrorFullFragment,
  UnknownIdUserErrorFullFragment,
  WorkflowUserErrorFullFragment,
} from "@/graphql/index.js";

export type AllErrors =
  | UnknownIdUserErrorFullFragment
  | AliasTakenUserErrorFullFragment
  | CertificateUserErrorFullFragment
  | InvalidGlobTermsUserErrorFullFragment
  | PermissionDeniedUserErrorFullFragment
  | NameTakenUserErrorFullFragment
  | ProjectUserErrorFullFragment
  | ReadOnlyUserErrorFullFragment
  | OtherUserErrorFullFragment
  | NewerVersionUserErrorFullFragment
  | CloudUserErrorFullFragment
  | PluginUserErrorFullFragment
  | StoreUserErrorFullFragment
  | RankUserErrorFullFragment
  | TaskInProgressUserErrorFullFragment
  | WorkflowUserErrorFullFragment;
