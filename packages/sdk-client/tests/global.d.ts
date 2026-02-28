import type { Client, Project } from "@caido/sdk-client";

declare global {
  var caido: Client;
  var testProject: Project | undefined;
}

export {};
