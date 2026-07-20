import { describe, expect, it } from "vitest";

import { createMockRequest } from "./utils.js";

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

const PASSIVE_SET_COLOR_DEFINITION: Record<string, unknown> = {
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

const ACTIVE_SET_COLOR_DEFINITION: Record<string, unknown> = {
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

const TEST_CONNECTION = {
  host: "localhost",
  port: 5956,
  isTLS: false,
};

const TEST_REQUEST_RAW =
  "GET /health/other HTTP/1.1\r\nHost: localhost:5956\r\n\r\n";

const TEST_RESPONSE_RAW = "HTTP/1.1 200 OK\r\nContent-Length: 0\r\n\r\n";

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

  it("should test a passive workflow against a request", async () => {
    const result = await caido.workflow.testPassive({
      definition: PASSIVE_SET_COLOR_DEFINITION,
      request: { connection: TEST_CONNECTION, raw: TEST_REQUEST_RAW },
    });

    expect(result.runState).toBeDefined();
    expect(JSON.stringify(result.runState)).toContain("set_color");
  });

  it("should test an active workflow against a request and response", async () => {
    const result = await caido.workflow.testActive({
      definition: ACTIVE_SET_COLOR_DEFINITION,
      request: { connection: TEST_CONNECTION, raw: TEST_REQUEST_RAW },
      response: { raw: TEST_RESPONSE_RAW },
    });

    expect(result.runState).toBeDefined();
    expect(JSON.stringify(result.runState)).toContain("set_color");
  });

  it("should toggle a workflow's enabled state", async () => {
    const existing = await caido.workflow.list();
    expect(existing.length).toBeGreaterThan(0);

    const created = await caido.workflow.create({
      definition: existing[0]!.definition,
      global: false,
    });

    const disabled = await caido.workflow.toggle(created.id, false);
    expect(disabled.enabled).toBe(false);

    const enabled = await caido.workflow.toggle(created.id, true);
    expect(enabled.enabled).toBe(true);
  });

  it("should run a convert workflow against input data", async () => {
    const created = await caido.workflow.create({
      definition: CONVERT_HEX_ENCODE_DEFINITION,
      global: false,
    });

    const result = await caido.workflow.run({
      kind: "convert",
      id: created.id,
      data: "TEST",
    });

    expect(result.output).toBeDefined();
    expect(new TextDecoder().decode(result.output)).toBe("0x54,0x45,0x53,0x54");
  });

  it("should run an active workflow against a request", async () => {
    await createMockRequest();
    const requests = await caido.request
      .list()
      .first(1)
      .descending("req", "created_at");
    expect(requests.edges.length).toBeGreaterThan(0);
    const requestId = requests.edges[0]!.node.request.id;

    const created = await caido.workflow.create({
      definition: ACTIVE_SET_COLOR_DEFINITION,
      global: false,
    });

    const task = await caido.workflow.run({
      kind: "active",
      id: created.id,
      requestId,
    });
    expect(task.id).toBeDefined();
  });
});
