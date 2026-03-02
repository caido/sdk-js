import type { ConnectionInfoFullFragment } from "@/graphql/__generated__/connectionInfo.js";
import type { ConnectionInfo } from "@/types/index.js";

export const mapToConnectionInfo = (
  node: ConnectionInfoFullFragment,
): ConnectionInfo => {
  return {
    host: node.host,
    port: node.port,
    isTLS: node.isTLS,
    SNI: node.SNI ?? undefined,
  };
};
