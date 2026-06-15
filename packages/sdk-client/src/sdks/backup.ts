import {
  DeleteBackupDocument,
  type DeleteBackupMutation,
  type GraphQLClient,
} from "@/graphql/index.js";
import type { ID } from "@/types/index.js";
import { handleGraphQLError } from "@/utils/errors.js";
import { isPresent } from "@/utils/optional.js";

/**
 * Higher-level SDK for backup-related operations.
 */
export class BackupSDK {
  private readonly graphql: GraphQLClient;

  constructor(graphql: GraphQLClient) {
    this.graphql = graphql;
  }

  /**
   * Delete a backup by ID.
   */
  async delete(id: ID): Promise<void> {
    const result: DeleteBackupMutation = await this.graphql.mutation(
      DeleteBackupDocument,
      {
        id: id as string,
      },
    );

    const payload = result.deleteBackup;

    if (isPresent(payload.error)) {
      handleGraphQLError(payload.error);
    }
  }
}
