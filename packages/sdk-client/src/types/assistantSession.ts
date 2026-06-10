import type { ID } from "./index.js";

/**
 * Assistant Session.
 * @category AssistantSession
 */
export type AssistantSession = {
  id: ID;
  modelId: ID;
  name: string;
  updatedAt: Date;
  createdAt: Date;
};

/**
 * Options for creating an assistant session.
 * @category AssistantSession
 */
export type CreateAssistantSessionOptions = {
  /** The model ID for the session. */
  modelId: ID;
  /** Optional system message for the session. */
  systemMessage?: string;
};
