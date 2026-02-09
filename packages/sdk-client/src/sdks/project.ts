import {
  CreateProjectDocument,
  DeleteProjectDocument,
  type GraphQLClient,
  ProjectsDocument,
  RenameProjectDocument,
  SelectProjectDocument,
} from "@/graphql/index.js";
import type { CreateProjectOptions, ID, Project } from "@/types/index.js";
import { handleGraphQLError } from "@/utils/errors.js";
import { isPresent } from "@/utils/optional.js";

/**
 * Higher-level SDK for project-related operations.
 */
export class ProjectSDK {
  private readonly graphql: GraphQLClient;

  constructor(graphql: GraphQLClient) {
    this.graphql = graphql;
  }

  /**
   * List all projects.
   */
  async list(): Promise<Project[]> {
    const result = await this.graphql.query(ProjectsDocument);
    return result.projects.map((p) => ({
      id: p.id as ID,
      name: p.name,
      path: p.path,
      status: p.status,
      temporary: p.temporary,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
      version: p.version,
      size: p.size,
      readOnly: p.readOnly,
    }));
  }

  /**
   * Create a new project.
   */
  async create(options: CreateProjectOptions): Promise<Project> {
    const result = await this.graphql.mutation(CreateProjectDocument, {
      input: {
        name: options.name,
        temporary: options.temporary,
      },
    });

    const payload = result.createProject;

    if (isPresent(payload.error)) {
      handleGraphQLError(payload.error);
    }

    const project = payload.project!;
    return {
      id: project.id as ID,
      name: project.name,
      path: project.path,
      status: project.status,
      temporary: project.temporary,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
      version: project.version,
      size: project.size,
      readOnly: project.readOnly,
    };
  }

  /**
   * Delete a project by ID.
   */
  async delete(id: ID): Promise<void> {
    const result = await this.graphql.mutation(DeleteProjectDocument, {
      id: id as string,
    });

    const payload = result.deleteProject;

    if (isPresent(payload.error)) {
      handleGraphQLError(payload.error);
    }
  }

  /**
   * Rename a project.
   */
  async rename(id: ID, name: string): Promise<Project> {
    const result = await this.graphql.mutation(RenameProjectDocument, {
      id: id as string,
      name,
    });

    const payload = result.renameProject;

    if (isPresent(payload.error)) {
      handleGraphQLError(payload.error);
    }

    const project = payload.project!;
    return {
      id: project.id as ID,
      name: project.name,
      path: project.path,
      status: project.status,
      temporary: project.temporary,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
      version: project.version,
      size: project.size,
      readOnly: project.readOnly,
    };
  }

  /**
   * Select a project as the current project.
   */
  async select(id: ID): Promise<Project> {
    const result = await this.graphql.mutation(SelectProjectDocument, {
      id: id as string,
    });

    const payload = result.selectProject;

    if (isPresent(payload.error)) {
      handleGraphQLError(payload.error);
    }

    const project = payload.currentProject!.project;
    return {
      id: project.id as ID,
      name: project.name,
      path: project.path,
      status: project.status,
      temporary: project.temporary,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
      version: project.version,
      size: project.size,
      readOnly: project.readOnly,
    };
  }
}
