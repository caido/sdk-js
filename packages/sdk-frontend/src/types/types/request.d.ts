import { type ComponentDefinition } from "./utils";
export type RequestViewModeOptions = {
    /**
     * The label of the view mode.
     */
    label: string;
    /**
     * The component to render when the view mode is selected.
     */
    view: ComponentDefinition;
};
