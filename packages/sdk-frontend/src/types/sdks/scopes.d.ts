import { type Scope, type ScopeSlotContent } from "../types/scopes";
import { type DefineAddToSlotFn } from "../types/slots";
import type { ID } from "../types/utils";
/**
 * Utilities to interact with scopes
 * @category Scopes
 */
export type ScopesSDK = {
    /**
     * Get all scopes.
     * @returns A list of scopes.
     */
    getScopes: () => Scope[];
    /**
     * Create a scope.
     * @param options Options for the scope.
     * @param options.name The name of the scope.
     * @param options.allowlist The list of included items in the scope.
     * @param options.denylist The list of excluded items in the scope.
     * @returns The created scope.
     *
     * @example
     * ```ts
     * const newScope = await sdk.scopes.createScope({
     *   name: "Example",
     *   allowlist: ["*example.com", "*github.com"],
     *   denylist: ["*caido.io"],
     * });
     * ```
     */
    createScope: (options: {
        name: string;
        allowlist: string[];
        denylist: string[];
    }) => Promise<Scope | undefined>;
    /**
     * Update a scope.
     * @param id The id of the scope to update.
     * @param options Options for the scope.
     * @param options.name The name of the scope.
     * @param options.allowlist The list of included items in the scope.
     * @param options.denylist The list of excluded items in the scope.
     * @returns The updated scope.
     */
    updateScope: (id: ID, options: {
        name?: string;
        allowlist?: string[];
        denylist?: string[];
    }) => Promise<Scope | undefined>;
    /**
     * Delete a scope.
     * @param id The id of the scope to delete.
     * @returns Whether the scope was deleted.
     */
    deleteScope: (id: ID) => Promise<boolean>;
    /**
     * Add a component to a slot.
     * @param slot The slot to add the component to.
     * @param content The content to add to the slot.
     * @example
     * ```ts
     * sdk.scopes.addToSlot(ScopeSlot.UpdateHeader, {
     *   type: "Button",
     *   label: "My Button",
     *   icon: "my-icon",
     *   onClick: () => {
     *     console.log("Button clicked");
     *   },
     * });
     *
     * sdk.scopes.addToSlot(ScopeSlot.CreateHeader, {
     *   type: "Custom",
     *   definition: MyComponent,
     * });
     *
     * sdk.scopes.addToSlot(ScopeSlot.UpdateHeader, {
     *   type: "Command",
     *   commandId: "my-command",
     *   icon: "my-icon",
     * });
     * ```
     */
    addToSlot: DefineAddToSlotFn<ScopeSlotContent>;
};
