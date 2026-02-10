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
  StoreUserErrorFullFragment,
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
  | StoreUserErrorFullFragment;
