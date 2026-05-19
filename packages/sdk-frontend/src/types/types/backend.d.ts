/**
 * Endpoints provided by the backend plugin.
 * @category Backend
 */
export type BackendEndpoints = {
    [key: string]: (...args: any[]) => any;
};
/**
 * Events emitted by the backend plugin.
 * @category Backend
 */
export type BackendEvents = {
    [key: string]: (...args: any[]) => void;
};
/**
 * A specification for the backend plugin.
 * @category Backend
 */
export type BackendSpec = {
    api: BackendEndpoints;
    events: BackendEvents;
};
