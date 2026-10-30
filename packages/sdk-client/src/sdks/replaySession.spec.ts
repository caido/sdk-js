import { describe, expect, it, vi } from "vitest";

import { ReplaySessionSDK } from "./replaySession.js";

import type { GraphQLClient } from "@/graphql/index.js";
import { ReplayEntrySDK } from "@/sdks/replayEntry.js";
import { Version } from "@/version.js";

const httpSession = {
  __typename: "ReplaySessionHttp" as const,
  id: "session-http",
  name: "http",
  rank: "a0",
  collection: { id: "collection-1" },
  activeEntry: { id: "entry-1" },
  entries: { edges: [{ node: { id: "entry-1" } }] },
  settings: { connectionClose: true, updateContentLength: false },
};

const wsSession = {
  __typename: "ReplaySessionWs" as const,
  id: "session-ws",
  name: "ws",
  rank: "a1",
  collection: { id: "collection-1" },
  activeEntry: null,
  entries: { edges: [] },
};

const pipelineSession = {
  __typename: "ReplaySessionHttpOnePipeline" as const,
  id: "session-pipeline",
  name: "pipeline",
  rank: "a2",
  collection: { id: "collection-2" },
  activeEntry: { id: "entry-9" },
  entries: { edges: [{ node: { id: "entry-9" } }] },
  settings: {
    strategy: {
      __typename: "PipelineStrategySinglePacketAttack" as const,
      convertToHttp2: true,
      failureBehavior: "ABORT_ON_PARTIAL" as const,
    },
  },
};

const sdkFor = (semver: string, graphql: unknown): ReplaySessionSDK => {
  const client = graphql as GraphQLClient;
  const version = Version.of(semver as "0.58.0");
  return new ReplaySessionSDK(
    client,
    version,
    new ReplayEntrySDK(client, version),
  );
};

describe("ReplaySessionSDK.get", () => {
  it("builds an HTTP session with its settings", async () => {
    const sdk = sdkFor("0.58.0", {
      query: vi.fn(async (_document: unknown, _variables?: unknown) => ({
        replaySession: httpSession,
      })),
    });

    const session = await sdk.get("session-http");

    if (session?.kind !== "HTTP") {
      throw new Error("expected an HTTP session");
    }
    expect(session.id).toBe("session-http");
    expect(session.collectionId).toBe("collection-1");
    expect(session.rank).toBe("a0");
    expect(session.activeEntryId).toBe("entry-1");
    expect(session.lastEntryId).toBe("entry-1");
    expect(session.settings).toEqual({
      connectionClose: true,
      updateContentLength: false,
    });
  });

  it("builds a WebSocket session", async () => {
    const sdk = sdkFor("0.58.0", {
      query: vi.fn(async (_document: unknown, _variables?: unknown) => ({
        replaySession: wsSession,
      })),
    });

    const session = await sdk.get("session-ws");

    if (session?.kind !== "WS") {
      throw new Error("expected a WebSocket session");
    }
    expect(session.id).toBe("session-ws");
    expect(session.activeEntryId).toBeUndefined();
    expect(session.lastEntryId).toBeUndefined();
  });

  // A pipeline session used to come back with no matching inline fragment,
  // which made the session constructor throw on `collection.id`.
  it("builds a pipeline session instead of throwing", async () => {
    const sdk = sdkFor("0.58.0", {
      query: vi.fn(async (_document: unknown, _variables?: unknown) => ({
        replaySession: pipelineSession,
      })),
    });

    const session = await sdk.get("session-pipeline");

    if (session?.kind !== "HTTP_ONE_PIPELINE") {
      throw new Error("expected a pipeline session");
    }
    expect(session.id).toBe("session-pipeline");
    expect(session.collectionId).toBe("collection-2");
    expect(session.strategy).toEqual({
      kind: "singlePacketAttack",
      convertToHttp2: true,
      failureBehavior: "ABORT_ON_PARTIAL",
    });
  });

  it("treats a 0.56 session as HTTP", async () => {
    const sdk = sdkFor("0.56.0", {
      query: vi.fn(async (_document: unknown, _variables?: unknown) => ({
        replaySession: {
          id: "session-old",
          name: "old",
          rank: "a0",
          collection: { id: "collection-1" },
          activeEntry: null,
        },
      })),
    });

    const session = await sdk.get("session-old");

    expect(session?.kind).toBe("HTTP");
    expect(session?.id).toBe("session-old");
  });
});

describe("ReplaySessionsListBuilder", () => {
  it("lists sessions of every kind together", async () => {
    const sdk = sdkFor("0.58.0", {
      query: vi.fn(async (_document: unknown, _variables?: unknown) => ({
        replaySessions: {
          edges: [
            { cursor: "c1", node: httpSession },
            { cursor: "c2", node: wsSession },
            { cursor: "c3", node: pipelineSession },
          ],
          pageInfo: {
            hasNextPage: false,
            hasPreviousPage: false,
            startCursor: "c1",
            endCursor: "c3",
          },
        },
      })),
    });

    const sessions = await sdk.list().first(10);

    expect(sessions.edges.map((edge) => edge.node.kind)).toEqual([
      "HTTP",
      "WS",
      "HTTP_ONE_PIPELINE",
    ]);
    expect(sessions.edges.map((edge) => edge.node.id)).toEqual([
      "session-http",
      "session-ws",
      "session-pipeline",
    ]);
  });
});

describe("ReplaySessionSDK.createPipeline", () => {
  it("refuses to create a pipeline session before 0.58", async () => {
    const mutation = vi.fn();
    const sdk = sdkFor("0.57.0", { mutation });

    await expect(
      sdk.createPipeline({
        requestSources: [{ id: "request-1" }],
        strategy: { kind: "sequential", abortOnFailure: true },
      }),
    ).rejects.toThrow("0.58.0");
    expect(mutation).not.toHaveBeenCalled();
  });

  it("refuses to create a pipeline session on 0.59, where the types were renamed", async () => {
    const mutation = vi.fn();
    const sdk = sdkFor("0.59.0", { mutation });

    await expect(
      sdk.createPipeline({
        requestSources: [{ id: "request-1" }],
        strategy: { kind: "sequential", abortOnFailure: true },
      }),
    ).rejects.toThrow("0.58.x");
    expect(mutation).not.toHaveBeenCalled();
  });

  it("sends the strategy as a oneOf input", async () => {
    const mutation = vi.fn(
      async (_document: unknown, _variables?: unknown) => ({
        createReplayPipelineHttpOneSession: {
          error: null,
          session: pipelineSession,
        },
      }),
    );
    const sdk = sdkFor("0.58.0", { mutation });

    const session = await sdk.createPipeline({
      requestSources: [{ id: "request-1" }],
      strategy: {
        kind: "lastByteSynchronization",
        failureBehavior: "FIRE_ON_PARTIAL",
      },
    });

    expect(session.kind).toBe("HTTP_ONE_PIPELINE");
    expect(mutation.mock.calls[0]?.[1]).toEqual({
      input: {
        collectionId: undefined,
        requestSources: [{ id: "request-1" }],
        settings: {
          strategy: {
            lastByteSynchronization: { failureBehavior: "FIRE_ON_PARTIAL" },
          },
        },
      },
    });
  });
});

describe("ReplaySessionSDK.create", () => {
  it("refuses to create a WebSocket session before 0.57", async () => {
    const mutation = vi.fn();
    const sdk = sdkFor("0.56.0", { mutation });

    await expect(sdk.create({ kind: "WS" })).rejects.toThrow("0.57.0");
    expect(mutation).not.toHaveBeenCalled();
  });

  it("defaults to an HTTP session", async () => {
    const mutation = vi.fn(
      async (_document: unknown, _variables?: unknown) => ({
        createReplaySession: { error: null, session: httpSession },
      }),
    );
    const sdk = sdkFor("0.58.0", { mutation });

    const session = await sdk.create();

    expect(session.kind).toBe("HTTP");
    expect(mutation.mock.calls[0]?.[1]).toEqual({
      input: {
        kind: "HTTP",
        collectionId: undefined,
        requestSource: undefined,
      },
    });
  });
});

// 0.59.0 renamed the pipeline types, so its sessions arrive under a name this
// SDK does not model. They must stay readable rather than throwing.
describe("unmodelled session kinds", () => {
  const pipelineOn059 = {
    __typename: "ReplaySessionHttpPipeline",
    id: "session-059-pipeline",
    name: "race",
    rank: "a3",
  };

  it("surfaces an unknown kind instead of failing", async () => {
    const sdk = sdkFor("0.59.0", {
      query: vi.fn(async (_document: unknown, _variables?: unknown) => ({
        replaySession: pipelineOn059,
      })),
    });

    const session = await sdk.get("session-059-pipeline");

    expect(session?.kind).toBe("UNKNOWN");
    expect(session?.id).toBe("session-059-pipeline");
    expect(session?.name).toBe("race");
    expect(session?.rank).toBe("a3");
    if (session?.kind !== "UNKNOWN") {
      throw new Error("expected an unknown session");
    }
    expect(session.typename).toBe("ReplaySessionHttpPipeline");
  });

  it("reports an unsupported kind instead of an empty entry list", async () => {
    const sdk = sdkFor("0.59.0", {
      query: vi.fn(async (_document: unknown, _variables?: unknown) => ({
        // 0.59 pipeline session: present, but no entries selection matches it
        replaySession: { __typename: "ReplaySessionHttpPipeline" },
      })),
    });

    await expect(
      sdk.get("session-059-pipeline").then(async (session) => {
        if (session === undefined) {
          throw new Error("expected a session");
        }
        return session.entries().first(10);
      }),
    ).rejects.toThrow("ReplaySessionHttpPipeline");
  });

  it("reports no entries for a session that has gone away", async () => {
    const query = vi.fn(async (document: unknown, _variables?: unknown) =>
      JSON.stringify(document).includes("ReplaySessionEntries")
        ? { replaySession: null }
        : { replaySession: httpSession },
    );
    const sdk = sdkFor("0.58.0", { query });

    const session = await sdk.get("session-http");
    if (session === undefined) {
      throw new Error("expected a session");
    }
    const entries = await session.entries().first(10);

    expect(entries.edges).toEqual([]);
  });

  it("never sends 0.58 pipeline types to a 0.59 instance", async () => {
    const query = vi.fn(async (_document: unknown, _variables?: unknown) => ({
      replaySession: pipelineOn059,
    }));
    const sdk = sdkFor("0.59.0", { query });

    await sdk.get("session-059-pipeline");

    const document = JSON.stringify(query.mock.calls[0]?.[0]);
    expect(document).not.toContain("ReplaySessionHttpOnePipeline");
  });

  it("still sends pipeline types to a 0.58 instance", async () => {
    const query = vi.fn(async (_document: unknown, _variables?: unknown) => ({
      replaySession: httpSession,
    }));
    const sdk = sdkFor("0.58.0", { query });

    await sdk.get("session-http");

    const document = JSON.stringify(query.mock.calls[0]?.[0]);
    expect(document).toContain("ReplaySessionHttpOnePipeline");
  });
});
