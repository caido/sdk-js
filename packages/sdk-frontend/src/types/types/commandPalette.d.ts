import { type API } from "../sdks";
/**
 * The internal props for the command palette view.
 * @category Command Palette
 */
export type CommandPaletteViewPropsInternal = {
    /**
     * The function to call when the command palette is closed.
     */
    onClose: () => void;
    /**
     * The function to call when the command palette is backed.
     */
    onBack: () => void;
};
/**
 * The props for the command palette view.
 * @category Command Palette
 */
export type CommandPaletteViewProps = CommandPaletteViewPropsInternal & {
    sdk: API;
};
