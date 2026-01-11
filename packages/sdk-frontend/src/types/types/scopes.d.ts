import { type ButtonSlotContent, type CommandSlotContent, type CustomSlotContent } from "./slots";
import { type ID, type Selection } from "./utils";
/**
 * Represents a scope.
 * @category Scopes
 */
export type Scope = {
    /**
     * The unique ID of the scope.
     */
    id: ID;
    /**
     * The name of the scope.
     */
    name: string;
    /**
     * The list of included items.
     */
    allowlist: string[];
    /**
     * The list of excluded items.
     */
    denylist: string[];
};
/**
 * The slots in the Scopes UI.
 * @category Scopes
 */
export declare const ScopeSlot: {
    /**
     * The header area of the preset form update component, to the left of the ScopeTooltip.
     */
    readonly UpdateHeader: "update-header";
    /**
     * The header area of the preset form create component, to the left of the ScopeTooltip.
     */
    readonly CreateHeader: "create-header";
};
export type ScopeSlot = (typeof ScopeSlot)[keyof typeof ScopeSlot];
export type ScopeSlotContent = {
    [ScopeSlot.UpdateHeader]: ButtonSlotContent | CustomSlotContent | CommandSlotContent;
    [ScopeSlot.CreateHeader]: ButtonSlotContent | CustomSlotContent | CommandSlotContent;
};
/**
 * Event fired when the current scope changes.
 * @category Scopes
 */
export type CurrentScopeChangeEvent = {
    /**
     * The ID of the newly selected scope, or undefined if no scope is selected.
     */
    scopeId: ID | undefined;
};
/**
 * Scope page context.
 * @category Scopes
 */
export type ScopePageContext = {
    kind: "Scope";
    selection: Selection<ID>;
};
