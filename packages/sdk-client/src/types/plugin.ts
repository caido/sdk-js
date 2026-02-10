export type InstallPluginPackageInput = {
  source:
    | {
        file: File;
      }
    | {
        manifestId: string;
      };
  force?: boolean;
};

export type PluginBackend = {
  kind: "PluginBackend";
  id: string;
  manifestId: string;
  enabled: boolean;
};

export type PluginFrontend = {
  kind: "PluginFrontend";
  id: string;
  manifestId: string;
  enabled: boolean;
};

export type PluginWorkflow = {
  kind: "PluginWorkflow";
  id: string;
  manifestId: string;
  enabled: boolean;
};

export type Plugin = PluginBackend | PluginFrontend | PluginWorkflow;
