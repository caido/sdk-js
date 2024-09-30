import fs from "fs";

// @ts-check
/**
 * @param {import('typedoc-plugin-markdown').MarkdownApplication} app
 */
export function load(app) {
  app.renderer.markdownHooks.on("content.begin", (ctx) => {
    if (ctx.page.model.url === "index.md") {
      const documentation = fs.readFileSync("documentation.md", "utf8");
      return documentation;
    }
  });
}
