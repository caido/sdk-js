import { mapToAutomateSession } from "@/convert/automateSession.js";
import {
  AutomateSessionDocument,
  AutomateSessionsDocument,
  CreateAutomateSessionDocument,
  DeleteAutomateSessionDocument,
  type GraphQLClient,
  RenameAutomateSessionDocument,
} from "@/graphql/index.js";
import type {
  AutomateSession,
  CreateAutomateSessionOptions,
  ID,
  RenameAutomateSessionOptions,
} from "@/types/index.js";

/**
 * Higher-level SDK for automate session-related operations.
 */
export class AutomateSessionSDK {
  private readonly graphql: GraphQLClient;

  constructor(graphql: GraphQLClient) {
    this.graphql = graphql;
  }

  /**
   * List all automate sessions.
   */
  async list(): Promise<AutomateSession[]> {
    const result = await this.graphql.query(AutomateSessionsDocument);
    return result.automateSessions.nodes.map(mapToAutomateSession);
  }

  /**
   * Get an automate session by ID.
   */
  async get(id: ID): Promise<AutomateSession | undefined> {
    const result = await this.graphql.query(AutomateSessionDocument, {
      id: id as string,
    });

    if (!result.automateSession) {
      return undefined;
    }

    return mapToAutomateSession(result.automateSession);
  }

  /**
   * Create a new automate session.
   */
  async create(
    options: CreateAutomateSessionOptions,
  ): Promise<AutomateSession> {
    const result = await this.graphql.mutation(CreateAutomateSessionDocument, {
      input: {
        requestSource: options.requestSource
          ? {
              id: options.requestSource.id as string,
            }
          : undefined,
      },
    });

    const payload = result.createAutomateSession;

    if (!payload.session) {
      throw new Error("Create automate session returned no session");
    }

    return mapToAutomateSession(payload.session);
  }

  /**
   * Delete an automate session by ID.
   */
  async delete(id: ID): Promise<void> {
    await this.graphql.mutation(DeleteAutomateSessionDocument, {
      id: id as string,
    });
  }

  /**
   * Rename an automate session.
   */
  async rename(
    id: ID,
    options: RenameAutomateSessionOptions,
  ): Promise<AutomateSession> {
    const result = await this.graphql.mutation(RenameAutomateSessionDocument, {
      id: id as string,
      name: options.name,
    });

    const payload = result.renameAutomateSession;

    if (!payload.session) {
      throw new Error("Rename automate session returned no session");
    }

    return mapToAutomateSession(payload.session);
  }
}
