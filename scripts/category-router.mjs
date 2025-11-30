import { promises as fs } from "fs";
import path from "path";
import { MarkdownRendererEvent } from "typedoc-plugin-markdown";

// @ts-check
/**
 * Plugin that creates separate markdown pages for each category.
 * Groups all reflections by category and creates one page per category.
 * 
 * @param {import('typedoc-plugin-markdown').MarkdownApplication} app
 */
export function load(app) {
  // Use post-render async job to create category pages after markdown is generated
  app.renderer.postMarkdownRenderAsyncJobs.push(async (event) => {
    const logger = app.logger;
    const project = event.project;
    const categoryOrder = app.options.getValue("categoryOrder") || [];
    const outputDir = event.outputDirectory;
    
    // Find the main module (usually the entry point module)
    const mainModule = project.children?.find(
      child => child.kindString === "Module" || child.kindString === "Project"
    ) || project;
    
    if (!mainModule.categories || mainModule.categories.length === 0) {
      logger.info("[category-router] No categories found, skipping category pages.");
      return;
    }
    
    // Read the generated index.md to extract category content
    const indexPath = path.join(outputDir, "index.md");
    let indexContent;
    try {
      indexContent = await fs.readFile(indexPath, "utf8");
    } catch (error) {
      logger.warn(`[category-router] Could not read index.md: ${error.message}`);
      return;
    }
    
    // Parse categories from index.md
    const headingPattern = /^##\s+(?!#)(.+)$/gm;
    const matches = [];
    let match;
    
    while ((match = headingPattern.exec(indexContent)) !== null) {
      matches.push({ name: match[1].trim(), start: match.index });
    }
    
    if (matches.length === 0) {
      logger.warn("[category-router] No category headings found in index.md");
      return;
    }
    
    // Extract category content
    const categories = matches.map((entry, index) => {
      const end = matches[index + 1]?.start ?? indexContent.length;
      return {
        name: entry.name,
        content: indexContent.slice(entry.start, end).trim(),
      };
    });
    
    const preContent = indexContent.slice(0, matches[0].start).trim();
    
    // Build order map
    const orderMap = new Map();
    categoryOrder.forEach((name, index) => {
      orderMap.set(normalizeCategoryName(name), index);
    });
    
    // Sort categories
    const orderedCategories = [];
    const unorderedCategories = [];
    
    categories.forEach(category => {
      const normalizedName = normalizeCategoryName(category.name);
      const orderIndex = orderMap.get(normalizedName);
      if (typeof orderIndex === "number") {
        orderedCategories.push({ category, orderIndex });
      } else {
        unorderedCategories.push(category);
      }
    });
    
    orderedCategories.sort((a, b) => a.orderIndex - b.orderIndex);
    const allCategories = [
      ...orderedCategories.map(item => item.category),
      ...unorderedCategories
    ];
    
    // Filter out "SDK" category (stays in index.md)
    const sdkCategory = allCategories.find(cat => normalizeCategoryName(cat.name) === "SDK");
    const categoryPages = allCategories.filter(cat => normalizeCategoryName(cat.name) !== "SDK");
    
    logger.info(`[category-router] Creating ${categoryPages.length} category pages.`);
    
    // Write category files
    for (const category of categoryPages) {
      const fileName = categoryToFileName(category.name);
      const filePath = path.join(outputDir, fileName);
      
      // Promote H2 to H1 for standalone category pages
      const content = category.content.replace(/^##\s+/m, "# ");
      
      await fs.writeFile(filePath, content + "\n", "utf8");
    }
    
    // Rebuild index.md with SDK category + links to category pages
    const sections = [];
    
    if (preContent) {
      sections.push(preContent);
    }
    
    if (sdkCategory) {
      sections.push(sdkCategory.content);
    }
    
    if (categoryPages.length > 0) {
      const categoryLinks = categoryPages
        .map(category => `- [${category.name}](${categoryToFileName(category.name)})`)
        .join("\n");
      sections.push("## API Reference\n\n" + categoryLinks);
    }
    
    const newIndexContent = sections.filter(Boolean).join("\n\n") + "\n";
    await fs.writeFile(indexPath, newIndexContent, "utf8");
    
    logger.info(`[category-router] Created ${categoryPages.length} category pages and updated index.md`);
  });
}

/**
 * Normalize category names for comparison.
 * @param {string} name
 */
function normalizeCategoryName(name) {
  return name.trim();
}

/**
 * Convert category name to a safe filename.
 * @param {string} name
 */
function categoryToFileName(name) {
  return `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "category"}.md`;
}
