import { TransportVersion } from "@/types/versioned.js";
import type { Version } from "@/version.js";

/**
 * Which bundled replay transport fork to use for an instance.
 *
 * The replay wire shape changed three times: 0.57 added WebSocket sessions,
 * 0.58 added pipeline sessions as `ReplaySessionHttpOnePipeline`, and 0.59
 * renamed those to `ReplaySessionHttpPipeline`. An inline fragment naming a
 * type the server does not know fails validation outright, so 0.59 and later
 * fall back to the 0.57 documents, which name no pipeline type at all. Their
 * pipeline sessions then arrive as an unknown kind rather than an error.
 */
type ReplayTransport =
  | typeof TransportVersion.V0_56
  | typeof TransportVersion.V0_57
  | typeof TransportVersion.V0_58;

export const resolveReplayTransport = async (
  version: Version,
): Promise<ReplayTransport> => {
  if (await version.gte(TransportVersion.V0_59)) {
    return TransportVersion.V0_57;
  }
  if (await version.gte(TransportVersion.V0_58)) {
    return TransportVersion.V0_58;
  }
  if (await version.gte(TransportVersion.V0_57)) {
    return TransportVersion.V0_57;
  }
  return TransportVersion.V0_56;
};
