# Multi-version GraphQL transport for backward-compatible SDK

The SDK must talk to Caido instances running different releases. GraphQL schema shape drifts over time; the SDK bundles multiple `@caido/schema-proxy` generations and selects the right documents and mappers at runtime based on instance semver from `/health`.

## Rules for contributors and agents

1. **Canonical transport lives in `transport/latest/`** — documents, `__generated__/`, and `convert/` for the current schema. This is the default path for every operation.
2. **Overrides are additive** — when an operation **shape** differs on an older instance (removed/renamed fields, new required arguments, union/interface refactors), add `transport/v0.XX/documents/<op>.graphql` and a hand-written codegen config against the matching npm schema alias. Do **not** add per-SDK-class convert files under `transport/`.
3. **`convert/` is for shared wire primitives only** — blob decoding, connection info, request/response shapes, pagination, etc. SDK entity classes (`ReplayEntry`, `ReplaySession`, …) map their own wire fragments inside the class constructor. No `Mapped*` intermediate types and no `transport/*/convert/<entity>.ts` files.
4. **Additive input fields do not require overrides** — when a schema release only adds optional or new input fields (e.g. `global` on `CreateFilterPresetInput`), keep the canonical document and pass the new field from the SDK. Older instances ignore unknown input fields; do not fork the operation or branch on version for that field alone.
5. **Branch with `await version.gte(TransportVersion.X_Y_Z)`** — each override is guarded by an explicit semver threshold from `TransportVersion` in `types/versioned.ts`. Canonical transport is the `if` branch at the introducing threshold; older transport is the `else` path. Use `if`/`else` blocks — not a derived schema string or secondary version comparison.
6. **`TransportVersion` identifies bundled forks** — a const object of full semver strings (`"0.56.0"`, `"0.57.0"`, …). Never use prefixed aliases like `"v0.56"` or a separate `"latest"` label. Add a new key when a new override fork is introduced.
7. **Wrap wire fragments in `Versioned`** — call sites pass `versioned(TransportVersion.X_Y_Z, fragment)` into SDK entity constructors. Define a `VersionedOf<{ [TransportVersion.X]: LatestFragment; [TransportVersion.Y]: V0Fragment }>` alias per entity. The constructor `switch`es on `fragment.version` and assigns public fields directly from `fragment.data`. Reuse generated fragment types for field types where possible (e.g. `V056ReplayEntryFullFragment["settings"]`).
8. **`Version` is exported** — readonly handle with `Version.of(semver)` for seeded version (no fetch) and lazy resolution via shared `RestClient` otherwise. `await version.get()` and `await version.gte(...)` are async.
9. **Shared wire clients** — `GraphQLClient` and `RestClient` are shared by the client and all SDKs. They are not forked per schema version.
10. **Stable public SDK types** — `types/` and SDK method signatures do not vary by instance version. New schema fields are optional on SDK types with `@since` JSDoc naming the introducing instance version.
11. **REST is single-version (v1)** — OpenAPI codegen runs against latest `@caido/schema-proxy` only. `/health` is parsed with hand-written zod schema.

## Layout

```
src/
  graphql/                  ← shared GraphQLClient, exchanges
  rest/                     ← shared RestClient
  transport/
    latest/
      documents/*.graphql
      __generated__/
      convert/              ← shared primitives only (blob, network, request, …)
    v0.56/                  ← only when an operation diverges
      documents/replay.graphql
      __generated__/replay.ts
  types/
    versioned.ts            ← TransportVersion, Versioned, versioned()
  version.ts
  sdks/                     ← entity constructors map Versioned fragments
```

## Build

- Install older schemas via npm aliases: `"@caido/schema-proxy-v0.56": "npm:@caido/schema-proxy@0.56.0"`.
- Hand-written `codegen.v0.56.yml` per override version; latest uses `codegen.yml`.
- Override documents codegen independently against their version's schema — not merged with canonical.

## Considered options

- **Floor algorithm to pick bundled schema** — rejected; explicit `gte` thresholds per operation are simpler and match how overrides are authored.
- **Schema operations registry** — deferred; interim `gte` branches in SDK methods until override count grows.
- **Per-version REST forks** — deferred; REST surface is small and stable for v1.
- **Latest stays in `src/graphql/documents/`** — rejected; full migration to `transport/latest/` keeps versioned and canonical code in one tree.
- **Per-class `convert/` mappers** — rejected; constructor-local mapping with `Versioned` fragments keeps version logic at the entity boundary and avoids `Mapped*` DTO types.

## Consequences

- Breaking operation shape changes require: npm alias (if new schema pin), override document, codegen config, `TransportVersion` entry, `VersionedOf` alias, constructor `switch`, `gte` branch in SDK methods, and optional `@since` on SDK types.
- Additive input-only changes require only canonical document updates and SDK input mapping; older instances accept and ignore the extra fields.
- `Version.get()` works before `connect()`; call `connect()` before authenticated SDK requests.
- Agents must not import transport types into `types/` (see ADR 0001).
