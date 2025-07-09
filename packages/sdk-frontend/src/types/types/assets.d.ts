/**
 * A static asset.
 * @category Files
 */
export type Asset = {
    asReadableStream: () => ReadableStream;
    asArrayBuffer: () => Promise<ArrayBuffer>;
    asString: () => Promise<string>;
    asJson: <T = unknown>() => Promise<T>;
};
