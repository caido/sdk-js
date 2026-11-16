# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Releases before 0.6.0 predate this file.

## Unreleased

## [0.6.0] - 2026-11-03

### Breaking Changes

- The minimum supported Caido version is now 0.58.0. The bundled 0.56 and 0.57 transport forks are gone, and `latest` targets 0.59.0.
- AI provider credentials moved out of `instance.settings` into their own `instance.ai` SDK. `InstanceSettings.ai` and the `ai` group of `instance.settings.set()` are removed. Caido 0.59.0 replaced the four fixed providers with a named-provider API, which `instance.ai` reports as unsupported rather than writing to the old shape.
- `replay.sessions.createPipeline()` is folded into `replay.sessions.create({ kind: "HTTP_PIPELINE", … })`.
- `ReplaySessionHttpOnePipeline` and `ReplayEntryHttpOnePipeline` are now `ReplaySessionPipeline` and `ReplayEntryPipeline`. The session kind is `HTTP_PIPELINE` on every supported instance; 0.58's `HTTP_ONE_PIPELINE` is mapped on the wire.
- `CreateRequestOptions.source` takes the `Source` union instead of a `string`. `alteration`, `parentId` and `response` are removed, because no supported schema accepts them on `createRequest`.
- `ReplayWsMessage.editIds` is replaced by `edits`, which carries `{ id, alteration }` per revision, and `alteration` is the `Alteration` union rather than a `string`.
- `ReplayRequestSource.raw` is now encoded by the SDK, so it takes the request bytes rather than base64. Callers that were base64-encoding it themselves must stop.
- `ReplaySessionSDK` no longer takes a `ReplayEntrySDK`; sessions reach their entries through the session SDK itself.
- `ReplaySessionSDK.setActiveEntry()` and `ReplaySession.setActiveEntry()` return the updated session instead of `void`, and no longer re-read it.

### Added

- WebSocket replay sessions: `replay.startWs()`, `replay.watchWs()`, `ReplayWsTask.sendMessage()`, `.sendDraft()` and `.stop()`, and `ReplayEntryWs` carrying the handshake, the exchanged messages, the stream and the pending draft.
- Pipeline replay sessions and entries, with `PipelineStrategy` covering sequential, last-byte-synchronization and single-packet-attack dispatch.
- `ReplaySessionUnknown` and `ReplayEntryUnknown`, so a session kind this SDK does not model stays listable instead of throwing.
- Const enums for `ReplaySessionKind`, `PipelineStrategyKind`, `FailureBehavior`, `StreamMessageDirection`, `StreamWsMessageFormat`, `Alteration` and `Source`.
- `ReplaySessionSDK.entriesOf(sessionId)`, and `ReplaySession.entries()` on every session kind.
- `stripHttp2ConnectionHeaders` on replay session settings (Caido 0.59.0).

### Fixed

- `request.create()` selected `error` and `request` on `CreateRequestPayload`, which has only ever held `id` and `responseId`, so the call failed against every release.
- The DNS rewrite document named `DnsRewrite`, `DnsIpResolver` and `CreateDnsRewriteInput`, which no schema since 0.55.3 defines, so `dnsRewrite.create()` could not validate.
- `encodeBlob()` threw on any code point above U+00FF and could overflow the stack on large payloads.
- `replay.sessions.create()` sent `requestSource.raw` unencoded, which the `Blob` scalar rejects, so seeding a session from raw bytes never worked ([#37](https://github.com/caido/sdk-js/issues/37)).
- A failed `/health` probe is no longer cached forever, so `Version` can resolve once the instance recovers.
