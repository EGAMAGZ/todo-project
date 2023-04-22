import { Signal, signal, useSignalEffect } from "@preact/signals";
import { Task } from "../util/types.ts";

const taskList = signal<Task[]>([]);

export default function useTaskList(): [Task[], (task: Task) => void] {
  useSignalEffect(() => {
    taskList.value = JSON.parse(window.localStorage.getItem("tasks") || "[]");
  });

  function addNewTask(newTask: Task) {
    taskList.value = [...taskList.value, newTask];
    window.localStorage.setItem("tasks", JSON.stringify(taskList.value));
  }

  return [taskList.value, addNewTask];
}
