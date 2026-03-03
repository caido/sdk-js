import { decodeBlob } from "@/convert/blob.js";
import { mapToConnectionInfo } from "@/convert/network.js";
import { mapToRequest, mapToResponse } from "@/convert/request.js";
import type {
  GraphQLClient,
  ReplayEntryFullFragment,
  ReplayEntrySettings,
} from "@/graphql/index.js";
import { ReplayEntryDocument } from "@/graphql/index.js";
import type { ConnectionInfo, ID, Request, Response } from "@/types/index.js";
import { isAbsent, isPresent } from "@/utils/optional.js";

/**
 * SDK for replay entries.
 */
export class ReplayEntrySDK {
  constructor(private readonly graphql: GraphQLClient) {}

  /**
   * Get a replay session by ID.
   * @param id - The ID of the replay session to get.
   * @returns The replay session, or undefined if it does not exist.
   */
  async get(id: ID): Promise<ReplayEntry | undefined> {
    const result = await this.graphql.query(ReplayEntryDocument, {
      id: id as string,
      includeReplayRaw: true,
      includeRequestRaw: true,
      includeResponseRaw: true,
    });
    if (isAbsent(result.replayEntry)) {
      return undefined;
    }
    return new ReplayEntry(this.graphql, result.replayEntry);
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
  readonly settings: ReplayEntrySettings;

  private readonly graphql: GraphQLClient;

  constructor(graphql: GraphQLClient, data: ReplayEntryFullFragment) {
    this.graphql = graphql;
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
  }
}
