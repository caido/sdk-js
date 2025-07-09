import { type Component } from "vue";
export type RequestViewModeOptions = {
    /**
     * The label of the view mode.
     */
    label: string;
    /**
     * The component to render when the view mode is selected.
     */
    component: Component;
};
