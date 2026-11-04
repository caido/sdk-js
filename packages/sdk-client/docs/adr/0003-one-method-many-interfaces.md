# One method, many interfaces

When an SDK operation has variants, it is a single method with overloaded signatures discriminated by a field on the options object, not one method per variant. `WorkflowSDK.test` is the reference implementation: one `test(options)` with `kind: "convert" | "passive" | "active"`, three overloads, and one `switch` in the body.

## Rules for contributors and agents

1. **Overload, do not multiply methods** — `create(options)` with a `kind` discriminator, never `create()` plus `createPipeline()` plus `createWs()`. A reader finds one entry point and the type system picks the right return.
2. **Discriminate on a field the caller already sets** — reuse the schema's own notion of variant (`kind`, `source`, `strategy`) rather than inventing a parallel one.
3. **Give each variant its own options type** — `CreateReplaySessionHttpOptions`, `CreateReplaySessionWsOptions`, … and a union alias for the implementation signature. Each overload names one variant type and one return type.
4. **The implementation signature is not public** — it takes the union and returns the union; only the overloads above it are what consumers see. Keep a final `(options: Union): Promise<Union>` overload when callers legitimately hold an undiscriminated value.
5. **One `switch` on the discriminator** — the body dispatches once, at the top. Per-variant work goes in private methods, not in a second dispatch.

## Considered options

- **A method per variant** — rejected: the surface grows with every schema variant, related operations drift apart, and consumers have to know which name maps to which kind.
- **A single untyped method** — rejected: callers lose the return narrowing that makes the discriminator worth having.

## Consequences

- Adding a replay session kind means adding an options type, an overload and a `case`, not a new public method.
- Variants that an instance is too old to serve fail inside the single method, so the version check lives in one place.
