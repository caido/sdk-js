import type { KnipConfig } from "knip";

const config: KnipConfig = {
  ignore: [
    "scripts/**",
    "package.json",
    ".github/**",
    "**/typedoc.json",
    "packages/sdk-frontend/**",
    "packages/sdk-workflow/**",
  ],
  workspaces: {
    "packages/sdk-client": {
      project: ["src/**/*.ts!"],
      ignore: ["src/**/__generated__/**"],
    },
    "packages/server-auth": {
      project: ["src/**/*.ts!"],
    },
  },
};

export default config;
