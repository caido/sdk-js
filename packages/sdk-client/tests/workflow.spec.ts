import { describe, expect, it } from "vitest";

describe("Workflow", () => {
  it("should be able to perform workflow CRUD operations", async () => {
    const existing = await caido.workflow.list();
    expect(existing.length).toBeGreaterThan(0);

    const source = existing[0]!;
    const created = await caido.workflow.create({
      definition: source.definition,
      global: false,
    });

    const fetched = await caido.workflow.get(created.id);
    expect(fetched).toBeDefined();
    expect(fetched?.id).toBe(created.id);

    const updated = await caido.workflow.update(created.id, {
      definition: created.definition,
    });
    expect(updated.id).toBe(created.id);

    const listed = await caido.workflow.list();
    expect(listed.some((workflow) => workflow.id === created.id)).toBe(true);
  });
});
