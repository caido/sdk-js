import { type CommandID } from "./commands";
import { type ComponentDefinition, type Prettify } from "./utils";
type DefineSlotContent<TType extends string, P extends Record<string, unknown>> = Prettify<{
    type: TType;
} & P>;
export type ButtonSlotContent = DefineSlotContent<"Button", {
    label: string;
    icon?: string;
    onClick: () => void;
}>;
export type CustomSlotContent = DefineSlotContent<"Custom", {
    definition: ComponentDefinition;
}>;
export type CommandSlotContent = DefineSlotContent<"Command", {
    commandId: CommandID;
    icon?: string;
}>;
export type SlotContent = ButtonSlotContent | CustomSlotContent | CommandSlotContent;
export type DefineAddToSlotFn<TMap extends Record<string, DefineSlotContent<string, Record<string, unknown>>>> = {
    <K extends keyof TMap>(slot: K, spec: TMap[K]): void;
};
export {};
