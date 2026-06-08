/**
 * Bundled GraphQL transport forks shipped in the SDK.
 */
export const TransportVersion = {
  V0_56: "0.56.0",
  V0_57: "0.57.0",
} as const;

export type TransportVersion =
  (typeof TransportVersion)[keyof typeof TransportVersion];

/**
 * Wraps transport wire data with the bundled schema fork that produced it.
 */
export type Versioned<T> = {
  readonly version: TransportVersion;
  readonly data: T;
};

/**
 * Discriminated union when each transport fork has a different data shape.
 */
export type VersionedOf<M extends Partial<Record<TransportVersion, unknown>>> =
  {
    [K in TransportVersion & keyof M]: {
      readonly version: K;
      readonly data: M[K];
    };
  }[TransportVersion & keyof M];

export const versioned = <V extends TransportVersion, T>(
  version: V,
  data: T,
): { readonly version: V; readonly data: T } => ({
  version,
  data,
});
