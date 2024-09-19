import type { PromisifiedReturnType } from "./utils";
export type BackendEndpoints = {
    [key: string]: (...args: any[]) => any;
};
export type BackendEvents = {
    [key: string]: (...args: any[]) => void;
};
export type ToBackendRPC<T extends BackendEndpoints, E extends BackendEvents> = {
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
//# sourceMappingURL=backend.d.ts.map