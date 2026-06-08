# Multi-version GraphQL transport for backward-compatible SDK

The SDK must talk to Caido instances running different releases. GraphQL schema shape drifts over time; the SDK bundles multiple `@caido/schema-proxy` generations and selects the right documents and mappers at runtime based on instance semver from `/health`.

## Rules for contributors and agents

1. **Canonical transport lives in `transport/latest/`** — documents, `__generated__/`, and `convert/` for the current schema. This is the default path for every operation.
2. **Overrides are additive** — when an operation differs on an older instance, add `transport/v0.XX/documents/<op>.graphql`, a hand-written codegen config against the matching npm schema alias, and `transport/v0.XX/convert/` mappers for that version.
3. **Branch with `await version.gte("X.Y.Z")`** — each override is guarded by an explicit semver threshold in the SDK method that uses it. Latest (canonical) is the `else` path. No manifest or floor algorithm.
4. **`Version` is exported** — readonly handle with `Version.of(semver)` for seeded version (no fetch) and lazy resolution via shared `RestClient` otherwise. `await version.get()` and `await version.gte(...)` are async.
5. **Shared wire clients** — `GraphQLClient` and `RestClient` are shared by the client and all SDKs. They are not forked per schema version.
6. **Stable public SDK types** — `types/` and SDK method signatures do not vary by instance version. New schema fields are optional on SDK types with `@since` JSDoc naming the introducing instance version.
7. **REST is single-version (v1)** — OpenAPI codegen runs against latest `@caido/schema-proxy` only. `/health` is parsed with hand-written zod schema.

## Layout

```
src/
  graphql/                  ← shared GraphQLClient, exchanges
  rest/                     ← shared RestClient
  transport/
    latest/
      documents/*.graphql
      __generated__/
      convert/
    v0.55/                  ← only when an operation diverges
      documents/replay.graphql
      __generated__/replay.ts
      convert/replayEntry.ts
  version.ts
  types/
  sdks/
```

## Build

- Install older schemas via npm aliases: `"@caido/schema-proxy-v0.55": "npm:@caido/schema-proxy@0.55.0"`.
- Hand-written `codegen.v0.55.yml` per override version; latest uses `codegen.yml`.
- Override documents codegen independently against their version's schema — not merged with canonical.

## Considered options

- **Floor algorithm to pick bundled schema** — rejected; explicit `gte` thresholds per operation are simpler and match how overrides are authored.
- **Schema operations registry** — deferred; interim `gte` branches in SDK methods until override count grows.
- **Per-version REST forks** — deferred; REST surface is small and stable for v1.
- **Latest stays in `src/graphql/documents/`** — rejected; full migration to `transport/latest/` keeps versioned and canonical code in one tree.

## Consequences

- Adding backward compatibility requires: npm alias (if new schema pin), override document, codegen config, convert fork, `gte` branch in SDK, and optional `@since` on SDK types.
- `Version.get()` works before `connect()`; call `connect()` before authenticated SDK requests.
- Agents must not import transport types into `types/` (see ADR 0001).
