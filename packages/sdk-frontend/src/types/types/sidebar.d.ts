/**
 * Represents a sidebar item.
 * @category Sidebar
 */
export type SidebarItem = {
    /**
     * Set the value of a notification badge next to the sidebar item.
     * @param count - The number to display in the badge. A value of 0 will hide the badge.
     */
    setCount: (count: number) => void;
};
