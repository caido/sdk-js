import type { EditorView } from "@codemirror/view";
/**
 * Generic editor interface.
 */
export type Editor = {
    /**
     * Get the currently selected text of the editor.
     */
    getSelectedText: () => string;
    /**
     * Replace the currently selected text of the editor.
     * @param text The text to replace the selection with.
     */
    replaceSelectedText: (text: string) => void;
    /**
     * Check whether the editor is read-only.
     * @returns Whether the editor is read-only.
     */
    isReadOnly: () => boolean;
    /**
     * Focus the editor.
     */
    focus: () => void;
};
export type HTTPRequestEditor = {
    getElement: () => HTMLElement;
    getEditorView: () => EditorView;
};
export type HTTPResponseEditor = {
    getElement: () => HTMLElement;
    getEditorView: () => EditorView;
};
