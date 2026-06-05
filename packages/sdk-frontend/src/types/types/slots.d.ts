import { type CommandID } from "./commands";
import { type ComponentDefinition, type Prettify } from "./utils";
type DefineSlotContent<TType extends string, P extends Record<string, unknown>> = Prettify<{
    type: TType;
} & P>;
/**
 * Content for a button slot.
 * @category Slots
 */
export type ButtonSlotContent = DefineSlotContent<"Button", {
    label: string;
    icon?: string;
    onClick: () => void;
}>;
/**
 * Content for a custom component slot.
 * @category Slots
 */
export type CustomSlotContent = DefineSlotContent<"Custom", {
    definition: ComponentDefinition;
}>;
/**
 * Content for a command slot.
 * @category Slots
 */
export type CommandSlotContent = DefineSlotContent<"Command", {
    commandId: CommandID;
    icon?: string;
}>;
/**
 * Union type of all possible slot content types.
 * @category Slots
 */
export type SlotContent = ButtonSlotContent | CustomSlotContent | CommandSlotContent;
/**
 * A function type for adding content to slots.
 * @category Slots
 */
export type DefineAddToSlotFn<TMap extends Record<string, DefineSlotContent<string, Record<string, unknown>>>> = {
    <K extends keyof TMap>(slot: K, spec: TMap[K]): void;
};
export {};
