import { type Selection } from "./utils";
/**
 * A unique intercept message identifier.
 * @category Intercept
 */
type InterceptMessageId = string & {
    __interceptMessageId?: never;
};
/**
 * Intercept page context.
 * @category Intercept
 */
export type InterceptPageContext = {
    kind: "Intercept";
    requestSelection: Selection<InterceptMessageId>;
    responseSelection: Selection<InterceptMessageId>;
    websocketSelection: Selection<InterceptMessageId>;
};
export {};
