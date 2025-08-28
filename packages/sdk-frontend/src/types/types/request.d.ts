import { type As, type ComponentDefinition, type ID, type Prettify } from "./utils";
export type RequestDraft = Prettify<As<"RequestDraft"> & {
    host: string;
    port: number;
    path: string;
    query: string;
    isTls: boolean;
    raw: string;
}>;
export type RequestMeta = Prettify<As<"RequestMeta"> & {
    id: ID;
    host: string;
    port: number;
    path: string;
    query: string;
    isTls: boolean;
    streamId: ID | undefined;
}>;
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
