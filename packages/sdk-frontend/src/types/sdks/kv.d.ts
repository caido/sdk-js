import type { KVEvents, KVValue } from "../types/kv";
import type { ListenerHandle } from "../types/utils";
/**
 * Options for defining a key-value pair.
 * @category KV
 */
export type KVDefineOptions = {
    /**
     * Whether the key-value pair is exportable.
     *
     * Usually this should be true for keys that are settings that you would want to
     * transfer between Caido instances.
     *
     * @default false
     */
    exportable?: boolean | undefined;
};
/**
 * The SDK for the key-value store.
 *
 * Plugin package data shared across frontend and backend surfaces of the same
 * plugin package. Not per-user; separate from {@link StorageSDK}.
 *
 * @category KV
 */
export type KVSDK = {
    /**
     * Defines a new key-value pair. Only call this once per key.
     * If the key is not defined, it will be created at first set with default options.
     * Defining a key alone does not notify listeners.
     *
     * @param key The key to define.
     * @param options The options for the key.
     */
    define: (key: string, options: KVDefineOptions) => Promise<void>;
    /**
     * Gets a value from the key-value store.
     *
     * @param key The key to get.
     * @returns The stored value (including null) or undefined if the key is not defined.
     */
    get: <T extends KVValue>(key: string) => Promise<T | undefined>;
    /**
     * Sets a value in the key-value store.
     *
     * @param key The key to set.
     * @param value The value to set.
     */
    set: <T extends KVValue>(key: string, value: T) => Promise<void>;
    /**
     * Deletes a key-value pair from the key-value store.
     *
     * No-op if the key is not defined.
     *
     * @param key The key to delete.
     */
    del: (key: string) => Promise<void>;
    /**
     * Registers a callback for when a key-value pair is set.
     *
     * Fires for writes from any surface of the plugin package, including the
     * local writer.
     *
     * @param event The event to register for.
     * @param callback The callback to register.
     * @returns A handle to stop listening.
     */
    on: <E extends keyof KVEvents>(event: E, callback: KVEvents[E]) => ListenerHandle;
};
