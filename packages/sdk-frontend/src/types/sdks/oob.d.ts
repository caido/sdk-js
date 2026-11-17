import type { OOBInteraction, OOBSession } from "../types/oob";
import type { ListenerHandle } from "../types/utils";
/**
 * Utilities to interact with the out-of-band (OOB) server of the current project.
 * @category OOB
 */
export type OOBSDK = {
    /**
     * Get the OOB session of the current project.
     * @returns The session, or `undefined` if no hostname was generated yet or the session is still loading.
     */
    getSession: () => OOBSession | undefined;
    /**
     * Generate a new hostname, replacing the current session.
     * The previous hostname stops receiving interactions, those received so far are kept.
     * @returns The new session.
     * @throws If the OOB server is unavailable or the project is read-only.
     *
     * @example
     * ```ts
     * const session = await sdk.oob.createSession();
     * const payload = `ssrf1.${session.hostname}`;
     * ```
     */
    createSession: () => Promise<OOBSession>;
    /**
     * Get the loaded interactions of the current project, newest first.
     * @returns The interactions.
     */
    getInteractions: () => OOBInteraction[];
    /**
     * Subscribe to interactions as they are received.
     * @param callback The callback to call for each new interaction.
     * @returns An object with a `stop` method that can be called to stop listening.
     *
     * @example
     * ```ts
     * const handler = sdk.oob.onInteraction((interaction) => {
     *   sdk.window.showToast(`${interaction.protocol} callback from ${interaction.remoteAddress}`);
     * });
     * ```
     */
    onInteraction: (callback: (interaction: OOBInteraction) => void) => ListenerHandle;
    /**
     * Clear all interactions of the current project.
     * @throws If the project is read-only.
     */
    clearInteractions: () => Promise<void>;
};
