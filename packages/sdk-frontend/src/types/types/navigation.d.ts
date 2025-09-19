export declare const Routes: {
    readonly Sitemap: "Sitemap";
    readonly Intercept: "Intercept";
    readonly Search: "Search";
    readonly HTTPHistory: "HTTPHistory";
    readonly Websockets: "Websockets";
    readonly Workflows: "Workflows";
    readonly Replay: "Replay";
    readonly Automate: "Automate";
    readonly Projects: "Projects";
    readonly Backups: "Backups";
    readonly MatchReplace: "Tamper";
    readonly Assistant: "Assistant";
    readonly Environment: "Environment";
    readonly Scope: "Scope";
    readonly Filter: "Filter";
    readonly Exports: "Exports";
    readonly Findings: "Findings";
    readonly Files: "Files";
    readonly Plugins: "Plugins";
    readonly Certificate: "Certificate";
    readonly About: "About";
    readonly Settings: "Settings";
};
export type Routes = (typeof Routes)[keyof typeof Routes];
export type PageChangeEvent = {
    type: "Core";
    routeId: Routes;
    path: string;
} | {
    type: "Plugin";
    path: string;
};
