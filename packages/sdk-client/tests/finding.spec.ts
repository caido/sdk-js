import { describe, expect, it } from "vitest";

import { createMockFinding, createMockRequest } from "./utils.js";

describe("Finding", () => {
  it("should be able to list findings", async () => {
    await createMockRequest();
    await createMockFinding("1");
    await createMockFinding("1");
    await createMockFinding("1");

    const findings = await caido.finding.list().first(2);
    expect(findings.edges.length).toBe(2);
    expect(findings.pageInfo.hasNextPage).toBe(true);
    expect(findings.edges[0]!.node.requestId).toBe("1");
    expect(findings.edges[1]!.node.requestId).toBe("1");

    const nextFindings = await findings.next();
    expect(nextFindings!.edges.length).toBe(1);
    expect(nextFindings!.pageInfo.hasNextPage).toBe(false);
    expect(nextFindings!.edges[0]!.node.requestId).toBe("1");
  });
});
