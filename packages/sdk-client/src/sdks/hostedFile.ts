import { mapToHostedFile } from "@/convert/hostedFile.js";
import {
  DeleteHostedFileDocument,
  type GraphQLClient,
  HostedFilesDocument,
  RenameHostedFileDocument,
  UploadHostedFileDocument,
} from "@/graphql/index.js";
import type { HostedFile, ID, UploadHostedFileOptions } from "@/types/index.js";

/**
 * Higher-level SDK for hosted file-related operations.
 */
export class HostedFileSDK {
  private readonly graphql: GraphQLClient;

  constructor(graphql: GraphQLClient) {
    this.graphql = graphql;
  }

  /**
   * List all hosted files.
   */
  async list(): Promise<HostedFile[]> {
    const result = await this.graphql.query(HostedFilesDocument);
    return result.hostedFiles.map(mapToHostedFile);
  }

  /**
   * Upload a new hosted file.
   */
  async upload(options: UploadHostedFileOptions): Promise<HostedFile> {
    const result = await this.graphql.mutation(UploadHostedFileDocument, {
      input: {
        name: options.name,
        file: options.file,
      },
    });

    const hostedFile = result.uploadHostedFile.hostedFile!;
    return mapToHostedFile(hostedFile);
  }

  /**
   * Rename a hosted file.
   */
  async rename(id: ID, name: string): Promise<HostedFile> {
    const result = await this.graphql.mutation(RenameHostedFileDocument, {
      id: id as string,
      name,
    });

    return mapToHostedFile(result.renameHostedFile.hostedFile!);
  }

  /**
   * Delete a hosted file by ID.
   */
  async delete(id: ID): Promise<void> {
    await this.graphql.mutation(DeleteHostedFileDocument, {
      id: id as string,
    });
  }
}
