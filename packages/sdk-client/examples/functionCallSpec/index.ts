import { Client } from "@caido/sdk-client";
import type { Spec as QuickSSRFSpec } from "@caido-community/quickssrf";

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

  const pluginPackage =
    await client.plugin.pluginPackage<QuickSSRFSpec>("quickssrf");
  if (pluginPackage === undefined) {
    console.error("❌ Error: Plugin package not found");
    process.exit(1);
  }

  // Get the providers
  const providers = await pluginPackage.getProviders();
  if (providers.kind === "Error") {
    console.error("❌ Error: Failed to get providers");
    console.error("   Error:", providers.error);
    process.exit(1);
  }
  if (providers.value.length === 0) {
    console.error("❌ Error: No providers found");
    process.exit(1);
  }
  console.log("✅ Providers:", providers.value);

  // Create a session
  const session = await pluginPackage.createSession(providers.value[0]!.id);
  if (session.kind === "Error") {
    console.error("❌ Error: Failed to create session");
    console.error("   Error:", session.error);
    process.exit(1);
  }
  console.log("✅ Session:", session.value);
}

main().catch((error: unknown) => {
  console.error("❌ Fatal error:", error);
  process.exit(1);
});
