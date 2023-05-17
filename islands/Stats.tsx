import useTaskListManager from "../hooks/use-task-list-manager.tsx";
import { percentage } from "../util/math.ts";
import IconPercentage  from "@tabler/icons/percentage.tsx";

export default function TasksStats() {
  const { tasks } = useTaskListManager();

  return (
    <div class="flex gap-2">
      <div class="flex-1 flex flex-col">
        <span class="font-light text-xl">
          Total tasks
        </span>
        <span class="text-4xl font-semibold">
          {tasks.length}
        </span>
      </div>
      <div class="border-l-2 border-solid border-gray-400 min-h-full" />
      <div class="flex-1 flex flex-col">
        <span class="font-light text-xl">
          Completion percentage
        </span>
        <span class="text-4xl font-semibold flex items-center">
          {percentage(
            tasks.length,
            tasks.filter((task) => task.completed).length,
          )}
          <IconPercentage size={36} />
        </span>
      </div>
    </div>
  );
}
