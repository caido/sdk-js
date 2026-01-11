type JSONPrimitive = string | number | boolean | null | undefined;
/**
 * A JSON-serializable value.
 * @category JSON
 */
export type JSONValue = JSONPrimitive | JSONValue[] | {
    [key: string]: JSONValue;
};
type NotAssignableToJson = bigint | symbol | Function;
/**
 * A type that ensures all properties of T are JSON-compatible.
 * @category JSON
 */
export type JSONCompatible<T> = unknown extends T ? never : {
    [P in keyof T]: T[P] extends JSONValue ? T[P] : T[P] extends NotAssignableToJson ? never : JSONCompatible<T[P]>;
};
export {};
