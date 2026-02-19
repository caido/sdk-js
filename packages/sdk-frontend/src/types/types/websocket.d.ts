import type { As, ComponentDefinition, ID, Prettify } from "./utils";
/**
 * Certificate page context.
 * @category Websockets
 */
export type WebsocketPageContext = {
    kind: "Websocket";
};
/**
 * A complete message with all metadata and raw content.
 * @category Websockets
 */
export type StreamWsMessageMeta = Prettify<As<"StreamWsMessageMeta"> & {
    id: ID;
    streamId: ID;
    head: {
        id: ID;
        length: number;
        direction: "CLIENT" | "SERVER";
        format: "BINARY" | "TEXT";
        createdAt: Date;
    };
}>;
/**
 * Options for defining a custom message view mode.
 * @category Websockets
 */
export type MessageViewModeOptions = {
    /**
     * The label of the view mode.
     */
    label: string;
    /**
     * The component to render when the view mode is selected.
     */
    view: ComponentDefinition;
    /**
     * A function that determines if the view mode should be shown for a given message.
     */
    when?: (message: StreamWsMessageMeta) => boolean;
};
