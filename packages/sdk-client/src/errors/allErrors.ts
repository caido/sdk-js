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
  RankUserErrorFullFragment,
  StoreUserErrorFullFragment,
  TaskInProgressUserErrorFullFragment,
  UnknownIdUserErrorFullFragment,
} from "@/graphql/index.js";

export type AllErrors =
  | UnknownIdUserErrorFullFragment
  | AliasTakenUserErrorFullFragment
  | InvalidGlobTermsUserErrorFullFragment
  | PermissionDeniedUserErrorFullFragment
  | NameTakenUserErrorFullFragment
  | ProjectUserErrorFullFragment
  | OtherUserErrorFullFragment
  | NewerVersionUserErrorFullFragment
  | CloudUserErrorFullFragment
  | PluginUserErrorFullFragment
  | StoreUserErrorFullFragment
  | RankUserErrorFullFragment
  | TaskInProgressUserErrorFullFragment;
