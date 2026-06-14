import { decodeBlob } from "./blob.js";

import type { AutomateSessionFullFragment } from "@/graphql/index.js";
import type { AutomateEntry, AutomateSession } from "@/types/index.js";

const mapToAutomateEntry = (node: {
  id: string;
  name: string;
  createdAt: number;
  raw: string;
  settings: unknown;
  connection: {
    host: string;
    port: number;
    isTLS: boolean;
    SNI?: string | undefined | null;
  };
}): AutomateEntry => {
  return {
    id: node.id,
    name: node.name,
    createdAt: node.createdAt,
    raw: decodeBlob(node.raw) ?? new Uint8Array(),
  };
};

export const mapToAutomateSession = (
  node: AutomateSessionFullFragment,
): AutomateSession => {
  return {
    id: node.id,
    name: node.name,
    createdAt: node.createdAt,
    connection: {
      host: node.connection.host,
      port: node.connection.port,
      isTLS: node.connection.isTLS,
      SNI: node.connection.SNI ?? undefined,
    },
    entries: node.entries.map(mapToAutomateEntry),
    settings: node.settings,
    raw: decodeBlob(node.raw) ?? new Uint8Array(),
  };
};
