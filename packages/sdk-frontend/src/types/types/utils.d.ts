import { type Component as VueComponent } from "vue";
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
/**
 * A custom component that will be rendered in the UI.
 *
 */
export type ComponentDefinition = {
    component: VueComponent;
    props?: Record<string, unknown>;
    events?: Record<string, (...args: unknown[]) => void>;
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
export type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
export type As<TType extends string> = {
    type: TType;
};
