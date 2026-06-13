import { mapToBackup } from "@/convert/backup.js";
import { BackupsDocument, type GraphQLClient } from "@/graphql/index.js";
import type { Backup } from "@/types/index.js";

/**
 * Higher-level SDK for backup-related operations.
 */
export class BackupSDK {
  private readonly graphql: GraphQLClient;

  constructor(graphql: GraphQLClient) {
    this.graphql = graphql;
  }

  /**
   * List all backups.
   */
  async list(): Promise<Backup[]> {
    const result = await this.graphql.query(BackupsDocument);
    return result.backups.map(mapToBackup);
  }
}
