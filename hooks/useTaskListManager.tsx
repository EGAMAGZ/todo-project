import { useSignalEffect } from "@preact/signals";
import { Task } from "../util/types.ts";
import { taskList } from "../store/taskList.tsx";
import { TASK_KEY_STORAGE } from "../util/constants.ts";

interface TaskListManager {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (taskId: string, updatedTask: Task) => void;
  deleteTask: (taskId: string) => void;
}

export default function useTaskListManager(): TaskListManager {
  useSignalEffect(() => {
    taskList.value = JSON.parse(
      window.localStorage.getItem(TASK_KEY_STORAGE) || "[]",
    );
  });

  const addTask = (task: Task) => {
    taskList.value = [...taskList.value, task];
    window.localStorage.setItem(
      TASK_KEY_STORAGE,
      JSON.stringify(taskList.value),
    );
  };

  const updateTask = (taskId: string, updatedTask: Task) => {
    taskList.value = taskList.value.map((
      task,
    ) => (task.id === taskId ? updatedTask : task));
    window.localStorage.setItem(
      TASK_KEY_STORAGE,
      JSON.stringify(taskList.value),
    );
  };

  const deleteTask = (taskId: string) => {
    taskList.value = taskList.value.filter((task) => task.id !== taskId);
    window.localStorage.setItem(
      TASK_KEY_STORAGE,
      JSON.stringify(taskList.value),
    );
  };

  return { tasks: taskList.value, addTask, updateTask, deleteTask };
}
