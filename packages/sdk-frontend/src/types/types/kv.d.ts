/**
 * Represents any valid value for the key-value store.
 * It needs to be serializable to JSON.
 * @category KV
 */
export type KVValue = string | number | boolean | KVValue[] | null | {
    [key: string]: KVValue;
};
/**
 * Represents the events that can be emitted by the key-value store.
 * @category KV
 */
export type KVEvents = {
    set: <T extends KVValue>(key: string, value: T) => Promise<void> | void;
    delete: (key: string) => Promise<void> | void;
};
