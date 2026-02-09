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
    return result.hostedFiles.map((f) => ({
      id: f.id as ID,
      name: f.name,
      path: f.path,
      size: f.size,
      status: f.status,
      createdAt: f.createdAt,
      updatedAt: f.updatedAt,
    }));
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
    return {
      id: hostedFile.id as ID,
      name: hostedFile.name,
      path: hostedFile.path,
      size: hostedFile.size,
      status: hostedFile.status,
      createdAt: hostedFile.createdAt,
      updatedAt: hostedFile.updatedAt,
    };
  }

  /**
   * Rename a hosted file.
   */
  async rename(id: ID, name: string): Promise<HostedFile> {
    const result = await this.graphql.mutation(RenameHostedFileDocument, {
      id: id as string,
      name,
    });

    const hostedFile = result.renameHostedFile.hostedFile!;
    return {
      id: hostedFile.id as ID,
      name: hostedFile.name,
      path: hostedFile.path,
      size: hostedFile.size,
      status: hostedFile.status,
      createdAt: hostedFile.createdAt,
      updatedAt: hostedFile.updatedAt,
    };
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
