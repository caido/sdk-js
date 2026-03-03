import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig, type UserWorkspaceConfig } from "vitest/config";

const config: UserWorkspaceConfig = defineConfig({
  plugins: [
    tsconfigPaths({
      loose: true,
    }),
  ],
  test: {
    setupFiles: ["./tests/setup.ts"],
    fileParallelism: false,
  },
});

export default config;
