import { type PageChangeEvent, type Routes } from "../types/navigation";
import { type ListenerHandle } from "../types/utils";
/**
 * Utilities to interact with navigation.
 * @category Navigation
 */
export type NavigationSDK = {
    /**
     * Navigate to a route or path.
     * @param route The route to navigate to. Can be a route ID object or a custom path string.
     *
     * @example
     * ```ts
     * sdk.navigation.goTo({ id: Routes.Replay });
     * sdk.navigation.goTo({ id: Routes.Projects });
     * sdk.navigation.goTo("/my-plugin-page");
     * ```
     */
    goTo: (route: string | {
        id: Routes;
    }) => void;
    /**
     * Add a page to the navigation.
     * @param path The path of the page.
     * @param options Options for the page.
     * @param options.body The body of the page.
     * @param options.topbar The topbar of the page.
     * @param options.onEnter The callback to execute when the page is entered.
     */
    addPage: (path: string, options: {
        body: HTMLElement;
        topbar?: HTMLElement;
        onEnter?: () => void;
    }) => void;
    /**
     * Subscribe to page changes.
     * @param callback The callback to call when the page changes.
     * @returns An object with a `stop` method that can be called to stop listening to page changes.
     *
     * @example
     * ```ts
     * const handler = sdk.navigation.onPageChange((event) => {
     *   console.log('Page changed to:', event.routeId);
     *   console.log('- path:', event.path);
     * });
     *
     * // Later, stop listening
     * handler.stop();
     * ```
     */
    onPageChange: (callback: (route: PageChangeEvent) => void) => ListenerHandle;
};
