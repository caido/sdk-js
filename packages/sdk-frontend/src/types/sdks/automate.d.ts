import type { Extension } from "@codemirror/state";
import type { RequestViewModeOptions } from "../types/request";
/**
 * Utilities to interact with the Automate page.
 * @category Automate
 */
export type AutomateSDK = {
    /**
     * Add an extension to the request editor.
     * @param extension The extension to add.
     */
    addRequestEditorExtension: (extension: Extension) => void;
    /**
     * Add a custom request view mode.
     * @param options The view mode options.
     */
    addRequestViewMode: (options: RequestViewModeOptions) => void;
};
