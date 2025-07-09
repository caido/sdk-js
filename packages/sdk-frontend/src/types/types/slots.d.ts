import { type Component } from "vue";
import { type CommandID } from "./commands";
type DefineSlotContent<TType extends string, P extends Record<string, unknown>> = {
    type: TType;
} & P;
export type ButtonSlotContent = DefineSlotContent<"Button", {
    label: string;
    icon?: string;
    onClick: () => void;
}>;
export type CustomSlotContent<TProps extends Record<string, unknown> = Record<string, unknown>> = DefineSlotContent<"Custom", {
    component: Component<TProps>;
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
