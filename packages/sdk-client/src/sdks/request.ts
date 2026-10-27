import { encodeBlob } from "@/convert/blob.js";
import { mapToPageInfo } from "@/convert/connection.js";
import { mapToRequestResponseOpt } from "@/convert/request.js";
import { OtherUserError } from "@/errors/index.js";
import {
  CreateRequestDocument,
  type GraphQLClient,
  Ordering,
  RequestDocument,
  RequestResponseOrderBy,
  type RequestResponseOrderInput,
  RequestsDocument,
  type Source,
} from "@/graphql/index.js";
import {
  type Alteration as V057Alteration,
  CreateRequestDocument as V057CreateRequestDocument,
  type Source as V057Source,
} from "@/transport/v0.57/index.js";
import type {
  ConnectionQueryResult,
  CreateRequestOptions,
  HTTPQL,
  ID,
  RequestGetOptions,
  RequestOrderField,
  RequestResponseOpt,
  ResponseOrderField,
} from "@/types/index.js";
import { TransportVersion } from "@/types/index.js";
import { handleGraphQLError } from "@/utils/errors.js";
import { ListBuilder, type ListBuilderVars } from "@/utils/list.js";
import { isAbsent, isPresent } from "@/utils/optional.js";
import type { Version } from "@/version.js";

const REQUEST_ORDER_BY: Record<RequestOrderField, RequestResponseOrderBy> = {
  created_at: RequestResponseOrderBy.CreatedAt,
  ext: RequestResponseOrderBy.FileExtension,
  host: RequestResponseOrderBy.Host,
  id: RequestResponseOrderBy.Id,
  method: RequestResponseOrderBy.Method,
  path: RequestResponseOrderBy.Path,
  query: RequestResponseOrderBy.Query,
  source: RequestResponseOrderBy.Source,
};

const RESP_ORDER_BY: Record<ResponseOrderField, RequestResponseOrderBy> = {
  length: RequestResponseOrderBy.RespLength,
  roundtrip: RequestResponseOrderBy.RespRoundtripTime,
  code: RequestResponseOrderBy.RespStatusCode,
};

/**
 * List builder for requests.
 */
export class RequestsListBuilder extends ListBuilder<
  RequestResponseOpt,
  HTTPQL,
  RequestResponseOrderInput
> {
  private scopeId?: ID;
  private includeRequestRaw = true;
  private includeResponseRaw = true;

  constructor(graphql: GraphQLClient) {
    super(graphql);
  }

  ascending(target: "req", field: RequestOrderField): this;
  ascending(target: "resp", field: ResponseOrderField): this;
  ascending(
    target: "req" | "resp",
    field: RequestOrderField | ResponseOrderField,
  ): this {
    const by =
      target === "req"
        ? REQUEST_ORDER_BY[field as RequestOrderField]
        : RESP_ORDER_BY[field as ResponseOrderField];
    this.order({ by, ordering: Ordering.Asc });
    return this;
  }

  descending(target: "req", field: RequestOrderField): this;
  descending(target: "resp", field: ResponseOrderField): this;
  descending(
    target: "req" | "resp",
    field: RequestOrderField | ResponseOrderField,
  ): this {
    const by =
      target === "req"
        ? REQUEST_ORDER_BY[field as RequestOrderField]
        : RESP_ORDER_BY[field as ResponseOrderField];
    this.order({ by, ordering: Ordering.Desc });
    return this;
  }

  includeRaw(
    options?: { request?: boolean; response?: boolean } | boolean,
  ): this {
    if (typeof options === "boolean") {
      this.includeRequestRaw = options;
      this.includeResponseRaw = options;
    } else {
      this.includeRequestRaw = options?.request ?? true;
      this.includeResponseRaw = options?.response ?? true;
    }
    return this;
  }

  scope(scopeId: ID): this {
    this.scopeId = scopeId as string;
    return this;
  }

  override async query(
    vars: ListBuilderVars<string, RequestResponseOrderInput>,
  ): Promise<ConnectionQueryResult<RequestResponseOpt>> {
    const result = await this.graphql.query(RequestsDocument, {
      first: vars.first,
      after: vars.after,
      last: vars.last,
      before: vars.before,
      filter: isPresent(vars.filter) ? { code: vars.filter } : undefined,
      order: vars.order,
      scopeId: this.scopeId,
      includeRequestRaw: this.includeRequestRaw,
      includeResponseRaw: this.includeResponseRaw,
    });

    return {
      pageInfo: mapToPageInfo(result.requests.pageInfo),
      edges: result.requests.edges.map((edge) => ({
        cursor: edge.cursor,
        node: mapToRequestResponseOpt(edge.node),
      })),
    };
  }
}

/**
 * SDK for HTTP requests and responses.
 */
export class RequestSDK {
  constructor(
    private readonly graphql: GraphQLClient,
    private readonly version: Version,
  ) {}

  /**
   * List requests.
   * @example
   * const requests = await client.request.list().filter("http.host == \"example.com\"").first(50);
   */
  list(): RequestsListBuilder {
    return new RequestsListBuilder(this.graphql);
  }

  /**
   * Get a request by ID.
   *
   * @param id - The ID of the request to get.
   * @param options - The options for the request and response raw payload.
   * @returns The request and optional response, or undefined if it does not exist.
   */
  async get(
    id: ID,
    options?: RequestGetOptions,
  ): Promise<RequestResponseOpt | undefined> {
    const result = await this.graphql.query(RequestDocument, {
      id: id as string,
      includeRequestRaw: options?.requestRaw ?? options?.raw ?? true,
      includeResponseRaw: options?.responseRaw ?? options?.raw ?? true,
    });
    if (isAbsent(result.request)) {
      return undefined;
    }
    return mapToRequestResponseOpt(result.request);
  }

  /**
   * Create a request.
   *
   * @param options - The options for the creation.
   * @returns The created request and optional response.
   */
  async create(options: CreateRequestOptions): Promise<RequestResponseOpt> {
    const id = (await this.version.gte(TransportVersion.V0_58))
      ? await this.createLatest(options)
      : await this.createV057(options);

    const created = await this.get(id);
    if (isAbsent(created)) {
      throw new OtherUserError("INTERNAL", "createRequest returned no request");
    }
    return created;
  }

  private async createLatest(options: CreateRequestOptions): Promise<ID> {
    const result = await this.graphql.mutation(CreateRequestDocument, {
      input: {
        host: options.host,
        method: options.method,
        path: options.path,
        port: options.port,
        query: options.query,
        raw: encodeBlob(options.raw),
        source: options.source as Source,
        isTls: false,
        sni: options.sni,
      },
    });
    return result.createRequest.id as ID;
  }

  private async createV057(options: CreateRequestOptions): Promise<ID> {
    if (!(await this.version.gte(TransportVersion.V0_57))) {
      throw new OtherUserError(
        "UNSUPPORTED",
        "request.create() requires Caido 0.57.0 or later",
      );
    }

    const result = await this.graphql.mutation(V057CreateRequestDocument, {
      input: {
        host: options.host,
        method: options.method,
        path: options.path,
        port: options.port,
        query: options.query,
        raw: encodeBlob(options.raw),
        source: options.source as V057Source,
        alteration: options.alteration as V057Alteration,
        parentId: options.parentId,
        isTls: false,
        sni: options.sni,
      },
    });
    return result.createRequest.id as ID;
  }
}
