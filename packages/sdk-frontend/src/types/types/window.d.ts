export type DialogOptions = {
    title?: string;
    draggable?: boolean;
    closeOnEscape?: boolean;
    closable?: boolean;
    modal?: boolean;
    position?: "left" | "right" | "top" | "bottom" | "center" | "topleft" | "topright" | "bottomleft" | "bottomright";
};
export type Dialog = {
    close: () => void;
};
