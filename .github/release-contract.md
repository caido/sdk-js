# SDK release contract

This repository has two release lanes. Neither is triggered by a branch push.

| Lane | Source | Packages | Channel |
| --- | --- | --- | --- |
| Coupled RC/stable | Immutable `vX.Y.Z-rc.N` or `vX.Y.Z` tag | `@caido/sdk-backend`, `@caido/sdk-frontend`, `@caido/sdk-workflow` | internal `beta` or public `latest` |
| Independent stable | Immutable `<package>-vX.Y.Z` GitHub Release tag | Exactly one of `quickjs-types`, `sdk-shared`, `server-auth`, `sdk-client` | npm default (`latest`) |

`caido-private` owns coupled release-branch creation, conflict checks, branch/version agreement, and creation of the immutable coupled tag. The SDK publisher does not duplicate those checks. `bump.yml` is only a utility used by that orchestration; it is not a release lane.

## Coupled releases

`publish-release.yml` is dispatched with an immutable `vX.Y.Z` or `vX.Y.Z-rc.N` tag. It verifies that the checkout is detached at that exact tag and builds the three coupled packages.

Stable releases publish `@caido/sdk-backend`, `@caido/sdk-frontend`, and `@caido/sdk-workflow` to public npm; `sdk-workflow` is also published to GitHub Packages. RC releases are not published to public npm: all three coupled packages are published only to GitHub Packages with the `beta` tag, using the repository's previous internal `publish-one` process (`.npmrc.github`, GitHub token authentication, recursive `pnpm publish`, and `--no-git-checks`).

## Independent releases

`release-independent.yml` has one operator input: `package`, which must be `quickjs-types`, `sdk-shared`, `server-auth`, or `sdk-client`.

It first runs a read-only preflight against one exact `main` commit. The preflight requires the derived `<package>-vX.Y.Z` Git tag and GitHub Release to be absent, requires the exact package version to be absent from public npm, and—for `quickjs-types` or `sdk-shared`—requires it to be absent from GitHub Packages. Any existing object or unexpected registry/API error stops the workflow before mutation.

After preflight succeeds, a separate write-enabled job checks out the validated commit, creates the tag and GitHub Release, and calls `publish.yml`. The reusable publisher verifies the immutable tag, builds only the selected package graph, and publishes exactly that package. Creation assumes preflight established a clean state; concurrency prevents another dispatcher run for the same package from interleaving.

All independent packages publish to public npm. `quickjs-types` and `sdk-shared` also publish to GitHub Packages. Independent publication does not pass `--tag`; npm's default `latest` tag is used.

## Retry and channel behavior

Package versions and release tags are immutable. Never repair a retry by changing a package version or moving a tag.

Before upload, each registry is queried for the exact manifest version. Existing versions are skipped, allowing a coupled or multi-registry release to resume after partial success. Publication uses the version currently present in each checked-out package manifest; no separate version is supplied to the publish command.

Coupled RC releases explicitly use `beta`; coupled stable releases explicitly use `latest`; independent releases omit `--tag` and therefore use npm's default `latest`. Workflow concurrency serializes releases.

## Authentication

- Stable public npm publication uses npm trusted publishing for SDK-owned coupled dispatches. The independent reusable worker uses `NPM_PUBLISH_TOKEN` because reusable-workflow trust follows the calling workflow identity.
- Coupled RCs and the stable `sdk-workflow` internal route use the workflow's `github.token` with `packages: write`, matching the previous internal `publish-one` process. Independent GitHub Packages routes use `GITHUB_PACKAGES_TOKEN`.

Configure npm trusted publishers against repository `caido/sdk-js` and the exact SDK-owned publishing workflow. Do not use the GitHub Packages token for public npm. Release workflows provision the repository-pinned Node and pnpm versions through Mise.

## Dry runs

`publish-release.yml` supports a dry run. It checks out and builds the immutable source and invokes the corresponding `pnpm publish --dry-run` path for every coupled registry route. It does not query publication state, publish, push, create releases, or mutate dist-tags.

The independent release dispatcher intentionally has no dry-run input: invoking it creates the tag and GitHub Release and then publishes the selected package.

## Required orchestration

`caido-private` must:

1. create and validate coupled release branches;
2. bump the three coupled manifests through `bump.yml`;
3. create the immutable coupled tag;
4. dispatch `publish-release.yml` with that exact tag and wait for that exact Actions run to succeed;
5. avoid permission to move existing SDK release tags.

No legacy `main` publication or backwards-compatible publishing interface exists.
