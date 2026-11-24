# Documentation comments address users, not maintainers

A JSDoc comment on a public SDK symbol tells a consumer what to pass and what they get back. Schema history, transport forks and the reasoning behind an implementation belong in code comments, ADRs or the changelog.

## Rules for contributors and agents

1. **Record availability as `Added in: Caido vX.Y.Z`** — one line, the way Node documents its own API. Not a sentence about which releases renamed what.
2. **No release archaeology in JSDoc** — "supported only on 0.58.x because the types were renamed in 0.59.0" is maintainer context. The user needs "Added in: Caido v0.58.0"; the SDK handles the rest.
3. **Document the parameters and the result** — `@param` for each option that is not obvious, `@returns` for what comes back, `@example` where a call is worth seeing.
4. **Per-option behaviour lives on the option type's field**, not in the method's JSDoc, so it shows up wherever that type is used.
5. **Explain implementation choices in a normal comment**, next to the code that needs explaining, and keep it to what a reader cannot infer. A comment that restates the line below it is noise.
6. **No generated-sounding prose** — no "comprehensive", "robust", "seamless". Say what the thing does.

## Considered options

- **Document every version threshold in JSDoc** — rejected: consumers read the SDK surface, not its compatibility matrix, and the prose goes stale at every release.
- **Drop availability notes entirely** — rejected: a consumer on an older instance needs to know why a method throws.

## Consequences

- The generated reference documentation reads as an API reference rather than a changelog.
- When a fork is dropped, the JSDoc does not need rewriting: `Added in:` stays true forever.
