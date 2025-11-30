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
    
    // Build anchor index: map anchor -> fileName
    // Also track anchor metadata: map anchor -> { fileName, level, heading }
    const anchorIndex = new Map();
    const anchorMetadata = new Map(); // anchor -> { fileName, level, heading }
    
    // First, extract anchors from category files (definitions take precedence)
    categoryPages.forEach(category => {
      const fileName = categoryToFileName(category.name);
      const anchors = extractAnchors(category.content);
      anchors.forEach((metadata, anchor) => {
        const existing = anchorMetadata.get(anchor);
        // Prefer H3 headings (type definitions) over deeper headings
        // If same level, category files take precedence over SDK category
        if (!existing || (metadata.level === 3 && existing.level > 3) || 
            (metadata.level === existing.level && existing.fileName === "index.md")) {
          anchorIndex.set(anchor, fileName);
          anchorMetadata.set(anchor, { fileName, ...metadata });
        }
      });
    });
    
    // Then, extract anchors from SDK category (stays in index.md)
    // Only add anchors that aren't already in category files, or if they're type definitions (H3)
    if (sdkCategory) {
      const anchors = extractAnchors(sdkCategory.content);
      anchors.forEach((metadata, anchor) => {
        const existing = anchorMetadata.get(anchor);
        // Add if not exists, or if this is a type definition (H3) and existing is not
        if (!existing || (metadata.level === 3 && existing.level > 3)) {
          anchorIndex.set(anchor, "index.md");
          anchorMetadata.set(anchor, { fileName: "index.md", ...metadata });
        }
      });
    }
    
    // Write category files with fixed links
    for (const category of categoryPages) {
      const fileName = categoryToFileName(category.name);
      const filePath = path.join(outputDir, fileName);
      
      // Promote H2 to H1 for standalone category pages
      let content = category.content.replace(/^##\s+/m, "# ");
      
      // Fix links to point to correct category files
      content = fixLinks(content, fileName, anchorIndex);
      
      await fs.writeFile(filePath, content + "\n", "utf8");
    }
    
    // Rebuild index.md with SDK category + links to category pages
    const sections = [];
    
    if (preContent) {
      sections.push(fixLinks(preContent, "index.md", anchorIndex));
    }
    
    if (sdkCategory) {
      sections.push(fixLinks(sdkCategory.content, "index.md", anchorIndex));
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
 * Extract anchor names from markdown content.
 * Returns a Map of anchor -> { level, heading } where level is the heading depth (3 = H3, 4 = H4, etc.)
 * TypeDoc generates anchors by lowercasing the heading text and removing special characters.
 */
function extractAnchors(content) {
  const anchors = new Map(); // anchor -> { level, heading }
  
  // Extract from headings (### TypeName becomes typename)
  const headingMatches = content.matchAll(/^(###+)\s+(.+)$/gm);
  for (const match of headingMatches) {
    const level = match[1].length; // Number of # characters
    const heading = match[2].trim();
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
    
    // Convert to anchor format (lowercase, remove special chars, spaces to dashes)
    const anchor = baseName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '');
    
    if (anchor) {
      // Prefer H3 headings (type definitions) over deeper headings (properties/parameters)
      const existing = anchors.get(anchor);
      if (!existing || (level === 3 && existing.level > 3)) {
        anchors.set(anchor, { level, heading: cleanHeading });
      }
    }
  }
  
  // Also extract from existing links to catch all anchors (but don't override type definitions)
  const linkMatches = content.matchAll(/\[([^\]]+)\]\([^)]*#([^)]+)\)/g);
  for (const match of linkMatches) {
    const anchor = match[2].toLowerCase();
    if (!anchors.has(anchor)) {
      anchors.set(anchor, { level: 999, heading: '' }); // Unknown level, lowest priority
    }
  }
  
  return anchors;
}

/**
 * Normalize text to match anchor format (lowercase, remove special chars).
 */
function normalizeToAnchor(text) {
  return text
    .replace(/[`*]/g, '') // Remove markdown formatting
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');
}

/**
 * Fix links in markdown content to point to the correct category files.
 */
function fixLinks(content, currentFile, anchorIndex) {
  if (!content) return content;
  
  // Pattern: [text](file.md#anchor) or [text](#anchor)
  const linkPattern = /\[([^\]]+)\]\((?:\.\/)?([^)#\s]*\.md)?#([^)]+)\)/gi;
  
  return content.replace(linkPattern, (match, text, file, anchor) => {
    const normalizedAnchor = anchor.toLowerCase();
    const linkText = normalizeToAnchor(text);
    
    // Check if this is a numbered anchor (e.g., "id-3", "workflowkind-1")
    // TypeDoc creates numbered anchors when there are conflicts, but the actual
    // type definition usually has the base anchor (e.g., "id", "workflowkind")
    const numberedAnchorMatch = normalizedAnchor.match(/^(.+)-(\d+)$/);
    if (numberedAnchorMatch) {
      const baseAnchor = numberedAnchorMatch[1];
      const baseFile = anchorIndex.get(baseAnchor);
      
      // If the link text matches the base anchor name, prefer the base anchor
      // This handles cases where TypeDoc links to a numbered anchor but the
      // actual type definition is in another file with the base anchor
      if (baseFile && linkText === baseAnchor) {
        if (baseFile === currentFile) {
          return `[${text}](#${baseAnchor})`;
        } else {
          return `[${text}](${baseFile}#${baseAnchor})`;
        }
      }
    }
    
    // Try the exact anchor match
    const targetFile = anchorIndex.get(normalizedAnchor);
    
    if (targetFile) {
      if (targetFile === currentFile) {
        // Same file, use anchor only
        return `[${text}](#${anchor})`;
      } else {
        // Different file, include file path
        return `[${text}](${targetFile}#${anchor})`;
      }
    }
    
    // Anchor not found, keep original link
    return match;
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
