export type Window = {
    getActiveEditor: () => Editor | undefined;
    showToast: (message: string, options?: ToastOptions) => void;
};
type ToastOptions = {
    variant?: "success" | "error" | "warning" | "info";
    duration?: number;
};
type Editor = {
    getSelectedText: () => string;
    replaceSelectedText: (text: string) => void;
    isReadOnly: () => boolean;
    focus: () => void;
};
export {};
