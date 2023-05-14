import { taskList } from "../store/taskList.tsx";
import { TASK_KEY_STORAGE } from "../util/constants.ts";
import { Task } from "../util/types.ts";
import useLocalStorage from "./use-local-storage.tsx";

export default function useTaskListInput() {
  const [_, setTasks] = useLocalStorage<Task[]>(TASK_KEY_STORAGE);

  const addTask = (title: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title,
      createdAt: new Date(),
      completed: false,
    };

    taskList.value = [...taskList.value, newTask];
    setTasks(taskList.value);
  };

  return { addTask };
}
