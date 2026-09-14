import { readFileSync, writeFileSync } from "node:fs";
import { env, exit } from "node:process";

const releaseVersion = env["RELEASE_VERSION"];

if (releaseVersion === undefined || releaseVersion === "") {
  console.error("RELEASE_VERSION must be set");
  exit(1);
}

for (const packageName of ["sdk-backend", "sdk-frontend", "sdk-workflow"]) {
  const path = `packages/${packageName}/package.json`;
  const manifest = JSON.parse(readFileSync(path, "utf8"));
  manifest.version = releaseVersion;
  writeFileSync(path, `${JSON.stringify(manifest, null, 2)}\n`);
}
