import type { EnvironmentFullFragment } from "@/graphql/index.js";
import type { Environment } from "@/types/index.js";

export const mapToEnvironment = (
  node: EnvironmentFullFragment,
): Environment => {
  return {
    id: node.id,
    name: node.name,
    version: node.version,
    variables: node.variables,
  };
};
