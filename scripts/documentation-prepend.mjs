import fs from "fs";
import { MarkdownTheme } from "typedoc-plugin-markdown";

// @ts-check
/**
 * Plugin that prepends documentation.md content to the index.md page.
 *
 * @param {import('typedoc-plugin-markdown').MarkdownApplication} app
 */
export function load(app) {
  // If you want to take over the index, use the theme
  app.renderer.defineTheme("override", OverrideMarkdownTheme);

  // If you just want to prepend data, leave the theme as default
  app.renderer.markdownHooks.on("content.begin", (ctx) => {
    if (ctx.page.url === "index.md") {
      const documentation = fs.readFileSync("documentation.md", "utf8");
      return documentation;
    }
  });
}

class OverrideMarkdownTheme extends MarkdownTheme {
  render(page, template) {
    if (page.url == "index.md") {
      const documentation = fs.readFileSync("documentation.md", "utf8");
      return documentation;
    }
    return super.render(page, template);
  }
}
