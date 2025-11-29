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
    
    // Ensure "Other" category exists (for uncategorized items)
    // TypeDoc uses "*" in categoryOrder to represent uncategorized items, which becomes "Other"
    const hasOtherCategory = allCategories.some(({ category }) => 
      category === "Other" || category === "*"
    );
    
    // If no "Other" category exists, create an empty one
    if (!hasOtherCategory) {
      allCategories.push({ category: "Other", content: "## Other\n\n", index: Infinity });
    }
    
    // Normalize "*" to "Other" if it exists
    allCategories.forEach(cat => {
      if (cat.category === "*") {
        cat.category = "Other";
      }
    });
    
    // Separate SDK category from others (SDK stays in index, others get separate files)
    const sdkCategory = allCategories.find(({ category }) => category === "SDK");
    const otherCategories = allCategories.filter(({ category }) => category !== "SDK");
    
    // Build a map of anchor names to category file names
    // This will be used to fix links later
    const anchorToCategoryFile = new Map();
    
    // Extract anchors from each category and map them to their category file
    // If an anchor appears in multiple categories, prefer "Other" since it's for uncategorized items
    allCategories.forEach(({ category, content }) => {
      if (category === "SDK") {
        // SDK items stay in index.md
        const anchors = extractAnchors(content);
        anchors.forEach(anchor => {
          // Only set if not already mapped (SDK takes precedence)
          if (!anchorToCategoryFile.has(anchor)) {
            anchorToCategoryFile.set(anchor, "index.md");
          }
        });
      } else {
        const fileName = category.toLowerCase().replace(/\s+/g, "-") + ".md";
        const anchors = extractAnchors(content);
        anchors.forEach(anchor => {
          const existingFile = anchorToCategoryFile.get(anchor);
          // If anchor already exists, prefer "Other" category (for uncategorized items)
          if (existingFile) {
            if (category === "Other" || fileName === "other.md") {
              // "Other" takes precedence for uncategorized items
              anchorToCategoryFile.set(anchor, fileName);
            }
            // Otherwise keep the existing mapping
          } else {
            anchorToCategoryFile.set(anchor, fileName);
          }
        });
      }
    });
    
    // Generate category pages for all categories except SDK
    otherCategories.forEach(({ category, content }) => {
      const fileName = category.toLowerCase().replace(/\s+/g, "-") + ".md";
      const filePath = path.join(outputDir, fileName);
      
      // Convert ## Category to # Category for the category page
      let categoryContent = content.replace(/^##\s+/, "# ");
      
      // Fix links in this category file
      categoryContent = fixLinks(categoryContent, fileName, anchorToCategoryFile);
      
      fs.writeFileSync(filePath, categoryContent);
    });
    
    // Build index content: pre-category content + SDK category (if exists) + links to other categories
    let newIndexContent = preCategoryContent.join("\n").trim();
    
    // Add SDK category content to index (keep it in the index)
    if (sdkCategory) {
      // Convert ## SDK to ## SDK for consistency in index
      let sdkContent = sdkCategory.content;
      
      // Fix links in SDK content (should point to index.md or other category files)
      sdkContent = fixLinks(sdkContent, "index.md", anchorToCategoryFile);
      
      newIndexContent += "\n\n" + sdkContent;
    }
    
    // Fix links in pre-category content as well
    newIndexContent = fixLinks(newIndexContent, "index.md", anchorToCategoryFile);
    
    // Build category links (excluding SDK since it's in the index)
    const categoryLinks = otherCategories
      .map(({ category }) => {
        const fileName = category.toLowerCase().replace(/\s+/g, "-") + ".md";
        return `- [${category}](${fileName})`;
      })
      .join("\n");
    
    // Add category links section
    if (categoryLinks) {
      newIndexContent += "\n\n## API Reference\n\n" + categoryLinks;
    }
    
    fs.writeFileSync(indexPath, newIndexContent);
  });
}

/**
 * Extract anchor names from markdown content.
 * TypeDoc generates anchors by lowercasing the heading text and removing special characters.
 * Anchors are typically in headings like ### TypeName or in links like [Text](index.md#anchor)
 */
function extractAnchors(content) {
  const anchors = new Set();
  
  // Extract from headings (### TypeName becomes typename)
  // TypeDoc uses the heading text, lowercased, with special chars removed
  const headingMatches = content.matchAll(/^###+\s+(.+)$/gm);
  for (const match of headingMatches) {
    const heading = match[1].trim();
    // Remove markdown formatting (links, code, HTML tags, etc.)
    let cleanHeading = heading
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove link formatting, keep text
      .replace(/`([^`]+)`/g, '$1') // Remove code formatting, keep text
      .replace(/<[^>]+>/g, '') // Remove HTML tags
      .replace(/\*\*/g, '') // Remove bold markers
      .replace(/\*/g, ''); // Remove italic markers
    
    // Extract the actual type/name (might have generics like Type<T>)
    // For generics, take the part before <
    const baseName = cleanHeading.split('<')[0].trim();
    
    // Convert to anchor format (lowercase, remove special chars)
    const anchor = baseName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '');
    
    if (anchor) {
      anchors.add(anchor);
    }
  }
  
  // Also extract from existing links to catch all anchors
  const linkMatches = content.matchAll(/\[([^\]]+)\]\([^)]*#([^)]+)\)/g);
  for (const match of linkMatches) {
    const anchor = match[2].toLowerCase();
    anchors.add(anchor);
  }
  
  return anchors;
}

/**
 * Fix links in markdown content to point to the correct category files.
 */
function fixLinks(content, currentFile, anchorToCategoryFile) {
  // Replace links like [Text](index.md#anchor) with the correct file
  // Also handle escaped pipes and other markdown edge cases
  return content.replace(/\[([^\]]+)\]\(index\.md#([^)]+)\)/g, (match, text, anchor) => {
    const normalizedAnchor = anchor.toLowerCase();
    const targetFile = anchorToCategoryFile.get(normalizedAnchor);
    
    if (targetFile) {
      // If target is in the same file, use relative anchor
      if (targetFile === currentFile) {
        return `[${text}](#${anchor})`;
      }
      // Otherwise point to the correct category file
      return `[${text}](${targetFile}#${anchor})`;
    }
    
    // If we don't know where it is, keep it pointing to index.md
    // (might be an external reference or something we couldn't map)
    return match;
  });
}

