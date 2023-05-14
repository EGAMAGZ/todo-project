// import { taskList } from "../store/taskList.tsx";
import { useContext } from "preact/hooks";
import { TASK_KEY_STORAGE } from "../util/constants.ts";
import { Task } from "../util/types.ts";
import useLocalStorage from "./use-local-storage.tsx";
import { TasksState } from "../context/tasks.tsx";

export default function useTaskListInput() {
  const taskList = useContext(TasksState);

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
