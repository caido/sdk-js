import fs from "fs";
import path from "path";
import { RendererEvent } from "typedoc";

// @ts-check
/**
 * Plugin that splits the generated index.md file into separate files per category.
 * 
 * @param {import('typedoc').Application} app
 */
export function load(app) {
  // After all pages are rendered, split index.md by categories
  app.renderer.on(RendererEvent.END, () => {
    const outputDir = app.options.getValue("out");
    const indexPath = path.join(outputDir, "index.md");
    
    if (!fs.existsSync(indexPath)) return;
    
    const indexContent = fs.readFileSync(indexPath, "utf8");
    
    // Get category order from config
    const categoryOrder = app.options.getValue("categoryOrder") || [];
    
    // Split content by category sections (## Category Name)
    const categorySections = new Map();
    const lines = indexContent.split("\n");
    let currentCategory = null;
    let currentContent = [];
    let preCategoryContent = [];
    let inCategory = false;
    
    for (const line of lines) {
      // Check if this is a category header (## Category, but not ###)
      if (line.match(/^##\s+[^#]/)) {
        // Save previous category
        if (currentCategory) {
          categorySections.set(currentCategory, currentContent.join("\n"));
        }
        // Start new category
        currentCategory = line.substring(3).trim();
        currentContent = [line];
        inCategory = true;
      } else if (inCategory) {
        currentContent.push(line);
      } else {
        // Content before first category
        preCategoryContent.push(line);
      }
    }
    
    // Save last category
    if (currentCategory) {
      categorySections.set(currentCategory, currentContent.join("\n"));
    }
    
    // Order categories according to categoryOrder
    const orderedCategories = [];
    const unorderedCategories = [];
    
    categorySections.forEach((content, category) => {
      if (categoryOrder.includes(category)) {
        orderedCategories.push({ category, content, index: categoryOrder.indexOf(category) });
      } else {
        unorderedCategories.push({ category, content });
      }
    });
    
    orderedCategories.sort((a, b) => a.index - b.index);
    const allCategories = [...orderedCategories, ...unorderedCategories];
    
    // Generate category pages
    allCategories.forEach(({ category, content }) => {
      const fileName = category.toLowerCase().replace(/\s+/g, "-") + ".md";
      const filePath = path.join(outputDir, fileName);
      
      // Convert ## Category to # Category for the category page
      const categoryContent = content.replace(/^##\s+/, "# ");
      fs.writeFileSync(filePath, categoryContent);
    });
    
    // Update index.md to remove category sections and add links
    const preCategoryText = preCategoryContent.join("\n").trim();
    
    // Build category links
    const categoryLinks = allCategories
      .map(({ category }) => {
        const fileName = category.toLowerCase().replace(/\s+/g, "-") + ".md";
        return `- [${category}](${fileName})`;
      })
      .join("\n");
    
    // Construct new index content
    let newIndexContent = preCategoryText;
    
    // Add category links section
    if (categoryLinks) {
      newIndexContent += "\n\n## API Reference\n\n" + categoryLinks;
    }
    
    fs.writeFileSync(indexPath, newIndexContent);
  });
}

