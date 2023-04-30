import { signal } from "@preact/signals";
import { Task } from "../util/types.ts";

export const taskList = signal<Task[]>([]);
