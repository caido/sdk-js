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

## 👋 Server Auth

[![NPM Version](https://img.shields.io/npm/v/@caido/server-auth?style=for-the-badge)](https://www.npmjs.com/package/@caido/server-auth)

Authenticate with a Caido instance using device code flow.

```typescript
import { CaidoAuth, BrowserApprover } from "@caido/server-auth";

const auth = new CaidoAuth(
  "http://localhost:8080",
  new BrowserApprover((request) => {
    console.log(`Visit ${request.verificationUrl}`);
    console.log(`Enter code: ${request.userCode}`);
  })
);

const token = await auth.startAuthenticationFlow();
console.log("Access token:", token.accessToken);
```

## Examples

See the [examples](./examples/) directory for complete working examples:

- [Browser Authentication](./examples/browser/) - Manual approval via browser
- [PAT Authentication](./examples/pat/) - Automated approval using Personal Access Token

## 💚 Community

Come join our [Discord](https://links.caido.io/www-discord) community and connect with other Caido users! We'd love to have you as part of the conversation and help with any questions you may have.
