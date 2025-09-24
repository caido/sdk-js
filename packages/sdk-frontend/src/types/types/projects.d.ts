import { type ID } from "./utils";
/**
 * Event fired when the selected project changes.
 * @category Projects
 */
export type SelectedProjectChangeEvent = {
    projectId: ID | undefined;
};
