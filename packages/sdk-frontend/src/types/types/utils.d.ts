import { type Component as VueComponent } from "vue";
/**
 * A unique Caido identifier per type.
 * @category Utils
 */
export type ID = string & {
    __id?: never;
};
/**
 * An HTTPQL expression.
 * @example `req.method.eq:"POST"`
 * @category Utils
 */
export type HTTPQL = string & {
    __httpql?: never;
};
/**
 * A {@link https://fontawesome.com/icons|FontAwesome} icon class.
 * @example "fas fa-rocket"
 * @category Utils
 */
export type Icon = string & {
    __icon?: never;
};
/**
 * A custom component that will be rendered in the UI.
 * @category Utils
 */
export type ComponentDefinition = {
    component: VueComponent;
    props?: Record<string, unknown>;
    events?: Record<string, (...args: unknown[]) => void>;
};
/**
 * Utility type for converting endpoint return types to promises.
 * @category Utils
 */
export type PromisifiedReturnType<T extends (...args: unknown[]) => unknown> = ReturnType<T> extends Promise<infer U> ? Promise<U> : Promise<ReturnType<T>>;
/**
 * A handle for a listener.
 * @category Utils
 */
export type ListenerHandle = {
    /**
     * Stop the listener.
     */
    stop: () => void;
};
/**
 * Utility type that prettifies complex types for better IDE display.
 * @category Utils
 */
export type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
/**
 * Utility type that adds a type discriminator to a type.
 * @category Utils
 */
export type As<TType extends string> = {
    type: TType;
};
/**
 * Generic selection type with main and secondary items.
 * Main represents the primary selected item, secondary represents additional selected items.
 * @category Utils
 */
export type Selection<TId> = {
    kind: "Empty";
} | {
    kind: "Selected";
    main: TId;
    secondary: TId[];
};
/**
 * Visual indicator displayed next to a item label in a tree component.
 * Includes an icon and an associated description.
 * @category Utils
 */
export type AddIndicatorOptions = {
    icon: Icon;
    description: string;
};
/**
 * Providing operations that can be performed on a item indicator.
 * @category Utils
 */
export type Indicator = {
    remove: () => void;
};
