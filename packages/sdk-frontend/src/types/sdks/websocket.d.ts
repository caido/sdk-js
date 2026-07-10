import type { MessageViewModeOptions } from "../types/websocket";
/**
 * Utilities to interact with websockets
 * @category Websockets
 */
export type WebsocketSDK = {
    /**
     * Add a custom message view mode.
     * @param options The view mode options.
     */
    addMessageViewMode: (options: MessageViewModeOptions) => void;
};
