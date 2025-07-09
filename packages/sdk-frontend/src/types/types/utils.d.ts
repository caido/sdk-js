/**
 * A unique Caido identifier per type.
 */
export type ID = string & {
    __id?: never;
};
/**
 * An HTTPQL expression.
 * @example `req.method.eq:"POST"`
 */
export type HTTPQL = string & {
    __httpql?: never;
};
/**
 * A {@link https://fontawesome.com/icons|FontAwesome} icon class.
 * @example "fas fa-rocket"
 */
export type Icon = string & {
    __icon?: never;
};
export type PromisifiedReturnType<T extends (...args: unknown[]) => unknown> = ReturnType<T> extends Promise<infer U> ? Promise<U> : Promise<ReturnType<T>>;
/**
 * A handle for a listener.
 */
export type ListenerHandle = {
    /**
     * Stop the listener.
     */
    stop: () => void;
};
