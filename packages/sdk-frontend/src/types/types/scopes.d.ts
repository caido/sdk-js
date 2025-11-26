import { type ButtonSlotContent, type CommandSlotContent, type CustomSlotContent } from "./slots";
import { type ID } from "./utils";
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
