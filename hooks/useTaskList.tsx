import { Signal, signal, useSignalEffect } from "@preact/signals";
import { Task } from "../util/types.ts";

const taskList = signal<Task[]>([]);

interface TaskList {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (taskId: string, updatedTask: Task) => void;
  deleteTask: (taskId: string) => void;
  getTask: (taskId: string) => Task | undefined;
}

export default function useTaskList(): TaskList {
  useSignalEffect(() => {
    taskList.value = JSON.parse(
      window.localStorage.getItem("tasks") || "[]",
    );
  });

  const addTask = (task: Task) => {
    taskList.value = [...taskList.value, task];
    window.localStorage.setItem("tasks", JSON.stringify(taskList.value));
  };

  const updateTask = (taskId: string, updatedTask: Task) => {
    taskList.value = taskList.value.map((
      task,
    ) => (task.id === taskId ? updatedTask : task));
    window.localStorage.setItem("tasks", JSON.stringify(taskList.value));
  };

  const deleteTask = (taskId: string) => {
    taskList.value = taskList.value.filter((task) => task.id !== taskId);
    window.localStorage.setItem("tasks", JSON.stringify(taskList.value));
  };

  const getTask = (taskId: string) =>
    taskList.value.find((task) => task.id === taskId);

  return { tasks: taskList.value, addTask, updateTask, deleteTask, getTask };
}
