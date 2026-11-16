import { describe, expect, it } from "vitest";

import { createMockReplaySession } from "./utils.js";

import { ReplaySessionKind } from "@/types/index.js";

const RAW_REQUEST = "GET / HTTP/1.1\r\nHost: httpforever.com\r\n\r\n";

const CONNECTION = {
  host: "httpforever.com",
  port: 80,
  isTLS: false,
  SNI: "",
};

describe("Replay sessions", () => {
  it("should create an HTTP session", async () => {
    const session = await createMockReplaySession();

    expect(session.kind).toBe(ReplaySessionKind.Http);
    expect(session.collectionId).toBeTypeOf("string");
  });

  it("should create a WebSocket session", async () => {
    const session = await caido.replay.sessions.create({
      kind: ReplaySessionKind.Ws,
      requestSource: { raw: RAW_REQUEST, connection: CONNECTION },
    });

    expect(session.kind).toBe(ReplaySessionKind.Ws);

    const fetched = await caido.replay.sessions.get(session.id);
    expect(fetched?.kind).toBe(ReplaySessionKind.Ws);
  });

  it("should create a pipeline session", async () => {
    const session = await caido.replay.sessions.create({
      kind: ReplaySessionKind.Pipeline,
      requestSources: [
        { raw: RAW_REQUEST, connection: CONNECTION },
        { raw: RAW_REQUEST, connection: CONNECTION },
      ],
      strategy: { kind: "sequential", abortOnFailure: true },
    });

    expect(session.kind).toBe(ReplaySessionKind.Pipeline);
    expect(session.strategy).toEqual({
      kind: "sequential",
      abortOnFailure: true,
    });

    const entries = await session.entries().first(10);
    expect(entries.edges.length).toBeGreaterThan(0);
    expect(entries.edges[0]?.node.kind).toBe(ReplaySessionKind.Pipeline);
  });

  it("should get a pipeline entry by kind", async () => {
    const session = await caido.replay.sessions.create({
      kind: ReplaySessionKind.Pipeline,
      requestSources: [{ raw: RAW_REQUEST, connection: CONNECTION }],
      strategy: { kind: "sequential", abortOnFailure: true },
    });

    const page = await session.entries().first(1);
    const listed = page.edges[0]?.node;
    expect(listed?.kind).toBe(ReplaySessionKind.Pipeline);

    const entry = await caido.replay.entries.get(
      listed!.id,
      ReplaySessionKind.Pipeline,
    );
    expect(entry?.kind).toBe(ReplaySessionKind.Pipeline);
    expect(entry?.httpEntries.length).toBe(1);
    expect(entry?.sessionId).toBe(session.id);
  });

  it("should set the active entry and return the updated session", async () => {
    const session = await createMockReplaySession();
    const page = await session.entries().first(1);
    const entryId = page.edges[0]?.node.id;
    expect(entryId).toBeTypeOf("string");

    const updated = await session.setActiveEntry(entryId!);
    expect(updated.id).toBe(session.id);
    expect(updated.activeEntryId).toBe(entryId);
  });

  it("should rename, move and delete a session", async () => {
    const session = await createMockReplaySession();

    const renamed = await caido.replay.sessions.rename(session.id, "renamed");
    expect(renamed.name).toBe("renamed");

    const collection = await caido.replay.collections.create({ name: "sdk-test" });
    const moved = await caido.replay.sessions.move(session.id, collection.id);
    expect(moved.collectionId).toBe(collection.id);

    await caido.replay.sessions.delete([session.id]);
    expect(await caido.replay.sessions.get(session.id)).toBeUndefined();
  });

  it("should list sessions of every kind", async () => {
    const http = await createMockReplaySession();
    const ws = await caido.replay.sessions.create({
      kind: ReplaySessionKind.Ws,
      requestSource: { raw: RAW_REQUEST, connection: CONNECTION },
    });

    const listed = await caido.replay.sessions.list().first(50);
    const byId = new Map(
      listed.edges.map((edge) => [edge.node.id, edge.node.kind]),
    );

    expect(byId.get(http.id)).toBe(ReplaySessionKind.Http);
    expect(byId.get(ws.id)).toBe(ReplaySessionKind.Ws);
  });
});
