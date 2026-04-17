import { describe, expect, it } from "vitest";

import { createMockRequest } from "./utils.js";

describe("Request", () => {
  it("should list requests matching an HTTPQL filter", async () => {
    await createMockRequest();

    const filter = 'req.host.ne:"perdu.com"';
    const matched = await caido.request
      .list()
      .filter(filter)
      .first(10)
      .descending("req", "created_at");

    expect(matched.edges.length).toBeGreaterThanOrEqual(0);
  });

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
