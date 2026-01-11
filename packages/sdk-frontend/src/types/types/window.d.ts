import type { AssistantPageContext } from "./assistant";
import type { AutomatePageContext } from "./automate";
import type { BackupsPageContext } from "./backups";
import type { CertificatePageContext } from "./certificate";
import type { EnvironmentPageContext } from "./environment";
import type { ExportsPageContext } from "./exports";
import type { FilesPageContext } from "./files";
import type { FilterPageContext } from "./filter";
import type { FindingsPageContext } from "./findings";
import type { HTTPHistoryPageContext } from "./httpHistory";
import type { InterceptPageContext } from "./intercept";
import type { MatchReplacePageContext } from "./matchReplace";
import type { ProjectsPageContext } from "./projects";
import type { ReplayPageContext } from "./replay";
import type { ScopePageContext } from "./scopes";
import type { SearchPageContext } from "./search";
import type { SitemapPageContext } from "./sitemap";
import { type WebsocketPageContext } from "./websocket";
import type { WorkflowsPageContext } from "./workflows";
/**
 * Options for configuring a dialog.
 * @category Window
 */
export type DialogOptions = {
    title?: string;
    draggable?: boolean;
    closeOnEscape?: boolean;
    closable?: boolean;
    modal?: boolean;
    position?: "left" | "right" | "top" | "bottom" | "center" | "topleft" | "topright" | "bottomleft" | "bottomright";
};
/**
 * A dialog instance that can be closed programmatically.
 * @category Window
 */
export type Dialog = {
    close: () => void;
};
/**
 * Represents the context of the current page.
 * @category Window
 */
export type PageContext = AssistantPageContext | AutomatePageContext | BackupsPageContext | CertificatePageContext | ExportsPageContext | EnvironmentPageContext | FilterPageContext | FindingsPageContext | HTTPHistoryPageContext | ReplayPageContext | ScopePageContext | SearchPageContext | WorkflowsPageContext | ProjectsPageContext | FilesPageContext | MatchReplacePageContext | InterceptPageContext | SitemapPageContext | WebsocketPageContext;
/**
 * Represents the global context of the application.
 * @category Window
 */
export type GlobalContext = {
    page?: PageContext;
};
