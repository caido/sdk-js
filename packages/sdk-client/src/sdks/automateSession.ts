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
    _options: CreateAutomateSessionOptions,
  ): Promise<AutomateSession> {
    const result = await this.graphql.mutation(CreateAutomateSessionDocument, {
      input: {},
    });

    const session = result.createAutomateSession.session!;
    return mapToAutomateSession(session);
  }

  /**
   * Delete an automate session by ID.
   */
  async delete(id: ID): Promise<void> {
    await this.graphql.mutation(DeleteAutomateSessionDocument, {
      automateSessionId: id as string,
    });
  }

  /**
   * Rename an automate session.
   */
  async rename(id: ID, name: string): Promise<AutomateSession> {
    const result = await this.graphql.mutation(RenameAutomateSessionDocument, {
      automateSessionId: id as string,
      name,
    });

    const session = result.renameAutomateSession.session!;
    return mapToAutomateSession(session);
  }
}
