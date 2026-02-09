import {
  AuthClient,
  AuthenticationError,
  type AuthenticationRequest,
  BrowserApprover,
} from "@caido/server-auth";

async function main() {
  // Get the Caido instance URL from environment or use default
  const instanceUrl =
    process.env["CAIDO_INSTANCE_URL"] ?? "http://localhost:8080";

  console.log(`Connecting to Caido instance at: ${instanceUrl}\n`);

  // Create a browser approver that displays the verification URL and user code
  const approver = new BrowserApprover(
    (request: AuthenticationRequest): void => {
      console.log("=== Authentication Required ===");
      console.log(`Visit: ${request.verificationUrl}`);
      console.log(`Expires at: ${request.expiresAt.toISOString()}`);
      console.log("===============================\n");
      console.log("Waiting for approval...");
    },
  );

  // Create the auth client
  const auth = new AuthClient({
    instanceUrl,
    approver,
  });

  try {
    // Start the authentication flow
    const token = await auth.startAuthenticationFlow();

    console.log("\n✅ Authentication successful!");
    console.log(`Access Token: ${token.accessToken.substring(0, 20)}...`);
    console.log(`Expires at: ${token.expiresAt.toISOString()}`);
    console.log(`Refresh Token: ${token.refreshToken.substring(0, 20)}...`);
  } catch (error: unknown) {
    if (error instanceof AuthenticationError) {
      console.error(`❌ Authentication error: ${error.message}`);
      process.exit(1);
    } else {
      console.error("❌ Unexpected error:", error);
      process.exit(1);
    }
  }
}

main().catch((error: unknown) => {
  console.error("❌ Fatal error:", error);
  process.exit(1);
});
