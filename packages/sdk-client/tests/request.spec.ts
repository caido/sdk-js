import { describe, expect, it } from "vitest";

import { createMockFinding, createMockRequest } from "./utils.js";

describe("Request", () => {
  it("should be able to get a request", async () => {
    await createMockRequest();
    await createMockRequest();
    await createMockRequest();
    const response = await caido.request
      .list()
      .first(2)
      .descending("req", "created_at");
    expect(response.edges.length).toBe(2);
    expect(response.pageInfo.hasNextPage).toBe(true);
    expect(response.edges[0]!.node.request.id).toBe("3");
    expect(response.edges[1]!.node.request.id).toBe("2");

    const nextResponse = await response.next();
    expect(nextResponse!.edges.length).toBe(1);
    expect(nextResponse!.pageInfo.hasNextPage).toBe(false);
    expect(nextResponse!.edges[0]!.node.request.id).toBe("1");
  });
});
