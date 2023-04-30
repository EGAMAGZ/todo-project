import { taskList } from "../store/taskList.tsx";
import { Task } from "../util/types.ts";

export default function useTaskListInput() {
  const addTask = (title: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title,
      createdAt: new Date(),
      completed: false,
    };

    taskList.value = [...taskList.value, newTask];
    window.localStorage.setItem("tasks", JSON.stringify(taskList.value));
  };

  return { addTask };
}
