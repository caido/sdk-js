import type { As, ComponentDefinition, ID, Prettify } from "./utils";
/**
 * A complete response with all metadata and raw content.
 * @category Response
 */
export type ResponseFull = Prettify<As<"ResponseFull"> & {
    id: ID;
    raw: string;
    statusCode: number;
    roundtripTime: number;
    length: number;
    createdAt: Date;
}>;
/**
 * Options for defining a custom response view mode.
 * @category Response
 */
export type ResponseViewModeOptions = {
    /**
     * The label of the view mode.
     */
    label: string;
    /**
     * The component to render when the view mode is selected.
     */
    view: ComponentDefinition;
};
