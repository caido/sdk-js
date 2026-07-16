import { describe, expect, it } from "vitest";

const CONVERT_HEX_ENCODE_DEFINITION: Record<string, unknown> = {
  edition: 2,
  id: "convert-1",
  name: "Convert 1",
  description: "",
  kind: "convert",
  graph: {
    nodes: [
      {
        id: 1,
        alias: "convert_start_1",
        name: "Convert Start",
        definition_id: "caido/convert-start",
        version: "*",
        inputs: [],
        display: null,
      },
      {
        id: 2,
        alias: "hex_encode_2",
        name: "Hex Encode",
        definition_id: "caido/hex-encode",
        version: "*",
        inputs: [
          { alias: "delimiter", value: { kind: "string", data: "," } },
          { alias: "format", value: { kind: "string", data: "UPPER" } },
          { alias: "prefix", value: { kind: "string", data: "0x" } },
          {
            alias: "data",
            value: { kind: "ref", data: "$convert_start_1.data" },
          },
        ],
        display: null,
      },
      {
        id: 3,
        alias: "convert_end_3",
        name: "Convert End",
        definition_id: "caido/convert-end",
        version: "*",
        inputs: [
          { alias: "data", value: { kind: "ref", data: "$hex_encode_2.data" } },
        ],
        display: null,
      },
    ],
    edges: [
      {
        source: { node_id: 1, exec_alias: "exec" },
        target: { node_id: 2, exec_alias: "exec" },
      },
      {
        source: { node_id: 2, exec_alias: "exec" },
        target: { node_id: 3, exec_alias: "exec" },
      },
    ],
  },
};

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

  it("should test a convert workflow against input data", async () => {
    const result = await caido.workflow.testConvert({
      definition: CONVERT_HEX_ENCODE_DEFINITION,
      data: "TEST",
    });

    expect(result.output).toBeDefined();
    expect(new TextDecoder().decode(result.output)).toBe("0x54,0x45,0x53,0x54");
  });
});
