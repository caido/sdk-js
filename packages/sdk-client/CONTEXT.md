# SDK Client

TypeScript client for interacting with a Caido instance. Exposes a high-level SDK surface over GraphQL and REST transport.

## Language

**SDK type**:
A TypeScript type or class owned by the SDK that describes inputs or outputs of the public API. Lives in `types/` (or SDK method signatures) and is what consumers import.
_Avoid_: GraphQL type, generated type, schema type

**Transport type**:
A generated type tied to a wire protocol — GraphQL operations/fragments (`graphql/__generated__/`) or OpenAPI schemas (`rest/__generated__/`). Used only inside transport and mapping code — never part of the public contract.
_Avoid_: Wire type, schema type

**Public SDK contract**:
Everything exported to consumers via high-level SDKs: `types/`, SDK method signatures in `sdks/`, and their exports. Must use SDK types only; transport types stay internal. Low-level `client.graphql` / `client.rest` are out of scope — intentional escape hatches for power users.
_Avoid_: Public API, surface

**SDK enum**:
A string union or `as const` object defined in `types/` representing a closed set of values. Mirrors schema enums at the SDK boundary but is owned by the SDK — never imported from generated transport types.
_Avoid_: GraphQL enum, schema enum

**Mapping**:
Translation between SDK types and transport types. Reusable shapes shared across methods (e.g. range, connection info) get `to*` / `mapTo*` helpers in `convert/`. One-off mutation-specific inputs are mapped inline in `sdks/`, where `satisfies <TransportInput>` is permitted. All response mapping goes through `convert/`. Canonical implementations live in `transport/latest/convert/`; `convert/` re-exports latest. When an override document exists for a version, that version's convert helpers live in the same transport fork (e.g. `transport/v0.54/convert/`).
_Avoid_: Adapter, transformer

**SDK handle**:
A `class` representing a stateful abstraction that exposes methods across multiple calls (tasks, subscriptions, package handles). Used when the abstraction has behavior, not just data.
_Avoid_: DTO, model

**SDK data type**:
A plain `type` in `types/` for immutable snapshots, option bags, and return values with no methods.
_Avoid_: DTO, model, interface

**Instance version**:
The semver string returned by `/health` (e.g. `"0.55.3"`). Cached by the `Version` handle and compared in SDK branches via `Version.gte(...)`.
_Avoid_: schema version, SDK version

**Bundled schema**:
A copy of GraphQL documents and their generated transport types, produced from a specific `@caido/schema-proxy` release and shipped inside the SDK package. Multiple bundled schemas may coexist in one SDK build.
_Avoid_: schema generation, transport bundle

**Schema branch**:
Version selection inside SDK operation methods via `await version.gte(...)`. Each override document is guarded by an explicit semver threshold authored alongside it. Latest (canonical) documents are the default when the threshold is not met.
_Avoid_: version switch, compatibility branch

**Version threshold**:
A semver literal passed to `await version.gte("0.55.0")` in SDK operation code. Resolves the instance version lazily if not yet cached. Selects which generated document and convert path to use. Authored alongside the override it guards — no manifest or floor algorithm.
_Avoid_: compatibility check, feature gate

**Transport fork**:
A version-specific copy of wire-protocol artifacts: GraphQL documents, generated transport types, and convert logic for that version. One fork per bundled schema. `GraphQLClient` and `RestClient` are shared across forks — only documents, types, and mappers vary. A fork is introduced when an override document exists for that version.
_Avoid_: versioned module, schema bundle

**Instance version handle** (`Version`):
An exported, readonly class passed to SDKs that need version branching and accepted as input on `Client` construction. Receives the shared `RestClient` by injection for lazy resolution, or constructed via `Version.of(semver)` to skip fetching. Exposes `await version.get()` and `await version.gte(...)`, both resolving lazily when not seeded.
_Avoid_: version context, schema resolver

**Instance semver**:
The version string from `/health` (e.g. `"0.55.3"`). The only version data `Version` holds. Retrieved via `await version.get()`. Compared via `await version.gte(...)`.
_Avoid_: schema version, bundled version

**Semver literal**:
A string type enforcing `major.minor.patch` shape (e.g. `"0.55.0"`). Used as the argument to `Version.gte()` and in `Version.of()` when seeding the instance version.
_Avoid_: version string, semver string

**Version resolution**:
Lazy fetch of instance semver via `/health`. Does not require `connect()` — `/health` is unauthenticated. Concurrent callers share a single in-flight promise.
_Avoid_: schema resolution, health check

**Shared transport client**:
`GraphQLClient` or `RestClient` — connection, auth, and execution logic that is version-agnostic. Accepts version-selected documents at call time.
_Avoid_: versioned client

**Canonical documents**:
The full GraphQL document set for the latest bundled schema, under `transport/latest/documents/`. Canonical generated types live in `transport/latest/__generated__/`; canonical mappers in `transport/latest/convert/`. Source of truth for operations that have not diverged across versions.
_Avoid_: master documents, default documents

**Version override document**:
A per-version copy of a single operation file (e.g. `transport/v0.55/documents/replay.graphql`) that exists only when that operation differs from canonical. Codegen runs against that version's schema independently — not merged with canonical at build time.
_Avoid_: delta document, patch file

**Schema alias**:
An npm package alias (e.g. `@caido/schema-proxy-v0.55`) pinning a specific `@caido/schema-proxy` release. Used as the codegen schema source for that version's override documents.
_Avoid_: schema pin, versioned dependency

**Codegen config**:
A hand-written `codegen` config per schema alias / version folder. No generated manifest drives the build — contributors add configs when introducing a new override.
_Avoid_: codegen manifest, generate script

**Versioned transport scope** (v1):
Backward compatibility applies to GraphQL only — per-version documents, generated types, and convert logic. REST/OpenAPI codegen stays single-version (latest schema); `RestClient` and hand-written parsers (e.g. `/health`) are not forked.
_Avoid_: REST versioning

**Version-gated field**:
An optional field on an SDK type whose value is only populated when the connected instance's schema supports it. Documented with a JSDoc `@since` tag naming the instance version the field was introduced.
_Avoid_: feature flag field, conditional property
