<div align="center">
  <img width="1000" alt="image" src="https://user-images.githubusercontent.com/6225588/211916659-567751d1-0225-402b-9141-4145c18b0834.png">

  <br />
  <br />
  <a href="https://caido.io/">Website</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://dashboard.caido.io/">Dashboard</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://docs.caido.io/" target="_blank">Docs</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://links.caido.io/roadmap">Roadmap</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://github.com/caido/caido/tree/main/brand">Branding</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://links.caido.io/www-discord" target="_blank">Discord</a>
  <br />
  <hr />
</div>

## 👋 SDK JS

This is the monorepo for all the JS SDK and related tooling of Caido. It contains the following packages:

- `sdk-client`: SDK to interact with a Caido Instance as a client
- `sdk-backend`: SDK definition for the Caido Plugin Backend
- `sdk-frontend`: SDK definition for the Caido Plugin Frontend
- `sdk-workflow`: SDK definition for Caido Workflows
- `sdk-shared`: Typing helpers shared between SDKs
- `quickjs-types`: Typing for the QuickJS Engine
- `server-auth`: Client to authenticate with a Caido Instance

## Release automation

SDK releases are not published from branch pushes. The three product-coupled packages (sdk-backend, sdk-frontend, sdk-workflow) are versioned together on `release/vX.Y.Z` branches. Publishing an immutable `vX.Y.Z[-rc.N]` GitHub Release triggers separate npm and GitHub Packages workflows. Both publishers require the release branch tip to match the tag; wait for both to finish before advancing that branch.

Independently versioned packages are released through `release-independent.yml`. It creates the selected package's `<package>-vX.Y.Z` tag and GitHub Release, then starts separate npm and GitHub Packages publishing jobs. npm uses `NPM_PUBLISH_TOKEN`. GitHub Packages uses `GITHUB_PACKAGES_TOKEN` when configured, otherwise the workflow's `GITHUB_TOKEN` with package write permission.

| GitHub Packages workflow | Packages | Manual inputs |
| --- | --- | --- |
| `publish-github.yml` | One of quickjs-types, sdk-shared, server-auth, sdk-client | `package`, immutable package `ref`, `dry-run` |
| `publish-release-github.yml` | sdk-backend, sdk-frontend, sdk-workflow | Immutable `vX.Y.Z[-rc.N]` `ref`, `dry-run` |

Both GitHub Packages workflows support manual dispatch, defaulting to a dry run. Retry a failed publisher with the same tag; already-published versions are skipped on GitHub Packages. RCs use the `beta` dist-tag and stable releases use `latest`. The registries have separate publication queues, with up to 100 pending runs per queue.

## 💚 Community

Come join our [Discord](https://links.caido.io/www-discord) community and connect with other Caido users! We'd love to have you as part of the conversation and help with any questions you may have.
