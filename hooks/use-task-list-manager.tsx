import { Signal, useSignalEffect } from "@preact/signals";
import { Task } from "../util/types.ts";
import { TASK_KEY_STORAGE } from "../util/constants.ts";
import useLocalStorage from "./use-local-storage.tsx";
import { useContext } from "preact/hooks";
import { TasksState } from "../context/tasks.tsx";

interface TaskListManager {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (taskId: string, updatedTask: Task) => void;
  deleteTask: (taskId: string) => void;
}

export default function useTaskListManager(): TaskListManager {
  const taskList = useContext(TasksState);
  const [tasks, setTasks, isLoading] = useLocalStorage<Task[]>(
    TASK_KEY_STORAGE,
  );

  useSignalEffect(() => {
    if (isLoading) {
      taskList.value = tasks.value ?? [];
    }
  });

  const addTask = (task: Task) => {
    taskList.value = [...taskList.value, task];
    setTasks(taskList.value);
  };

  const updateTask = (taskId: string, updatedTask: Task) => {
    taskList.value = taskList.value.map((
      task,
    ) => (task.id === taskId ? updatedTask : task));
    setTasks(taskList.value);
  };

  const deleteTask = (taskId: string) => {
    taskList.value = taskList.value.filter((task) => task.id !== taskId);
    setTasks(taskList.value);
  };

  return { tasks: taskList.value, addTask, updateTask, deleteTask };
}
