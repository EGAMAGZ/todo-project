import useTaskListManager from "../hooks/useTaskList.tsx";

export default function TasksStats() {
  const { tasks } = useTaskListManager();

  return (
    <div class="flex">
      <div class="flex-1 flex flex-col">
        <span class="font-light">
          Total tasks
        </span>
        <span class="text-4xl font-semibold">
          {tasks.length}
        </span>
      </div>
      <div class="inline-block h-full border-3 border-red-500"></div>
      <div class="flex-1 flex flex-col">
        <span class="font-light">
          Completed tasks
        </span>
        <span class="text-4xl font-semibold">
          {tasks.filter((task) => task.completed).length}
        </span>
      </div>
    </div>
  );
}
