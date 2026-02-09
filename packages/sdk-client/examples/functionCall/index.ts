import { Client } from "@caido/sdk-client";

type QuickSSRFSettings = {
  serverURL: string;
  token: string;
  pollingInterval: number;
  correlationIdLength: number;
  correlationIdNonceLength: number;
};

type GenerateUrlResult = {
  url: string;
  uniqueId: string;
};

async function main() {
  // Get the Caido instance URL from environment or use default
  const instanceUrl =
    process.env["CAIDO_INSTANCE_URL"] ?? "http://localhost:8080";

  // Get the Personal Access Token from environment
  const pat = process.env["CAIDO_PAT"];
  if (pat === undefined || pat === "") {
    console.error("❌ Error: CAIDO_PAT environment variable is required");
    console.error("   Set it with: export CAIDO_PAT=caido_xxxxx");
    process.exit(1);
  }

  const client = new Client({
    url: instanceUrl,
    auth: {
      pat: pat,
      cache: {
        file: ".secrets.json",
      },
    },
  });

  await client.connect();
  console.log("✅ Connected to Caido instance");

  const pluginPackage = await client.plugin.pluginPackage("quickssrf");
  if (pluginPackage === undefined) {
    console.error("❌ Error: Plugin package not found");
    process.exit(1);
  }

  const settings = await pluginPackage.callFunction<QuickSSRFSettings>({
    name: "getSettings",
  });

  await pluginPackage.callFunction({
    name: "startInteractsh",
    arguments: [
      {
        serverURL: settings.serverURL,
        token: settings.token,
        pollingInterval: settings.pollingInterval,
        correlationIdLength: settings.correlationIdLength,
        correlationIdNonceLength: settings.correlationIdNonceLength,
      },
    ],
  });

  const result = await pluginPackage.callFunction<GenerateUrlResult>({
    name: "generateInteractshUrl",
    arguments: [settings.serverURL],
  });

  console.log("✅ Generated URL: ", result.url);
}

main().catch((error: unknown) => {
  console.error("❌ Fatal error:", error);
  process.exit(1);
});
