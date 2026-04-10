import { type BackendEndpoints, type BackendEvents } from "../types/backend";
import type { PromisifiedReturnType } from "../types/utils";

type ResolvedAPI<T> = T extends { api: infer A } ? A : T;
type ResolvedEvents<T, Events> = T extends { events: infer A } ? A : Events;

/**
 * Utilities to interact with the backend plugin.
 * @category Backend
 */
export type BackendSDK<
  T extends ResolvedAPI<BackendEndpoints>,
  E extends BackendEvents,
> = {
  [K in keyof ResolvedAPI<T>]: (
    ...args: Parameters<ResolvedAPI<T>[K]>
  ) => PromisifiedReturnType<ResolvedAPI<T>[K]>;
} & {
  /**
   * Subscribe to a backend event.
   * @param event The event to subscribe to.
   * @param callback The callback to call when the event is emitted.
   * @returns An object with a `stop` method that can be called to stop listening to the event.
   */
  onEvent: <K extends keyof ResolvedEvents<T, E>>(
    event: K,
    callback: ResolvedEvents<T, E>[K],
  ) => {
    stop: () => void;
  };
};
