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

## 👋 Client SDK

[![NPM Version](https://img.shields.io/npm/v/@caido/sdk-client?style=for-the-badge)](https://www.npmjs.com/package/@caido/sdk-client)

This is repository for the Caido client SDK.

The goal of this SDK is to allow scripts to access Caido Instances. It handles authentication, graphql and rest.

We recommend you look at the [examples](https://github.com/caido/sdk-js/tree/main/packages/sdk-client/examples) to learn how to use it.

```typescript
const client = new Client({
  url: instanceUrl,
  auth: {
    pat: "caido_xxxxxx",
    cache: {
      file: ".secrets.json",
    },
  },
});

await client.connect();

const viewer = await client.user.viewer();
```

## 💚 Community

Come join our [Discord](https://links.caido.io/www-discord) community and connect with other Caido users! We'd love to have you as part of the conversation and help with any questions you may have.
