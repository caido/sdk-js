import type {
  AliasTakenUserErrorFullFragment,
  CloudUserErrorFullFragment,
  InvalidGlobTermsUserErrorFullFragment,
  NameTakenUserErrorFullFragment,
  NewerVersionUserErrorFullFragment,
  OtherUserErrorFullFragment,
  PermissionDeniedUserErrorFullFragment,
  PluginUserErrorFullFragment,
  ProjectUserErrorFullFragment,
  ReadOnlyUserErrorFullFragment,
  RankUserErrorFullFragment,
  StoreUserErrorFullFragment,
  TaskInProgressUserErrorFullFragment,
  UnknownIdUserErrorFullFragment,
  WorkflowUserErrorFullFragment,
} from "@/graphql/index.js";

export type AllErrors =
  | UnknownIdUserErrorFullFragment
  | AliasTakenUserErrorFullFragment
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
