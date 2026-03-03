import type { Task } from "@/sdks/index.js";

export type TaskStatus = "DONE" | "CANCELLED" | "ERROR";

export type TaskResult = {
  task: Task;
  status: TaskStatus;
  error?: { code: string };
};
