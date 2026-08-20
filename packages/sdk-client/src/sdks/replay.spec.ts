import { describe, expect, it, vi } from "vitest";
import { makeSubject, toAsyncIterable } from "wonka";

import { ReplaySDK } from "./replay.js";

import type { GraphQLClient } from "@/graphql/index.js";
import { Version } from "@/version.js";

type FinishedEvent = {
  finishedTask: {
    task: {
      __typename: "ReplayTask";
      id: string;
      createdAt: string;
      replayEntry: { id: string };
    };
    status: "DONE";
    error: null;
  };
};

describe("ReplaySDK.send", () => {
  it("resolves when the task finishes before the start mutation returns", async () => {
    const subject = makeSubject<FinishedEvent>();

    const task = {
      __typename: "ReplayTask" as const,
      id: "task-1",
      createdAt: "2026-01-01T00:00:00.000Z",
      replayEntry: { id: "entry-1" },
    };

    const graphql = {
      subscribe: vi.fn(() => toAsyncIterable(subject.source)),
      mutation: vi.fn(async () => {
        // Fast-finishing task: finished event arrives before mutation resolves
        subject.next({
          finishedTask: {
            task,
            status: "DONE",
            error: null,
          },
        });
        subject.complete();

        return {
          startReplayTask: {
            task,
            error: null,
          },
        };
      }),
      query: vi.fn(async () => ({
        replayEntry: {
          id: "entry-1",
          createdAt: "2026-01-01T00:00:00.000Z",
          error: null,
          raw: undefined,
          connection: {
            __typename: "ConnectionInfo",
            host: "example.com",
            port: 80,
            isTLS: false,
            SNI: null,
          },
          request: null,
          session: { id: "session-1" },
          settings: { placeholders: [] },
        },
      })),
    } as unknown as GraphQLClient;

    const replay = new ReplaySDK(graphql, Version.of("0.56.0"));

    const result = await replay.send("session-1", {
      raw: "GET / HTTP/1.1\r\nHost: example.com\r\n\r\n",
      connection: {
        host: "example.com",
        port: 80,
        isTLS: false,
      },
    });

    expect(result.status).toBe("DONE");
    expect(result.entry.id).toBe("entry-1");
    expect(graphql.subscribe).toHaveBeenCalled();
    expect(graphql.mutation).toHaveBeenCalled();
    expect(
      vi.mocked(graphql.subscribe).mock.invocationCallOrder[0]!,
    ).toBeLessThan(vi.mocked(graphql.mutation).mock.invocationCallOrder[0]!);
  });
});
