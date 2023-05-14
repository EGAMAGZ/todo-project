import { signal } from "@preact/signals";
import { Task } from "../util/types.ts";
import { ComponentChildren, createContext } from "preact";

function createTasksState() {
  const taskList = signal<Task[]>([]);
  return taskList;
}

const TasksState = createContext(signal<Task[]>([]));

function TasksProvider({ children }: { children: ComponentChildren }) {
  return (
    <TasksState.Provider value={createTasksState()}>
      {children}
    </TasksState.Provider>
  );
}

export { TasksProvider, TasksState };
