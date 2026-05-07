import { type EditorView } from "@codemirror/view";
import type { As, ComponentDefinition, ComponentPropsWithSdk, ID, Prettify } from "./utils";
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
        format: "BINARY" | "CLOSE" | "PING" | "PONG" | "TEXT";
        createdAt: Date;
    };
}>;
/**
 * The internal props for the message view mode.
 * @category Websockets
 */
export type MessageViewModePropsInternal = {
    message: StreamWsMessageMeta;
    view: EditorView;
};
/**
 * The props for the message view mode.
 * @category Websockets
 */
export type MessageViewModeProps = ComponentPropsWithSdk<MessageViewModePropsInternal>;
/**
 * Options for defining a custom message view mode.
 * @category Websockets
 */
export type MessageViewModeOptions<TProps extends MessageViewModeProps | MessageViewModePropsInternal> = {
    /**
     * The label of the view mode.
     */
    label: string;
    /**
     * The component to render when the view mode is selected.
     */
    view: ComponentDefinition<TProps>;
    /**
     * A function that determines if the view mode should be shown for a given message.
     */
    when?: (message: StreamWsMessageMeta) => boolean;
};
