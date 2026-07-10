import { type ListenerHandle } from "src/types/utils";
import { type HostedFile } from "../types/files";
/**
 * SDK for interacting with the Files page.
 * @category Files
 */
export type FilesSDK = {
    /**
     * Gets all hosted files.
     * @returns The files.
     */
    getAll: () => HostedFile[];
    /**
     * Uploads a file to the host.
     * @param file The file to upload.
     * @returns The uploaded file.
     */
    create: (file: File) => Promise<HostedFile>;
    /**
     * Renames a file on the host.
     * @param id The ID of the file to rename.
     * @param name The new name of the file.
     * @returns The renamed file.
     */
    rename: (id: string, name: string) => Promise<HostedFile>;
    /**
     * Deletes a file from the host.
     * @param id The ID of the file to delete.
     * @returns The deleted file.
     */
    delete: (id: string) => Promise<void>;
    /**
     * Listen for uploaded hosted files.
     * @param callback The callback function that receives the hosted file.
     * @returns A handle object with a `stop` method to stop listening.
     * @example
     *
     * const handle = sdk.files.onUploadedHostedFile((hostedFile) => {
     *   console.log(`Hosted file uploaded:`, hostedFile);
     * });
     *
     * // Later, stop listening
     * handle.stop();
     */
    onUploadedHostedFile: (callback: (event: HostedFile) => void) => ListenerHandle;
    /**
     * Listen for updated hosted files.
     * @param callback The callback function that receives the hosted file.
     * @returns A handle object with a `stop` method to stop listening.
     * @example
     *
     * const handle = sdk.files.onUpdatedHostedFile((hostedFile) => {
     *   console.log(`Hosted file updated:`, hostedFile);
     * });
     *
     * // Later, stop listening
     * handle.stop();
     */
    onUpdatedHostedFile: (callback: (event: HostedFile) => void) => ListenerHandle;
    /**
     * Listen for deleted hosted files.
     * @param callback The callback function that receives the file ID.
     * @returns A handle object with a `stop` method to stop listening.
     * @example
     *
     * const handle = sdk.files.onDeletedHostedFile((fileId) => {
     *   console.log(`Hosted file deleted:`, fileId);
     * });
     *
     * // Later, stop listening
     * handle.stop();
     */
    onDeletedHostedFile: (callback: (fileId: string) => void) => ListenerHandle;
};
