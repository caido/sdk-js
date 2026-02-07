/**
 * Represents any valid JSON value.
 *
 * Currently null is not supported.
 */
export type Json = string | number | boolean | Json[] | { [key: string]: Json };
