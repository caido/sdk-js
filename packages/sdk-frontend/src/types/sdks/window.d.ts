import type { Editor } from "../types/editor";
import type { ComponentDefinition, ListenerHandle } from "../types/utils";
import { type Dialog, type DialogOptions, type GlobalContext } from "../types/window";
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
     * Show a toast message.
     * @param message The message to show.
     * @param options Options for the toast message.
     * @param options.variant The variant of the toast message.
     * @param options.duration The duration of the toast message in milliseconds.
     */
    showToast: (message: string, options?: {
        variant?: "success" | "error" | "warning" | "info";
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
    showDialog: (component: ComponentDefinition, options?: DialogOptions) => Dialog;
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
