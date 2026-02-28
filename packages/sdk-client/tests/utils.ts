import type { ID } from "graphql-ws";
import { ProxyAgent } from "undici";

import type { Finding } from "@/types/index.js";

export const createMockRequest = async (): Promise<void> => {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

  const instanceUrl =
    process.env["CAIDO_INSTANCE_URL"] ?? "http://localhost:8080";
  const dispatcher = new ProxyAgent(instanceUrl);

  await fetch(`https://perdu.com`, {
    method: "GET",
    // @ts-expect-error No types for undici
    dispatcher,
  });
};

export const createMockFinding = async (requestId: ID): Promise<Finding> => {
  return await caido.finding.create(requestId, {
    title: "Test Finding",
    description: "Test Description",
    reporter: "Test Reporter",
  });
};
