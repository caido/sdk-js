import { defineConfig, type UserConfig } from "@hey-api/openapi-ts";

const config: Promise<UserConfig> = defineConfig({
  input: "src/rest/openapi.yaml",
  output: {
    path: "src/rest/__generated__",
    lint: "eslint",
    format: "prettier",
  },
  plugins: ["@hey-api/typescript"],
});

export default config;
