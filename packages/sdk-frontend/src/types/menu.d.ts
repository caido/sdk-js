export type MenuItem = RequestRowMenuItem | SettingsMenuItem | RequestMenuItem | ResponseMenuItem;
/**
 * A context-menu item that appears when right-clicking a request row.
 */
type RequestRowMenuItem = {
    type: "RequestRow";
    /**
     * The command ID to execute when the menu item is clicked.
     */
    commandId: string;
    /**
     * The icon to display to the left of the menu item.
     */
    leadingIcon?: string;
};
/**
 * A context-menu item that appears when right-clicking a request pane.
 */
type RequestMenuItem = {
    type: "Request";
    /**
     * The command ID to execute when the menu item is clicked.
     */
    commandId: string;
    /**
     * The icon to display to the left of the menu item.
     */
    leadingIcon?: string;
};
/**
 * A context-menu item that appears when right-clicking a response pane.
 */
type ResponseMenuItem = {
    type: "Response";
    /**
     * The command ID to execute when the menu item is
     */
    commandId: string;
    /**
     * The icon to display to the left of the menu item.
     */
    leadingIcon?: string;
};
/**
 * A menu item that appears in the settings menu.
 */
type SettingsMenuItem = {
    type: "Settings";
    /**
     * The label of the menu item.
     */
    label: string;
    /**
     * The path that the user will be navigated to when the menu item is clicked
     */
    path: string;
    /**
     * The icon to display to the left of the menu item.
     */
    leadingIcon?: string;
};
export {};
