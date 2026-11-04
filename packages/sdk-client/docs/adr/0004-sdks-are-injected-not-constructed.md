# SDKs are injected, never constructed in a method

SDK classes are wired once, in a constructor, and passed down. No method body calls `new SomeSDK(...)`.

## Rules for contributors and agents

1. **Build the graph at the root** — `Client` constructs the top-level SDKs, each top-level SDK constructs its sub-SDKs. `ReplaySDK` owns the single `ReplayEntrySDK` and the single `ReplaySessionSDK`.
2. **Entities hold a reference to the SDK that produced them** — `ReplaySession` takes a `ReplaySessionSDK` and delegates `setActiveEntry` and `entries` to it. It does not rebuild one to call itself.
3. **Never `new` an SDK inside a method** — a fresh SDK duplicates transport state, hides its dependencies from the constructor signature, and makes the wiring impossible to see from the root.
4. **Optional constructor parameters are not an escape hatch** — `entrySdk?: ReplayEntrySDK` with a `?? new ReplayEntrySDK(...)` fallback is the same violation with a default. Make the dependency required.
5. **Data classes take no clients they do not use** — `ReplayEntry` reads from a fragment and exposes fields, so it holds no `GraphQLClient`. Only handles that make further calls (`Task`, `ReplaySession`) hold one.

## Considered options

- **Construct on demand** — rejected: it looks cheap, but every call site then decides which transport the new SDK talks over, and a version-resolution cache is rebuilt per call.
- **A service locator** — rejected: it hides the same dependencies behind a lookup instead of a constructor parameter.

## Consequences

- A new SDK dependency is a constructor parameter, which makes the cost of adding it visible in the diff.
- Entities are cheap to build, because the expensive wiring is shared with the SDK that produced them.
