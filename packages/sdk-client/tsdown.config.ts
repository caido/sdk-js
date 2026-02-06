import { defineConfig, type UserConfig } from "tsdown";

const config: UserConfig = defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  outDir: "dist",
  treeshake: true,
});

export default config;
