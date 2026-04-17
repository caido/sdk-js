import {
  filter,
  makeSubject,
  map,
  onEnd,
  pipe,
  type Subject,
  toAsyncIterable,
} from "wonka";

import {
  CreatedPluginEventDocument,
  type CreatedPluginEventSubscription,
  type GraphQLClient,
} from "@/graphql/index.js";
import type { Json } from "@/utils/json.js";

type PluginEvent = CreatedPluginEventSubscription["createdPluginEvent"];

/**
 * Shared dispatcher for the plugin events.
 *
 * Exposes a per-`(pluginId, eventName)` listener API returning an
 * {@link AsyncIterable}. A single upstream subscription is lazily opened when
 * the first listener is registered and torn down when the last one leaves.
 */
export class PluginEventBus {
  private readonly graphql: GraphQLClient;
  private subject: Subject<PluginEvent> = makeSubject<PluginEvent>();
  private listenerCount = 0;
  private upstreamAbort: AbortController | undefined;

  constructor(graphql: GraphQLClient) {
    this.graphql = graphql;
  }

  /**
   * Subscribe to a single `(pluginId, eventName)` stream.
   *
   * The returned iterable yields the raw JSON args for each event; callers
   * are responsible for casting to their typed tuple.
   */
  subscribe(pluginId: string, eventName: string): AsyncIterable<Json[]> {
    this.listenerCount += 1;
    this.ensureUpstream();

    return toAsyncIterable(
      pipe(
        this.subject.source,
        filter(
          (e: PluginEvent) =>
            e.pluginId === pluginId && e.eventName === eventName,
        ),
        map((e: PluginEvent) =>
          e.eventArgs.map((arg) => JSON.parse(arg) as Json),
        ),
        onEnd(() => {
          this.listenerCount -= 1;
          if (this.listenerCount === 0) this.stopUpstream();
        }),
      ),
    );
  }

  private ensureUpstream(): void {
    if (this.upstreamAbort) return;

    const abort = new AbortController();
    this.upstreamAbort = abort;

    void this.runUpstream(abort.signal);
  }

  private stopUpstream(): void {
    if (!this.upstreamAbort) return;
    this.upstreamAbort.abort();
    this.upstreamAbort = undefined;
    this.subject.complete();
    this.subject = makeSubject<PluginEvent>();
  }

  private async runUpstream(signal: AbortSignal): Promise<void> {
    try {
      for await (const result of this.graphql.subscribe(
        CreatedPluginEventDocument,
      )) {
        if (signal.aborted) return;
        this.subject.next(result.createdPluginEvent);
      }
    } catch {
      // Swallow upstream errors - the urql client transparently reconnects
      // websockets, so in practice consumers won't see these. If we ever get
      // here the subject is about to be completed below.
    } finally {
      if (this.upstreamAbort?.signal === signal) {
        this.upstreamAbort = undefined;
        this.subject.complete();
        this.subject = makeSubject<PluginEvent>();
      }
    }
  }
}
