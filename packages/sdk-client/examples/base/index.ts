import { Caido } from "@caido/sdk-client";

async function main() {
  // Get the Caido instance URL from environment or use default
  const instanceUrl =
    process.env["CAIDO_INSTANCE_URL"] ?? "http://localhost:8082";

  // Get the Personal Access Token from environment
  const pat =
    process.env["CAIDO_PAT"] ??
    "caido_qeGwYZfD1Y3KzalovnZ90yqVT0nlTMwu1DYe6H1fU39BBT1+E4NvB3gLpH6wNdYykGNyg/PQv12zA7USUrtsMQ==.xKZxXARdX1XVuqXefw15YjdEFNB07Wn21JHGNEsg/P4=";
  if (pat === undefined || pat === "") {
    console.error("❌ Error: CAIDO_PAT environment variable is required");
    console.error("   Set it with: export CAIDO_PAT=caido_xxxxx");
    process.exit(1);
  }

  const client = new Caido({
    url: instanceUrl,
    auth: {
      pat: pat,
      cache: {
        file: ".secrets.json",
      },
    },
    retry: false,
  });

  await client.connect();
  console.log("✅ Connected to Caido instance");

  const viewer = await client.user.viewer();
  console.log("Viewer: ", JSON.stringify(viewer, null, 2));
}

main().catch((error: unknown) => {
  console.error("❌ Fatal error:", error);
  process.exit(1);
});
