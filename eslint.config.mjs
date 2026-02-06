import { defaultConfig } from "@caido/eslint-config";
import { globalIgnores } from "eslint/config";

export default [
  ...defaultConfig({
    compat: false,
  }),
  {
    name: "Global",
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/triple-slash-reference": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-restricted-types": "off",
      "@typescript-eslint/require-await": "off",
    },
  },
  {
    name: "SDK Frontend",
    ignores: [
      "packages/sdk-frontend/src/index.js",
      "packages/sdk-frontend/src/types/**"
    ]
  },
  {
    name: "QuickJS",
    ignores: [
      "packages/quickjs-types/src/llrt/**",
      "packages/quickjs-types/src/extra/**"
    ]
  },
  {
    name: "SDK Client",
    ignores: [
      "packages/sdk-client/src/graphql/__generated__/**",
      "packages/sdk-client/src/rest/__generated__/**"
    ]
  }
];
