import { type BackendEndpoints, type BackendEvents } from "../types/backend";
import type { PromisifiedReturnType } from "../types/utils";
/**
 * Utilities to interact with the backend plugin.
 * @category Backend
 */
export type BackendSDK<T extends BackendEndpoints, E extends BackendEvents> = {
    [K in keyof T]: (...args: Parameters<T[K]>) => PromisifiedReturnType<T[K]>;
} & {
    /**
     * Subscribe to a backend event.
     * @param event The event to subscribe to.
     * @param callback The callback to call when the event is emitted.
     * @returns An object with a `stop` method that can be called to stop listening to the event.
     */
    onEvent: <K extends keyof E>(event: K, callback: E[K]) => {
        stop: () => void;
    };
};
