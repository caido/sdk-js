import { mapToBackup } from "@/convert/backup.js";
import {
  BackupDocument,
  BackupsDocument,
  type GraphQLClient,
} from "@/graphql/index.js";
import type { Backup, ID } from "@/types/index.js";

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

  /**
   * Get a backup by ID.
   */
  async get(id: ID): Promise<Backup | undefined> {
    const result = await this.graphql.query(BackupDocument, {
      id: id as string,
    });

    if (!result.backup) {
      return undefined;
    }

    return mapToBackup(result.backup);
  }
}
