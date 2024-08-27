export type { CommandContext } from "./commands";
export type Navigation = {
    goTo: (path: string) => void;
    addPage: (path: string, options: PageOptions) => void;
};
type PageOptions = {
    body: HTMLElement;
    topbar?: HTMLElement;
};
