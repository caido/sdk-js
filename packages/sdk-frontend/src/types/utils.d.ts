type JSONPrimitive = string | number | boolean | null | undefined;
export type JSONValue = JSONPrimitive | JSONValue[] | {
    [key: string]: JSONValue;
};
type NotAssignableToJson = bigint | symbol | Function;
export type JSONCompatible<T> = unknown extends T ? never : {
    [P in keyof T]: T[P] extends JSONValue ? T[P] : T[P] extends NotAssignableToJson ? never : JSONCompatible<T[P]>;
};
export type PromisifiedReturnType<T extends (...args: unknown[]) => unknown> = ReturnType<T> extends Promise<infer U> ? Promise<U> : Promise<ReturnType<T>>;
export {};
//# sourceMappingURL=utils.d.ts.map