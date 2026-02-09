/**
 * User identity information
 */
export type UserIdentity = {
  email: string;
  name: string;
};

/**
 * Subscription plan information
 */
export type SubscriptionPlan = {
  name: string;
};

/**
 * Subscription entitlement
 */
export type SubscriptionEntitlement = {
  name: string;
};

/**
 * User subscription information
 */
export type UserSubscription = {
  plan: SubscriptionPlan;
  entitlements: Array<SubscriptionEntitlement>;
};

/**
 * User profile information
 */
export type UserProfile = {
  identity: UserIdentity;
  subscription: UserSubscription;
};

/**
 * Cloud user with full profile and subscription information
 */
export type CloudUser = {
  kind: "CloudUser";
  id: string;
  profile: UserProfile;
};

/**
 * Guest user with minimal information
 */
export type GuestUser = {
  kind: "GuestUser";
  id: string;
};

/**
 * Script user with minimal information
 */
export type ScriptUser = {
  kind: "ScriptUser";
  id: string;
};

/**
 * Union type representing all possible user types
 */
export type User = CloudUser | GuestUser | ScriptUser;
