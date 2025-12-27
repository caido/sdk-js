/**
 * A hosted file.
 * @category Files
 */
export type HostedFile = {
    /**
     * The ID of the file.
     */
    id: string;
    /**
     * The name of the file.
     */
    name: string;
    /**
     * The size of the file in bytes.
     */
    size: number;
    /**
     * The status of the file.
     */
    status: "ready" | "error";
    /**
     * The path of the file.
     */
    path: string;
    /**
     * The date the file was created.
     */
    createdAt: Date;
    /**
     * The date the file was updated.
     */
    updatedAt: Date;
};
/**
 * Files page context.
 * @category Files
 */
export type FilesPageContext = {
    kind: "Files";
};
