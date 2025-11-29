import { promises as fs } from "fs";
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
  app.renderer.on(RendererEvent.END, async () => {
    const logger = app.logger;

    try {
      const outputDir = app.options.getValue("out");
      const indexPath = path.join(outputDir, "index.md");

      // Ensure index.md exists before doing any work
      try {
        await fs.access(indexPath);
      } catch {
        logger.warn("[category-splitter] index.md not found, skipping split.");
        return;
      }

      const indexContent = await fs.readFile(indexPath, "utf8");
      const categoryOrder = app.options.getValue("categoryOrder") || [];
      const orderMap = buildCategoryOrderMap(categoryOrder);
      const { preContent, categories } = parseIndexFile(indexContent);

      if (!categories.length) {
        logger.warn("[category-splitter] No category headings found, skipping split.");
        return;
      }

      const normalizedCategories = normalizeCategories(categories, orderMap);
      const sdkCategory = normalizedCategories.find(cat => cat.name === "SDK") || null;
      const otherCategories = normalizedCategories.filter(cat => cat.name !== "SDK");
      const anchorIndex = buildAnchorIndex(sdkCategory, otherCategories);
      const reportedMissing = new Set();
      const reportMissingAnchor = (anchor, fileName) => {
        const key = `${fileName}:${anchor}`;
        if (reportedMissing.has(key)) return;
        reportedMissing.add(key);
        logger.warn(`[category-splitter] Unable to resolve anchor "${anchor}" referenced from ${fileName}.`);
      };

      await writeCategoryFiles(otherCategories, outputDir, anchorIndex, reportMissingAnchor);
      await writeIndexFile({
        indexPath,
        preContent,
        sdkCategory,
        categories: otherCategories,
        anchorIndex,
        reportMissingAnchor,
      });
    } catch (error) {
      logger.error(`[category-splitter] Failed to split categories: ${error instanceof Error ? error.stack || error.message : String(error)}`);
    }
  });
}

/**
 * Build a map of category names to their configured order index.
 * @param {string[]} categoryOrder
 */
function buildCategoryOrderMap(categoryOrder) {
  return categoryOrder.reduce((map, name, index) => {
    map.set(normalizeCategoryName(name), index);
    return map;
  }, new Map());
}

/**
 * @typedef {{ name: string, content: string }} ParsedCategory
 */

/**
 * Parse the rendered index into preamble content and category blocks.
 * @param {string} content
 * @returns {{ preContent: string, categories: ParsedCategory[] }}
 */
function parseIndexFile(content) {
  const headingPattern = /^##\s+(?!#)(.+)$/gm;
  const matches = [];
  let match;

  while ((match = headingPattern.exec(content)) !== null) {
    matches.push({ name: match[1].trim(), start: match.index });
  }

  if (!matches.length) {
    return { preContent: content, categories: [] };
  }

  const categories = matches.map((entry, index) => {
    const end = matches[index + 1]?.start ?? content.length;
    return {
      name: entry.name,
      content: content.slice(entry.start, end).trim(),
    };
  });

  return {
    preContent: content.slice(0, matches[0].start).trim(),
    categories,
  };
}

/**
 * Normalize the categories, respecting configured order and ensuring "Other" exists.
 * @param {ParsedCategory[]} categories
 * @param {Map<string, number>} orderMap
 */
function normalizeCategories(categories, orderMap) {
  /** @type {Array<ParsedCategory & { fileName: string, orderIndex?: number, originalIndex: number }>} */
  const ordered = [];
  const unordered = [];

  categories.forEach((category, index) => {
    const name = normalizeCategoryName(category.name);
    const normalized = {
      ...category,
      name,
      fileName: name === "SDK" ? "index.md" : categoryToFileName(name),
      originalIndex: index,
    };
    const orderIndex = orderMap.get(name);

    if (typeof orderIndex === "number") {
      ordered.push({ ...normalized, orderIndex });
    } else {
      unordered.push(normalized);
    }
  });

  if (!ordered.length && !unordered.length) {
    return [];
  }

  if (![...ordered, ...unordered].some(cat => cat.name === "Other")) {
    const otherCategory = {
      name: "Other",
      content: "## Other\n",
      fileName: categoryToFileName("Other"),
      originalIndex: Number.MAX_SAFE_INTEGER,
    };
    const otherOrderIndex = orderMap.get("Other");
    if (typeof otherOrderIndex === "number") {
      ordered.push({ ...otherCategory, orderIndex: otherOrderIndex });
    } else {
      unordered.push(otherCategory);
    }
  }

  ordered.sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0));
  unordered.sort((a, b) => a.originalIndex - b.originalIndex);

  return [...ordered, ...unordered];
}

/**
 * Extract anchor map across SDK + category files.
 * @param {{ content: string } | null} sdkCategory
 * @param {Array<{ name: string, content: string, fileName: string }>} categories
 */
function buildAnchorIndex(sdkCategory, categories) {
  const anchorIndex = new Map();

  if (sdkCategory) {
    registerAnchors(anchorIndex, sdkCategory.content, "index.md");
  }

  categories.forEach(category => {
    registerAnchors(anchorIndex, category.content, category.fileName, category.name === "Other");
  });

  return anchorIndex;
}

/**
 * Write category files with rewritten links.
 * @param {Array<{ name: string, content: string, fileName: string }>} categories
 * @param {string} outputDir
 * @param {Map<string, string>} anchorIndex
 * @param {(anchor: string, fileName: string) => void} reportMissingAnchor
 */
async function writeCategoryFiles(categories, outputDir, anchorIndex, reportMissingAnchor) {
  await Promise.all(
    categories.map(async category => {
      const filePath = path.join(outputDir, category.fileName);
      const headingPromoted = promoteCategoryHeading(category.content);
      const rewritten = fixLinks(headingPromoted, category.fileName, anchorIndex, reportMissingAnchor);
      await fs.writeFile(filePath, ensureTrailingNewline(rewritten.trim()));
    })
  );
}

/**
 * Write the rebuilt index.md file.
 * @param {{
 *   indexPath: string;
 *   preContent: string;
 *   sdkCategory: { content: string } | null;
 *   categories: Array<{ name: string, fileName: string }>;
 *   anchorIndex: Map<string, string>;
 *   reportMissingAnchor: (anchor: string, fileName: string) => void;
 * }} params
 */
async function writeIndexFile({ indexPath, preContent, sdkCategory, categories, anchorIndex, reportMissingAnchor }) {
  const sections = [];
  const normalizedPreContent = preContent.trim();

  if (normalizedPreContent) {
    sections.push(fixLinks(normalizedPreContent, "index.md", anchorIndex, reportMissingAnchor));
  }

  if (sdkCategory) {
    sections.push(fixLinks(sdkCategory.content.trim(), "index.md", anchorIndex, reportMissingAnchor));
  }

  if (categories.length) {
    const categoryLinks = categories
      .map(category => `- [${category.name}](${category.fileName})`)
      .join("\n");

    if (categoryLinks) {
      sections.push("## API Reference\n\n" + categoryLinks);
    }
  }

  const content = ensureTrailingNewline(sections.filter(Boolean).join("\n\n"));
  await fs.writeFile(indexPath, content);
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
function fixLinks(content, currentFile, anchorToCategoryFile, reportMissingAnchor) {
  if (!content) return content;

  const linkPattern = /\[([^\]]+)\]\((?:\.\/)?([^)#\s]+\.md)#([^)]+)\)/gi;

  return content.replace(linkPattern, (match, text, _file, anchor) => {
    const normalizedAnchor = anchor.toLowerCase();
    const targetFile = anchorToCategoryFile.get(normalizedAnchor);

    if (targetFile) {
      if (targetFile === currentFile) {
        return `[${text}](#${anchor})`;
      }
      return `[${text}](${targetFile}#${anchor})`;
    }

    reportMissingAnchor?.(normalizedAnchor, currentFile);
    return match;
  });
}

/**
 * Register anchors for a given category in the shared anchor map.
 * @param {Map<string, string>} anchorIndex
 * @param {string} content
 * @param {string} fileName
 * @param {boolean} [prefer]
 */
function registerAnchors(anchorIndex, content, fileName, prefer = false) {
  const anchors = extractAnchors(content);
  anchors.forEach(anchor => {
    if (!anchorIndex.has(anchor) || prefer) {
      anchorIndex.set(anchor, fileName);
    }
  });
}

/**
 * Promote the leading category heading from H2 to H1 for standalone files.
 * @param {string} content
 */
function promoteCategoryHeading(content) {
  return content.replace(/^##\s+/m, "# ");
}

/**
 * Normalize category names.
 * @param {string} name
 */
function normalizeCategoryName(name) {
  const trimmed = name.trim();
  return trimmed === "*" ? "Other" : trimmed;
}

/**
 * Build a safe file name from a category name.
 * @param {string} name
 */
function categoryToFileName(name) {
  return `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "category"}.md`;
}

/**
 * Ensure all generated files end with a newline.
 * @param {string} content
 */
function ensureTrailingNewline(content) {
  return content.endsWith("\n") ? content : `${content}\n`;
}

