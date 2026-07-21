import { describe, expect, it } from "vitest";

import { bytes, createMockRequest } from "./utils.js";

const CONVERT_DEFINITION: Record<string, unknown> = {
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

const PASSIVE_DEFINITION: Record<string, unknown> = {
  edition: 2,
  id: "passive-1",
  name: "Passive 1",
  description: "",
  kind: "passive",
  graph: {
    nodes: [
      {
        id: 1,
        alias: "on_intercept_request",
        name: "On Intercept Request",
        definition_id: "caido/on-intercept-request",
        version: "*",
        inputs: [],
        display: null,
      },
      {
        id: 2,
        alias: "set_color",
        name: "Set Color",
        definition_id: "caido/color-set",
        version: "*",
        inputs: [
          { alias: "color", value: { kind: "string", data: "red" } },
          {
            alias: "request",
            value: { kind: "ref", data: "$on_intercept_request.request" },
          },
        ],
        display: null,
      },
    ],
    edges: [
      {
        source: { node_id: 1, exec_alias: "exec" },
        target: { node_id: 2, exec_alias: "exec" },
      },
    ],
  },
};

const ACTIVE_DEFINITION: Record<string, unknown> = {
  edition: 2,
  id: "active-1",
  name: "Active 1",
  description: "",
  kind: "active",
  graph: {
    nodes: [
      {
        id: 1,
        alias: "active_start",
        name: "Active Start",
        definition_id: "caido/active-start",
        version: "*",
        inputs: [],
        display: null,
      },
      {
        id: 2,
        alias: "set_color",
        name: "Set Color",
        definition_id: "caido/color-set",
        version: "*",
        inputs: [
          { alias: "color", value: { kind: "string", data: "red" } },
          {
            alias: "request",
            value: { kind: "ref", data: "$active_start.request" },
          },
        ],
        display: null,
      },
    ],
    edges: [
      {
        source: { node_id: 1, exec_alias: "exec" },
        target: { node_id: 2, exec_alias: "exec" },
      },
    ],
  },
};

const CONNECTION = { host: "localhost", port: 5956, isTLS: false };
const REQUEST_RAW = bytes(
  "GET /health/other HTTP/1.1\r\nHost: localhost:5956\r\n\r\n",
);
const RESPONSE_RAW = bytes("HTTP/1.1 200 OK\r\nContent-Length: 0\r\n\r\n");

describe("ENG-874 workflow stack (full lifecycle)", () => {
  it("exercises every workflow operation end to end", async () => {
    // 1. Create a convert, passive, and active workflow
    const convert = await caido.workflow.create({
      definition: CONVERT_DEFINITION,
      global: false,
    });
    expect(convert.id).toBeDefined();
    const passive = await caido.workflow.create({
      definition: PASSIVE_DEFINITION,
      global: false,
    });
    expect(passive.id).toBeDefined();
    const active = await caido.workflow.create({
      definition: ACTIVE_DEFINITION,
      global: false,
    });
    expect(active.id).toBeDefined();
    console.log(
      `[1] create PASS: convert=${convert.id} passive=${passive.id} active=${active.id}`,
    );

    // 2. list() and get() — all three appear
    const listed = await caido.workflow.list();
    const listedIds = listed.map((workflow) => workflow.id);
    expect(listedIds).toContain(convert.id);
    expect(listedIds).toContain(passive.id);
    expect(listedIds).toContain(active.id);
    for (const created of [convert, passive, active]) {
      const fetched = await caido.workflow.get(created.id);
      expect(fetched?.id).toBe(created.id);
    }
    console.log("[2] list + get PASS: all three present");

    // 3. toggle() each: true -> false -> true
    for (const created of [convert, passive, active]) {
      expect((await caido.workflow.toggle(created.id, true)).enabled).toBe(
        true,
      );
      expect((await caido.workflow.toggle(created.id, false)).enabled).toBe(
        false,
      );
      expect((await caido.workflow.toggle(created.id, true)).enabled).toBe(
        true,
      );
    }
    console.log("[3] toggle true->false->true PASS for all three");

    // 4. test (convert kind) / testPassive / testActive
    const testConvert = await caido.workflow.test({
      kind: "convert",
      definition: CONVERT_DEFINITION,
      data: bytes("TEST"),
    });
    expect(new TextDecoder().decode(testConvert.output)).toBe(
      "0x54,0x45,0x53,0x54",
    );
    const testPassive = await caido.workflow.test({
      kind: "passive",
      definition: PASSIVE_DEFINITION,
      request: { connection: CONNECTION, raw: REQUEST_RAW },
    });
    expect(testPassive.runState).toBeDefined();
    const testActive = await caido.workflow.test({
      kind: "active",
      definition: ACTIVE_DEFINITION,
      request: { connection: CONNECTION, raw: REQUEST_RAW },
      response: { raw: RESPONSE_RAW },
    });
    expect(testActive.runState).toBeDefined();
    console.log(
      "[4] test convert output PASS; test passive + test active runState PASS",
    );

    // 5. run convert (assert output) + run active (assert task, no output)
    const runConvert = await caido.workflow.run({
      kind: "convert",
      id: convert.id,
      data: bytes("TEST"),
    });
    expect(new TextDecoder().decode(runConvert.output)).toBe(
      "0x54,0x45,0x53,0x54",
    );

    await createMockRequest();
    const requests = await caido.request
      .list()
      .first(1)
      .descending("req", "created_at");
    expect(requests.edges.length).toBeGreaterThan(0);
    const requestId = requests.edges[0]!.node.request.id;

    const task = await caido.workflow.run({
      kind: "active",
      id: active.id,
      requestId,
    });
    expect(task.id).toBeDefined();
    console.log(
      `[5] run convert output PASS; run active task=${task.id} (no output) PASS`,
    );

    // 6. update() then delete() — gone from list()
    const updated = await caido.workflow.update(convert.id, {
      definition: convert.definition,
    });
    expect(updated.id).toBe(convert.id);
    await caido.workflow.delete(convert.id);
    const afterDelete = await caido.workflow.list();
    expect(afterDelete.some((workflow) => workflow.id === convert.id)).toBe(
      false,
    );
    console.log("[6] update + delete PASS: workflow gone from list");
  });
});
