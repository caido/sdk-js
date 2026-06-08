# SDK-owned types, not transport types

High-level SDK methods (`sdks/`, `types/`, `convert/`) must expose SDK-owned abstractions for inputs and outputs — never GraphQL or REST generated types. Transport types (`transport/latest/__generated__/`, `rest/__generated__/`) are internal wiring only; they may appear in `sdks/` and `convert/` at the boundary (operation documents, fragments, `satisfies <TransportInput>`) but must not leak into `types/` or method signatures consumers rely on. Canonical mappers live in `transport/latest/convert/`; `convert/` re-exports latest for stable import paths. Low-level `client.graphql` / `client.rest` are intentional escape hatches and out of scope.

## Rules for contributors and agents

1. **Define SDK types in `types/`** for every input and output of a high-level SDK method — including enums (string unions / `as const`) and nested shapes, even when identical to the schema.
2. **Map responses in `convert/`** — every query/mutation/subscription result returned to consumers passes through a `mapTo*` function.
3. **Map inputs at the boundary** — reusable shapes shared across methods (e.g. range, connection info) get `to*` helpers in `convert/`; one-off mutation inputs are built inline in `sdks/` with `satisfies <TransportInput>` permitted.
4. **Data = `type`, behavior = `class`** — immutable snapshots and option bags live in `types/`; use a class only for stateful handles with methods across multiple calls.

## Considered options

- **Reuse generated types in `types/` when 1:1** — rejected because schema renames and regen become breaking changes for SDK consumers.
- **Ban transport types in `sdks/` entirely** — rejected because `satisfies` at the call site catches schema drift without exporting transport types.
- **Seal the package export surface** — deferred; low-level clients remain available for power users.

## Consequences

- Existing violations in `types/` (e.g. `WorkflowKind`, `RangeInput` imported from `@/graphql`) should be migrated to SDK-owned types with mapping in `convert/`.
- Agents adding SDK surface area must create types (or classes for handles) before wiring transport — not the other way around.
