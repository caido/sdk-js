import type { Task } from "@/sdks/task.js";

export type TaskStatus = "DONE" | "CANCELLED" | "ERROR";

export type TaskResult = {
  task: Task;
  status: TaskStatus;
  error?: { code: string };
};
