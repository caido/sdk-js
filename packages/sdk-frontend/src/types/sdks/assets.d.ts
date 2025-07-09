import { type Asset } from "../types/assets";
/**
 * Utilities to interact with the plugin's static assets.
 * @category Files
 */
export type AssetsSDK = {
    /**
     * Get a file from the assets folder.
     * @returns The asset file.
     */
    get: (path: string) => Promise<Asset>;
};
