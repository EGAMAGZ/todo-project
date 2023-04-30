import { useSignal } from "@preact/signals";
import { Task } from "../util/types.ts";

interface TaskItemProps {
  task: Task;
  updateTask: (taskId: string, updatedTask: Task) => void;
}

export default function TaskItem({ task, updateTask }: TaskItemProps) {
  const isExpanded = useSignal<boolean>(false);

  const markCompleted = () => {
    updateTask(task.id, { ...task, completed: !task.completed });
  };

  return (
    <div class="bg-white rounded-sm p-2">
      <div class="flex flex-row">
        <div>
          <button
            onClick={markCompleted}
          >
            {String(task.completed)}
          </button>
        </div>
        <div class="flex-1 flex flex-col">
          <span class="font-semibold">
            {task.title}
          </span>
          <span>
            {task.createdAt}
          </span>
        </div>
      </div>
    </div>
  );
}
