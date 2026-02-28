import { defineConfig, type UserWorkspaceConfig } from "vitest/config";

const config: UserWorkspaceConfig = defineConfig({
  test: {
    setupFiles: ["./tests/setup.ts"],
    fileParallelism: false,
  },
});

export default config;
