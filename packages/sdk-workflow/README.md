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

## 👋 Workflow SDK

[![NPM Version](https://img.shields.io/npm/v/@caido/sdk-workflow?style=for-the-badge)](https://www.npmjs.com/package/@caido/sdk-workflow)

This is repository for the Caido workflow SDK.

You usually don't need to use this package directly since typing is already included in the runtime.

But this can be useful if you want to write to code externally in Typescript and built it to JS.

```typescript
import { PassiveInput, SDK, Data } from "./typing";

export async function run(
  input: PassiveInput,
  sdk: SDK,
): Promise<Data | undefined> {
  if (input.request) {
    sdk.console.log(input.request.getMethod());
  }
  return;
}
```

## 💚 Community

Come join our [Discord](https://links.caido.io/www-discord) community and connect with other Caido users! We'd love to have you as part of the conversation and help with any questions you may have.
