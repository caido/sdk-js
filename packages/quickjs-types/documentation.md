# QuickJS Modules

Here is the reference of the modules available in our engine.

This documentation is auto-generated from the Typescript typing ([`@caido/quickjs-types`](https://www.npmjs.com/package/@caido/quickjs-types)) which is the source of truth.

Some elements are similar to `Node.JS`, but some imports will be different and start with `caido:`.

## Modules

| Module                                   | Description              | Import             | Global |
| ---------------------------------------- | ------------------------ | ------------------ | ------ |
| [abort](llrt/abort.md)                   | Abort signaling          | N/A                | ✔︎      |
| [buffer](llrt/buffer.md)                 | Buffers                  | `buffer`           | ✔︎      |
| [child_process](llrt/child_process.md)   | Process spawning         | `child_process`    | ✘      |
| [console](extra/console.md)              | Console logging          | N/A                | ✔︎      |
| [crypto](caido/crypto.md)                | Cryptographic primitives | `crypto`           | ✘      |
| [dom-events](llrt/dom-events.md)         | Event Listeners          | N/A                | ✔︎      |
| [dns](llrt/dns.md)                       | DNS                      | `dns`              | ✘      |
| [events](llrt/events.md)                 | Event Emitter            | `events`           | ✘      |
| [fs](llrt/fs/index.md)                   | File system              | `fs`, `fs/promise` | ✘      |
| [http](caido/http.md)                    | Fetch implementation     | `caido:http`       | ✘      |
| [https](llrt/https.md)                   | HTTPS                    | `https`            | ✘      |
| [globals](llrt/globals/index.md)         | Global classes           | N/A                | ✔︎      |
| [net](llrt/net.md)                       | Sockets                  | `net`              | ✘      |
| [os](extra/os.md)                        | OS information           | `os`               | ✘      |
| [path](llrt/path/index.md)               | Path transformation      | `path`             | ✘      |
| [sqlite](extra/sqlite.md)                | SQlite access            | `sqlite`           | ✘      |
| [stream](llrt/stream/stream.md)          | Streams (basic)          | `stream`           | ✔︎      |
| [stream/web](llrt/stream/web/index.md)   | Streams Web              | `stream/web`       | ✘      |
| [string_decoder](llrt/string_decoder.md) | String Decoder           | `string_decoder`   | ✘      |
| [timers](extra/timers.md)                | Timers                   | N/A                | ✔︎      |
| [url](llrt/url/index.md)                 | URL utilities            | `url`              | ✔︎      |
