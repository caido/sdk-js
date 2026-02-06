import type { CachedToken, TokenCache } from "./types.js";

import type { Maybe } from "@/utils/optional.js";
import { isAbsent } from "@/utils/optional.js";

export interface FileTokenCacheOptions {
  path?: string;
}

export class FileTokenCache implements TokenCache {
  private readonly path: string;

  constructor(options?: FileTokenCacheOptions) {
    this.path = options?.path ?? ".caido-token.json";
  }

  async load(): Promise<Maybe<CachedToken>> {
    try {
      const fs = await import("node:fs/promises");
      const path = await this.resolvePath();

      const data = await fs.readFile(path, "utf-8");
      const parsed = JSON.parse(data) as {
        accessToken?: string;
        refreshToken?: string;
        expiresAt?: string;
      };

      if (isAbsent(parsed.accessToken)) return undefined;

      return {
        accessToken: parsed.accessToken,
        refreshToken: parsed.refreshToken,
        expiresAt: parsed.expiresAt,
      };
    } catch {
      return undefined;
    }
  }

  async save(token: CachedToken): Promise<void> {
    try {
      const fs = await import("node:fs/promises");
      const nodePath = await import("node:path");
      const resolvedPath = await this.resolvePath();

      const dir = nodePath.dirname(resolvedPath);
      await fs.mkdir(dir, { recursive: true });

      const data = JSON.stringify(token, null, 2);
      await fs.writeFile(resolvedPath, data, { mode: 0o600 });
    } catch {
      // Silently fail on cache write errors
    }
  }

  async clear(): Promise<void> {
    try {
      const fs = await import("node:fs/promises");
      const resolvedPath = await this.resolvePath();
      await fs.unlink(resolvedPath);
    } catch {
      // Silently fail if file doesn't exist
    }
  }

  private async resolvePath(): Promise<string> {
    const nodePath = await import("node:path");
    if (nodePath.isAbsolute(this.path)) {
      return this.path;
    }
    return nodePath.join(process.cwd(), this.path);
  }
}
