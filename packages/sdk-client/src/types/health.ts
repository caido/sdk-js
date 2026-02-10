import { z } from "zod";

export type Health = {
  name: string;
  version: string;
  ready: boolean;
};

export const healthSchema: z.ZodType<Health> = z.object({
  name: z.string(),
  version: z.string(),
  ready: z.boolean(),
});

/**
 * Options for the ready() method
 */
export type ReadyOptions = {
  /**
   * Interval between health checks in milliseconds.
   * @default 5000
   */
  interval?: number;
  /**
   * Maximum number of retries before giving up.
   * @default 5
   */
  retries?: number;
  /**
   * Overall timeout in milliseconds.
   * @default 5000
   */
  timeout?: number;
};

/**
 * Options for the connect() method
 */
export type ConnectOptions = {
  /**
   * Whether to wait for the instance to be ready after authentication.
   * If `true`, uses default ready options.
   * If `false`, skips the ready check.
   * If a `ReadyOptions` object, uses those options for the ready check.
   * @default true
   */
  ready?: ReadyOptions | boolean;
};
