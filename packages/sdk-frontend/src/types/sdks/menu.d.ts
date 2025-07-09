import { type MenuItem } from "../types/menu";
/**
 * Utilities to insert menu items and context-menus throughout the UI.
 * @category Menu
 */
export type MenuSDK = {
    /**
     * Register a menu item.
     * @param item The menu item to register.
     *
     * @example
     * ```ts
     * sdk.menu.registerItem({
     *   type: "Request",
     *   commandId: "hello",
     *   leadingIcon: "fas fa-hand",
     * });
     * ```
     */
    registerItem: (item: MenuItem) => void;
};
