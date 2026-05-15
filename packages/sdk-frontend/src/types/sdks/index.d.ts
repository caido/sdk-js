import type { Sdk as GraphqlSDK } from "../__generated__/graphql-sdk";
import type { _AnalyticsSDK } from "../private/analytics";
import { type BackendEndpoints, type BackendEvents } from "../types/backend";
import type { AiSDK } from "./ai";
import type { AssetsSDK } from "./assets";
import type { AutomateSDK } from "./automate";
import type { BackendSDK } from "./backend";
import type { CommandPaletteSDK } from "./commandPalette";
import type { CommandsSDK } from "./commands";
import type { EnvironmentSDK } from "./environment";
import type { FilesSDK } from "./files";
import type { FiltersSDK } from "./filters";
import type { FindingsSDK } from "./findings";
import type { FooterSDK } from "./footer";
import type { HTTPHistorySDK } from "./httpHistory";
import type { InterceptSDK } from "./intercept";
import type { LogSDK } from "./log";
import type { MatchReplaceSDK } from "./matchReplace";
import type { MenuSDK } from "./menu";
import type { NavigationSDK } from "./navigation";
import type { ProjectsSDK } from "./projects";
import type { ReplaySDK } from "./replay";
import type { RuntimeSDK } from "./runtime";
import type { ScopesSDK } from "./scopes";
import type { SearchSDK } from "./search";
import type { SettingsSDK } from "./settings";
import type { ShortcutsSDK } from "./shortcuts";
import type { SidebarSDK } from "./sidebar";
import type { SitemapSDK } from "./sitemap";
import type { StorageSDK } from "./storage";
import type { UISDK } from "./ui";
import type { WindowSDK } from "./window";
import type { WorkflowSDK } from "./workflows";
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
     * Utilities to interact with AI.
     */
    ai: AiSDK;
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
     * Utilities to interact with projects.
     */
    projects: ProjectsSDK;
    /**
     * Utilities to interact with the active page.
     */
    window: WindowSDK;
    /**
     * Utilities to interact with frontend-plugin storage.
     */
    storage: StorageSDK;
    /**
     * Utilities to interact with the plugin's static assets.
     */
    assets: AssetsSDK;
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
    /**
     * Utilities to interact with the Replay page.
     */
    replay: ReplaySDK;
    /**
     * Utilities to interact with the Search page.
     */
    search: SearchSDK;
    /**
     * Utilities to interact with the HTTP History page.
     */
    httpHistory: HTTPHistorySDK;
    /**
     * Utilities to interact with the Automate page.
     */
    automate: AutomateSDK;
    /**
     * Utilities to interact with the Files page.
     */
    files: FilesSDK;
    /**
     * Utilities to interact with Filters page.
     */
    filters: FiltersSDK;
    /**
     * Utilities to interact with Match and Replace page.
     */
    matchReplace: MatchReplaceSDK;
    /**
     * Utilities to interact with the environment.
     */
    env: EnvironmentSDK;
    /**
     * Utilities to interact with the Sitemap page.
     */
    sitemap: SitemapSDK;
    /**
     * Utilities to interact with the Intercept page.
     */
    intercept: InterceptSDK;
    /**
     * Utilities to interact with the runtime.
     */
    runtime: RuntimeSDK;
    /**
     * Utilities to interact with workflows.
     */
    workflows: WorkflowSDK;
    /**
     * Utilities to interact with the footer.
     */
    footer: FooterSDK;
    /**
     * Utilities for logging messages to the console.
     */
    log: LogSDK;
    /**
     * Utilities to interact with the settings page.
     */
    settings: SettingsSDK;
    /**
     * @private
     * Utilities to track analytics events.
     */
    _analytics: _AnalyticsSDK;
};
