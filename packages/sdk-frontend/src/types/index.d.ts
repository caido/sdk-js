import type { Sdk as GraphqlSDK } from "./__generated__/graphql-sdk";
import type { BackendEndpoints, BackendEvents, BackendSDK } from "./backend";
import type { CommandPaletteSDK } from "./command_palette";
import type { CommandsSDK } from "./commands";
import type { FindingsSDK } from "./findings";
import type { MenuSDK } from "./menu";
import type { NavigationSDK } from "./navigation";
import type { ScopesSDK } from "./scopes";
import type { ShortcutsSDK } from "./shortcuts";
import type { SidebarSDK } from "./sidebar";
import type { StorageSDK } from "./storage";
import type { UISDK } from "./ui";
import type { WindowSDK } from "./window";
export type { CommandContext } from "./commands";
export type { MenuItem } from "./menu";
/**
 * Utilities for frontend plugins.
 * @category SDK
 */
export type API<T extends BackendEndpoints = Record<string, never>, E extends BackendEvents = Record<string, never>> = {
    /**
     * Utilities to interact with the GraphQL API.
     */
    graphql: GraphqlSDK;
    /**
     * Utilities to interact with the backend plugin.
     */
    backend: BackendSDK<T, E>;
    /**
     * Utilities to create UI components.
     */
    ui: UISDK;
    /**
     * Utilities to interact with scopes
     */
    scopes: ScopesSDK;
    /**
     * Utilities to interact with findings
     */
    findings: FindingsSDK;
    /**
     * Utilities to interact with commands
     */
    commands: CommandsSDK;
    /**
     * Utilities to insert menu items and context-menus throughout the UI.
     */
    menu: MenuSDK;
    /**
     * Utilities to interact with navigation.
     */
    navigation: NavigationSDK;
    /**
     * Utilities to interact with the active page.
     */
    window: WindowSDK;
    /**
     * Utilities to interact with frontend-plugin storage.
     */
    storage: StorageSDK;
    /**
     * Utilities to interact with shortcuts.
     */
    shortcuts: ShortcutsSDK;
    /**
     * Utilities to interact with the command palette.
     */
    commandPalette: CommandPaletteSDK;
    /**
     * Utilities to interact with the sidebar.
     */
    sidebar: SidebarSDK;
};
