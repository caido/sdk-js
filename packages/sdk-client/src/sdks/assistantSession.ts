import { mapToAssistantSession } from "@/convert/assistantSession.js";
import type { AllErrors } from "@/errors/allErrors.js";
import type { GraphQLClient } from "@/graphql/index.js";
import { CreateAssistantSessionDocument } from "@/graphql/index.js";
import type {
  AssistantSession,
  CreateAssistantSessionOptions,
} from "@/types/index.js";
import { handleGraphQLError } from "@/utils/errors.js";
import { isAbsent, isPresent } from "@/utils/optional.js";

/**
 * SDK for assistant sessions.
 */
export class AssistantSessionSDK {
  constructor(private readonly graphql: GraphQLClient) {}

  /**
   * Create an assistant session.
   *
   * @param options - The options for the creation.
   * @returns The created assistant session.
   */
  async create(
    options: CreateAssistantSessionOptions,
  ): Promise<AssistantSession> {
    const result = await this.graphql.mutation(CreateAssistantSessionDocument, {
      input: {
        modelId: options.modelId as string,
        systemMessage: options.systemMessage,
      },
    });

    const payload = result.createAssistantSession;
    if (isPresent(payload.error)) {
      handleGraphQLError(payload.error as AllErrors);
    }
    const session = payload.session;
    if (isAbsent(session)) {
      throw new Error("createAssistantSession returned no session");
    }
    return mapToAssistantSession(session);
  }
}
