import type { RestClient } from "@/rest/index.js";
import { healthSchema } from "@/types/health.js";
import type { SemverLiteral } from "@/types/semver.js";

/**
 * Readonly handle for the connected Caido instance version.
 *
 * Use `Version.of()` when the version is known upfront (skips `/health`).
 * Otherwise `Client` constructs a lazy instance that fetches on first use.
 */
export class Version {
  private version: SemverLiteral | undefined;
  private readonly rest: RestClient | undefined;
  private resolution: Promise<SemverLiteral> | undefined;

  private constructor(
    version: SemverLiteral | undefined,
    rest: RestClient | undefined,
  ) {
    this.version = version;
    this.rest = rest;
  }

  /**
   * Create a version handle with a known instance semver. No `/health` fetch.
   */
  static of(semver: SemverLiteral): Version {
    return new Version(semver, undefined);
  }

  /** @internal */
  static lazy(rest: RestClient): Version {
    return new Version(undefined, rest);
  }

  /**
   * Returns the instance semver, fetching `/health` lazily when not yet known.
   */
  async get(): Promise<SemverLiteral> {
    if (this.version !== undefined) {
      return this.version;
    }
    if (this.resolution === undefined) {
      this.resolution = this.fetchFromHealth();
    }
    const resolved = await this.resolution;
    this.version = resolved;
    return resolved;
  }

  /**
   * Returns whether the instance version is greater than or equal to `threshold`.
   * Resolves the version lazily when not yet known.
   */
  async gte(threshold: SemverLiteral): Promise<boolean> {
    const current = await this.get();
    const [currentMajor, currentMinor, currentPatch] = current
      .split(".")
      .map(Number) as [number, number, number];
    const [thresholdMajor, thresholdMinor, thresholdPatch] = threshold
      .split(".")
      .map(Number) as [number, number, number];

    if (currentMajor !== thresholdMajor) {
      return currentMajor > thresholdMajor;
    }
    if (currentMinor !== thresholdMinor) {
      return currentMinor > thresholdMinor;
    }
    return currentPatch >= thresholdPatch;
  }

  private async fetchFromHealth(): Promise<SemverLiteral> {
    const rest = this.rest;
    if (rest === undefined) {
      throw new Error("Version handle has no RestClient for lazy resolution");
    }
    const response = await rest.get<unknown>("/health");
    const health = healthSchema.parse(response);
    return health.version as SemverLiteral;
  }
}
