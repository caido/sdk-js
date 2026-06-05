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
Translation between SDK types and transport types. Reusable shapes shared across methods (e.g. range, connection info) get `to*` / `mapTo*` helpers in `convert/`. One-off mutation-specific inputs are mapped inline in `sdks/`, where `satisfies <TransportInput>` is permitted. All response mapping goes through `convert/`.
_Avoid_: Adapter, transformer

**SDK handle**:
A `class` representing a stateful abstraction that exposes methods across multiple calls (tasks, subscriptions, package handles). Used when the abstraction has behavior, not just data.
_Avoid_: DTO, model

**SDK data type**:
A plain `type` in `types/` for immutable snapshots, option bags, and return values with no methods.
_Avoid_: DTO, model, interface
