import { type EditorView } from "@codemirror/view";
import { type API } from "../sdks";
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
 * The internal props for the request read-only view mode.
 * @category Request
 */
export type RequestReadableViewModePropsInternal = {
    request: RequestFull;
    view: EditorView;
};
/**
 * The internal props for the request writable view mode.
 * @category Request
 */
export type RequestWritableViewModePropsInternal = {
    request: RequestFull | undefined;
    draft: RequestDraft;
    view: EditorView;
};
/**
 * The props for the request writable view mode.
 * @category Request
 */
export type RequestWritableViewModeProps = RequestWritableViewModePropsInternal & {
    sdk: API;
};
/**
 * The props for the request read-only view mode.
 * @category Request
 */
export type RequestReadableViewModeProps = RequestReadableViewModePropsInternal & {
    sdk: API;
};
/**
 * The props group for the request view mode.
 * @category Request
 */
export type RequestViewModeProps = RequestReadableViewModeProps | RequestWritableViewModeProps | RequestReadableViewModePropsInternal | RequestWritableViewModePropsInternal;
/**
 * Options for defining a custom request view mode.
 * @category Request
 */
export type RequestViewModeOptions<TProps extends RequestViewModeProps> = {
    /**
     * The label of the view mode.
     */
    label: string;
    /**
     * The component to render when the view mode is selected.
     */
    view: ComponentDefinition<TProps>;
    /**
     * A function that determines if the view mode should be shown for a given request.
     */
    when?: (request: RequestFull | RequestDraft) => boolean;
};
