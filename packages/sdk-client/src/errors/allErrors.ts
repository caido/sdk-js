import type {
  AliasTakenUserErrorFullFragment,
  CloudUserErrorFullFragment,
  InvalidGlobTermsUserErrorFullFragment,
  NameTakenUserErrorFullFragment,
  NewerVersionUserErrorFullFragment,
  OtherUserErrorFullFragment,
  PermissionDeniedUserErrorFullFragment,
  ProjectUserErrorFullFragment,
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
  | CloudUserErrorFullFragment;
