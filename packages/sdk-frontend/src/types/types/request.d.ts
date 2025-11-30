import { type As, type ComponentDefinition, type ID, type Prettify } from "./utils";
/**
 * A draft request that has not yet been saved to the database.
 * @category Request
 */
export type RequestDraft = Prettify<As<"RequestDraft"> & {
    host: string;
    port: number;
    path: string;
    query: string;
    isTls: boolean;
    raw: string;
}>;
/**
 * Metadata about a request without the raw content.
 * @category Request
 */
export type RequestMeta = Prettify<As<"RequestMeta"> & {
    id: ID;
    host: string;
    port: number;
    path: string;
    query: string;
    isTls: boolean;
    streamId: ID | undefined;
}>;
/**
 * A complete request with all metadata and raw content.
 * @category Request
 */
export type RequestFull = Prettify<As<"RequestFull"> & {
    id: ID;
    host: string;
    port: number;
    path: string;
    query: string;
    isTls: boolean;
    streamId: ID | undefined;
    raw: string;
}>;
/**
 * Options for defining a custom request view mode.
 * @category Request
 */
export type RequestViewModeOptions = {
    /**
     * The label of the view mode.
     */
    label: string;
    /**
     * The component to render when the view mode is selected.
     */
    view: ComponentDefinition;
};
