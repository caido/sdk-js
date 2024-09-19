import type { Sdk } from "./__generated__/graphql-sdk";
import type { BackendEndpoints, BackendEvents, ToBackendRPC } from "./backend";
import type { CommandContext } from "./commands";
import type { Editor, HTTPRequestEditor, HTTPResponseEditor } from "./editor";
import type { Finding } from "./findings";
import type { MenuItem } from "./menu";
import type { Scope } from "./scopes";
import type { SidebarItem } from "./sidebar";
import type { JSONCompatible, JSONValue } from "./utils";
export type { CommandContext } from "./commands";
export type { MenuItem } from "./menu";
export type API<T extends BackendEndpoints = Record<string, never>, E extends BackendEvents = Record<string, never>> = {
    graphql: Sdk;
    backend: ToBackendRPC<T, E>;
    /**
     * Utilities to create UI components.
     */
    ui: {
        /**
         * Create a button.
         * @param options Options for the button.
         * @param options.variant The variant of the button.
         * @param options.label The label of the button.
         * @param options.leadingIcon The leading icon of the button.
         * @param options.trailingIcon The trailing icon of the button.
         * @param options.size The size of the button.
         * @returns The button element.
         */
        button: (options?: {
            variant?: "primary" | "secondary" | "tertiary";
            label?: string;
            leadingIcon?: string;
            trailingIcon?: string;
            size?: "small" | "medium" | "large";
        }) => HTMLElement;
        /**
         * Create a card.
         * @param options Options for the card.
         * @param options.header The header of the card.
         * @param options.body The body of the card.
         * @param options.footer The footer of the card.
         * @returns The card element.
         */
        card: (options?: {
            header?: HTMLElement;
            body?: HTMLElement;
            footer?: HTMLElement;
        }) => HTMLElement;
        /**
         * Create a well.
         * @param options Options for the well.
         * @param options.header The header of the well.
         * @param options.body The body of the well.
         * @param options.footer The footer of the well.
         * @returns The well element.
         */
        well: (options?: {
            header?: HTMLElement;
            body?: HTMLElement;
            footer?: HTMLElement;
        }) => HTMLElement;
        /**
         * Create an HTTP request editor
         * @returns The HTTP request editor.
         */
        httpRequestEditor: () => HTTPRequestEditor;
        /**
         * Create an HTTP response editor
         * @returns The HTTP response editor.
         */
        httpResponseEditor: () => HTTPResponseEditor;
    };
    /**
     * Utilities to interact with scopes
     */
    scopes: {
        /**
         * Get all scopes.
         * @returns A list of scopes.
         */
        getScopes: () => Scope[];
        /**
         * Create a scope.
         * @param options Options for the scope.
         * @param options.name The name of the scope.
         * @param options.allowlist The list of included items in the scope.
         * @param options.denylist The list of excluded items in the scope.
         * @returns The created scope.
         */
        createScope: (options: {
            name: string;
            allowlist: string[];
            denylist: string[];
        }) => Promise<Scope | undefined>;
        /**
         * Update a scope.
         * @param id The id of the scope to update.
         * @param options Options for the scope.
         * @param options.name The name of the scope.
         * @param options.allowlist The list of included items in the scope.
         * @param options.denylist The list of excluded items in the scope.
         * @returns The updated scope.
         */
        updateScope: (id: string, options: {
            name?: string;
            allowlist?: string[];
            denylist?: string[];
        }) => Promise<Scope | undefined>;
        /**
         * Delete a scope.
         * @param id The id of the scope to delete.
         * @returns Whether the scope was deleted.
         */
        deleteScope: (id: string) => Promise<boolean>;
    };
    /**
     * Utilities to interact with findings
     */
    findings: {
        /**
         * Create a finding.
         * @param requestId The id of the request the finding is associated with.
         * @param options Options for the finding.
         * @param options.title The title of the finding.
         * @param options.description The description of the finding.
         * @param options.reporter The reporter of the finding.
         * @param options.dedupeKey The dedupe key of the finding.
         * @returns The created finding.
         */
        createFinding: (requestId: string, options: {
            title: string;
            description?: string;
            reporter: string;
            dedupeKey?: string;
        }) => Promise<Finding | undefined>;
    };
    /**
     * Utilities to interact with commands
     */
    commands: {
        /**
         * Register a command.
         * @param id The id of the command.
         * @param options Options for the command.
         * @param options.name The name of the command.
         * @param options.run The function to run when the command is executed.
         * @param options.group The group this command belongs to.
         * @param options.when A function to determine if the command is available.
         */
        register: (id: string, options: {
            name: string;
            run: (context: CommandContext) => void;
            group?: string;
            when?: (context: CommandContext) => boolean;
        }) => void;
    };
    /**
     * Utilities to insert menu items and context-menus throughout the UI.
     */
    menu: {
        /**
         * Register a menu item.
         * @param item The menu item to register.
         */
        registerItem: (item: MenuItem) => void;
    };
    /**
     * Utilities to interact with navigation.
     */
    navigation: {
        /**
         * Navigate to a path.
         * @param path The path to navigate to.
         */
        goTo: (path: string) => void;
        /**
         * Add a page to the navigation.
         * @param path The path of the page.
         * @param options Options for the page.
         * @param options.body The body of the page.
         * @param options.topbar The topbar of the page.
         */
        addPage: (path: string, options: {
            body: HTMLElement;
            topbar?: HTMLElement;
        }) => void;
    };
    /**
     * Utilities to interact with the active page.
     */
    window: {
        /**
         * Get the active editor.
         * @returns The active editor.
         */
        getActiveEditor: () => Editor | undefined;
        /**
         * Show a toast message.
         * @param message The message to show.
         * @param options Options for the toast message.
         * @param options.variant The variant of the toast message.
         * @param options.duration The duration of the toast message in milliseconds.
         */
        showToast: (message: string, options?: {
            variant?: "success" | "error" | "warning" | "info";
            duration?: number;
        }) => void;
    };
    /**
     * Utilities to interact with frontend-plugin storage.
     */
    storage: {
        /**
         * Get the storage.
         * @returns The storage.
         */
        get: () => JSONValue;
        /**
         * Set the storage.
         * @param value The value to set the storage to
         * @returns A promise that resolves when the storage has been set.
         */
        set: <T>(value: JSONCompatible<T>) => Promise<void>;
        /**
         * Subscribe to storage changes.
         * @param callback The callback to call when the storage changes.
         */
        onChange: (callback: (value: JSONValue) => void) => void;
    };
    /**
     * Utilities to interact with shortcuts.
     */
    shortcuts: {
        /**
         * Register a shortcut.
         * @param commandId The id of the command to run when the shortcut is triggered.
         * @param keys The keys of the shortcut.
         */
        register: (commandId: string, keys: string[]) => void;
    };
    /**
     * Utilities to interact with the command palette.
     */
    commandPalette: {
        /**
         * Register a command.
         * @param commandId The id of the command to register.
         */
        register: (commandId: string) => void;
    };
    /**
     * Utilities to interact with the sidebar.
     */
    sidebar: {
        /**
         * Register a sidebar item.
         * @param name The name of the sidebar item.
         * @param path The path that the user will be navigated to when the sidebar item is clicked.
         * @param options Options for the sidebar item.
         * @param options.icon The icon of the sidebar item.
         * @param options.group The group the sidebar item belongs to.
         * @param options.isExternal Whether the path points to an external URL.
         * @returns The created sidebar item.
         */
        registerItem: (name: string, path: string, options?: {
            icon?: string;
            group?: string;
            isExternal?: boolean;
        }) => SidebarItem;
    };
};
//# sourceMappingURL=index.d.ts.map