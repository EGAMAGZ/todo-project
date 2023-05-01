import useTaskListManager from "../hooks/useTaskListManager.tsx";

export default function TasksStats() {
  const { tasks } = useTaskListManager();

  return (
    <div class="flex gap-2">
      <div class="flex-1 flex flex-col">
        <span class="font-light">
          Total tasks
        </span>
        <span class="text-4xl font-semibold">
          {tasks.length}
        </span>
      </div>
      <div class="border-l-2 border-solid border-gray-400 min-h-full" />
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
