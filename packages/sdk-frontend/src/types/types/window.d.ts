/**
 * Options for configuring a dialog.
 * @category Window
 */
export type DialogOptions = {
    title?: string;
    draggable?: boolean;
    closeOnEscape?: boolean;
    closable?: boolean;
    modal?: boolean;
    position?: "left" | "right" | "top" | "bottom" | "center" | "topleft" | "topright" | "bottomleft" | "bottomright";
};
/**
 * A dialog instance that can be closed programmatically.
 * @category Window
 */
export type Dialog = {
    close: () => void;
};
