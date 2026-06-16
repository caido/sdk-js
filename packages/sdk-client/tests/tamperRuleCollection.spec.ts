import { describe, expect, it } from "vitest";

describe("TamperRuleCollection", () => {
  it("should be able to create a tamper rule collection", async () => {
    const created = await caido.tamperRuleCollection.create({
      name: "My Tamper Rules",
    });

    expect(created).toBeDefined();
    expect(created.id).toBeDefined();
    expect(created.name).toBe("My Tamper Rules");
    expect(created.rules).toBeDefined();
    expect(Array.isArray(created.rules)).toBe(true);
  });
});
