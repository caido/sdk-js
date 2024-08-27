import type { JSONCompatible, JSONValue } from "./utils";
export type Storage = {
    get: () => JSONValue;
    set: <T>(value: JSONCompatible<T>) => Promise<void>;
    onChange: (callback: (value: JSONValue) => void) => void;
};
