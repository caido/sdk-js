import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig, type UserWorkspaceConfig } from "vitest/config";

const config: UserWorkspaceConfig = defineConfig({
  plugins: [
    tsconfigPaths({
      loose: true,
    }),
  ],
  test: {
    fileParallelism: false,
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          include: ["src/**/*.spec.ts"],
        },
      },
      {
        extends: true,
        test: {
          name: "integration",
          include: ["tests/**/*.spec.ts"],
          setupFiles: ["./tests/setup.ts"],
        },
      },
    ],
  },
});

export default config;
