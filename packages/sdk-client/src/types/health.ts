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
