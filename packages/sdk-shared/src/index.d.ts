declare module "caido:plugin" {
  type MaybePromise<T> = T | Promise<T>;

  export interface SDK {}

  export type DefineAPI<
    API extends Record<string, (...args: any[]) => MaybePromise<any>>,
  > = {
    [K in keyof API]: DefineAPICallback<API[K]>;
  };

  export type DefineAPICallback<F> = F extends (
    sdk: SDK,
    ...args: infer A
  ) => infer R
    ? (...args: A) => R
    : "Your callback must respect the format (sdk: SDK, ...args: unknown[]) => MaybePromise<unknown>";

  export type DefineEvents<
    Events extends Record<string, (...args: any[]) => MaybePromise<void>>,
  > = {
    [K in keyof Events]: DefineEventCallback<Events[K]>;
  };

  export type DefineEventCallback<F> = F extends (
    ...args: infer A
  ) => MaybePromise<void>
    ? (...args: A) => MaybePromise<void>
    : "Your callback must respect the format (...args: unknown[]) => MaybePromise<void>";
}
