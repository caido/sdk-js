#!/usr/bin/env bash

set -euo pipefail

package="${1:?package is required}"
registry="${2:?registry is required}"
directory="packages/$package"

: "${DRY_RUN:?DRY_RUN must be set}"
: "${NPM_DIST_TAG:?NPM_DIST_TAG must be set}"
: "${RELEASE_BRANCH:?RELEASE_BRANCH must be set}"

name="$(node -p "require('./$directory/package.json').name")"
version="$(node -p "require('./$directory/package.json').version")"

if [[ "$DRY_RUN" != "true" ]]; then
  set +e
  output="$(npm view "$name@$version" version --registry "$registry" 2>&1)"
  status=$?
  set -e

  if [[ $status -eq 0 ]]; then
    echo "$name@$version already exists at $registry; skipping"
    exit 0
  elif ! grep -Eq '\bE404\b|\b404 Not Found\b' <<<"$output"; then
    echo "$output" >&2
    exit "$status"
  fi
fi

args=(
  --filter "$package"
  publish
  --access public
  --tag "$NPM_DIST_TAG"
  --publish-branch "$RELEASE_BRANCH"
  --registry "$registry"
)

if [[ "$DRY_RUN" == "true" ]]; then
  args+=(--dry-run)
fi

pnpm "${args[@]}"
