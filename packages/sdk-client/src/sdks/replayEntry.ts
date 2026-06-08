import {
  type GraphQLClient,
  ReplayEntryDocument as LatestReplayEntryDocument,
  type ReplayEntryFullFragment as LatestReplayEntryFullFragment,
} from "@/graphql/index.js";
import { decodeBlob } from "@/transport/latest/convert/blob.js";
import { mapToConnectionInfo } from "@/transport/latest/convert/network.js";
import {
  mapToRequest,
  mapToResponse,
} from "@/transport/latest/convert/request.js";
import {
  ReplayEntryDocument as V056ReplayEntryDocument,
  type ReplayEntryFullFragment as V056ReplayEntryFullFragment,
} from "@/transport/v0.56/index.js";
import {
  type ConnectionInfo,
  type ID,
  type Request,
  type Response,
  TransportVersion,
  versioned,
  type VersionedOf,
} from "@/types/index.js";
import { isAbsent, isPresent } from "@/utils/optional.js";
import type { Version } from "@/version.js";

export type ReplayEntryVersionedFragment = VersionedOf<{
  [TransportVersion.V0_57]: LatestReplayEntryFullFragment;
  [TransportVersion.V0_56]: V056ReplayEntryFullFragment;
}>;

/**
 * SDK for replay entries.
 */
export class ReplayEntrySDK {
  constructor(
    private readonly graphql: GraphQLClient,
    private readonly version: Version,
  ) {}

  /**
   * Get a replay entry by ID.
   * @param id - The ID of the replay entry to get.
   * @returns The replay entry, or undefined if it does not exist.
   */
  async get(id: ID): Promise<ReplayEntry | undefined> {
    const includeReplayRaw = true;
    const includeRequestRaw = true;
    const includeResponseRaw = true;

    if (await this.version.gte(TransportVersion.V0_57)) {
      const result = await this.graphql.query(LatestReplayEntryDocument, {
        id: id as string,
        sessionKind: "HTTP",
        includeReplayRaw,
        includeRequestRaw,
        includeResponseRaw,
      });
      if (isAbsent(result.replayEntry)) {
        return undefined;
      }
      return new ReplayEntry(
        this.graphql,
        versioned(TransportVersion.V0_57, result.replayEntry),
      );
    }

    const result = await this.graphql.query(V056ReplayEntryDocument, {
      id: id as string,
      includeReplayRaw,
      includeRequestRaw,
      includeResponseRaw,
    });
    if (isAbsent(result.replayEntry)) {
      return undefined;
    }
    return new ReplayEntry(
      this.graphql,
      versioned(TransportVersion.V0_56, result.replayEntry),
    );
  }
}

/**
 * Replay entry.
 */
export class ReplayEntry {
  readonly id: ID;
  readonly createdAt: Date;
  readonly error: string | undefined;
  readonly raw: Uint8Array | undefined;
  readonly connection: ConnectionInfo;
  readonly request: Request | undefined;
  readonly response: Response | undefined;
  readonly sessionId: ID;
  readonly settings: V056ReplayEntryFullFragment["settings"];

  private readonly graphql: GraphQLClient;

  constructor(graphql: GraphQLClient, fragment: ReplayEntryVersionedFragment) {
    this.graphql = graphql;

    switch (fragment.version) {
      case TransportVersion.V0_57: {
        const data = fragment.data;
        const http = "http" in data ? data.http : data;
        this.id = http.id;
        this.createdAt = new Date(http.createdAt);
        this.error = http.error ?? undefined;
        this.raw = decodeBlob(http.raw);
        this.connection = mapToConnectionInfo(http.connection);
        this.request = isPresent(http.request)
          ? mapToRequest(http.request)
          : undefined;
        this.response = isPresent(http.request?.response)
          ? mapToResponse(http.request.response)
          : undefined;
        this.sessionId = data.session.id;
        this.settings = http.settings;
        break;
      }
      case TransportVersion.V0_56: {
        const data = fragment.data;
        this.id = data.id;
        this.createdAt = new Date(data.createdAt);
        this.error = data.error ?? undefined;
        this.raw = decodeBlob(data.raw);
        this.connection = mapToConnectionInfo(data.connection);
        this.request = isPresent(data.request)
          ? mapToRequest(data.request)
          : undefined;
        this.response = isPresent(data.request?.response)
          ? mapToResponse(data.request.response)
          : undefined;
        this.sessionId = data.session.id;
        this.settings = data.settings;
        break;
      }
    }
  }
}
