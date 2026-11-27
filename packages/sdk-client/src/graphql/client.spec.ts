import { createServer, type IncomingHttpHeaders, type Server } from "node:http";

import { parse } from "graphql";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Client } from "@/client.js";

const APP = { name: "my-tool", version: "1.2.0" };
const USER_AGENT_PATTERN =
  /^my-tool\/1\.2\.0 caido-sdk-client\/\S+ node\/\S+ agent\/test-agent$/;
const SILENT_LOGGER = { debug() {}, info() {}, warn() {}, error() {} };

type RecordedRequest = {
  path: string | undefined;
  headers: IncomingHttpHeaders;
};

const servers: Server[] = [];

const startInstance = async (body: unknown) => {
  const requests: RecordedRequest[] = [];
  const server = createServer((request, response) => {
    requests.push({ path: request.url, headers: request.headers });
    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify(body));
  });
  const upgrade = new Promise<IncomingHttpHeaders>((resolve) => {
    server.on("upgrade", (request, socket) => {
      resolve(request.headers);
      socket.destroy();
    });
  });
  servers.push(server);

  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  const port = typeof address === "object" ? address?.port : undefined;

  return { requests, upgrade, url: `http://127.0.0.1:${port}` };
};

describe("Client user agent", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    servers.forEach((server) => {
      server.closeAllConnections();
      server.close();
    });
    servers.length = 0;
  });

  it("sends the user agent on REST requests", async () => {
    vi.stubEnv("AI_AGENT", "test-agent");
    const instance = await startInstance({
      name: "caido",
      version: "0.58.0",
      ready: true,
    });
    const client = new Client({ url: instance.url, app: APP });

    await client.health();

    expect(instance.requests).toMatchObject([
      {
        path: "/health",
        headers: { "user-agent": expect.stringMatching(USER_AGENT_PATTERN) },
      },
    ]);
  });

  it("sends the user agent on GraphQL requests", async () => {
    vi.stubEnv("AI_AGENT", "test-agent");
    const instance = await startInstance({ data: { __typename: "QueryRoot" } });
    const client = new Client({ url: instance.url, app: APP });

    await client.graphql.query(parse("query { __typename }"));

    expect(instance.requests).toMatchObject([
      {
        path: "/graphql",
        headers: { "user-agent": expect.stringMatching(USER_AGENT_PATTERN) },
      },
    ]);
  });

  it("sends the user agent on instance login requests", async () => {
    vi.stubEnv("AI_AGENT", "test-agent");
    const instance = await startInstance({ data: null });
    const client = new Client({
      url: instance.url,
      app: APP,
      auth: { pat: "caido_test" },
      logger: SILENT_LOGGER,
    });

    await client.connect({ ready: false }).catch(() => undefined);

    expect(instance.requests[0]).toMatchObject({
      path: "/graphql",
      headers: { "user-agent": expect.stringMatching(USER_AGENT_PATTERN) },
    });
  });

  it("sends the user agent on the WebSocket handshake", async () => {
    vi.stubEnv("AI_AGENT", "test-agent");
    const instance = await startInstance({});
    const client = new Client({
      url: instance.url,
      app: APP,
      logger: SILENT_LOGGER,
    });

    const subscription = client.graphql
      .subscribe(parse("subscription { __typename }"))
      [Symbol.asyncIterator]();
    void subscription.next().catch(() => undefined);

    const headers = await instance.upgrade;
    await subscription.return?.();

    expect(headers["user-agent"]).toMatch(USER_AGENT_PATTERN);
  });
});
