import { defaultConfig } from "@caido/eslint-config";

export default [
  ...defaultConfig({
    compat: false,
  }),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/triple-slash-reference": "off",
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
  {
    ignores: ["**/index.js"]
  }
];
