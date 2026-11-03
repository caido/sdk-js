import type { Editor } from "../types/editor";
import type { ListenerHandle } from "../types/utils";
import { type Dialog, type DialogComponent, type DialogOptions, type GlobalContext } from "../types/window";
/**
 * Utilities to interact with the active page.
 * @category Window
 */
export type WindowSDK = {
    /**
     * Get the active editor.
     * @returns The active editor.
     */
    getActiveEditor: () => Editor | undefined;
    /**
     * Get the active request editor.
     * @returns The active request editor.
     */
    getActiveRequestEditor: () => Editor | undefined;
    /**
     * Get the active response editor.
     * @returns The active response editor.
     */
    getActiveResponseEditor: () => Editor | undefined;
    /**
     * Show a toast message.
     * @param message The message to show.
     * @param options Options for the toast message.
     */
    showToast: (message: string, options?: {
        /**
         * The variant of the toast message.
         */
        variant?: "success" | "error" | "warning" | "info";
        /**
         * How long the toast stays on screen, in milliseconds.
         *
         * When omitted, `success` and `info` are dismissed on their own after a
         * duration derived from the length of the message, and `error` and
         * `warning` stay until they are dismissed.
         */
        duration?: number;
    }) => void;
    /**
     * Show a dialog component.
     * @param component The custom slot content to display in the dialog.
     * @param options Options for the dialog.
     * @param options.title The title text for the dialog. Defaults to ""
     * @param options.draggable Whether the dialog is draggable. Defaults to false
     * @param options.closeOnEscape Whether the dialog closes when pressing Escape. Defaults to true
     * @param options.modal Whether the dialog is modal. Defaults to true
     * @param options.position The position of the dialog on the screen. Defaults to center
     * @param options.closable Whether the close icon is hidden . Defaults to false
     * @returns A dialog object that can be used to close the dialog.
     */
    showDialog: (component: DialogComponent, options?: DialogOptions) => Dialog;
    /**
     * Get the current global context.
     * @returns The current global context.
     */
    getContext: () => GlobalContext;
    /**
     * Subscribe to global context changes.
     * @param callback The callback to call when the context changes.
     * @returns An object with a `stop` method that can be called to stop listening to context changes.
     */
    onContextChange: (callback: (context: GlobalContext) => void) => ListenerHandle;
};
