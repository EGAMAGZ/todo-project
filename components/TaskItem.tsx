import { useSignal } from "@preact/signals";
import { Task } from "../util/types.ts";

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const isExpanded = useSignal<boolean>(false);

  return (
    <div class="bg-white rounded-sm p-2">
      <div class="flex">
        <span class="flex-1 font-semibold">
          {task.title}
        </span>
      </div>
    </div>
  );
}
