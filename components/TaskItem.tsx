import { Task } from "../util/types.ts";
import IconCalendarEvent from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/calendar-event.tsx";
import { IconCircle, IconCircleCheck, IconTrash } from "./Icons.tsx";

interface TaskItemProps {
  task: Task;
  updateTask: (taskId: string, updatedTask: Task) => void;
  deleteTask: (taskId: string) => void;
}

export default function TaskItem(
  { task, updateTask, deleteTask }: TaskItemProps,
) {
  const markCompleted = () => {
    updateTask(task.id, { ...task, completed: !task.completed });
  };

  const dateFormat = Intl.DateTimeFormat(navigator.language, {
    dateStyle: "medium",
  });

  const handleDelete = (event: Event) => {
    deleteTask(task.id);
  };

  return (
    <div class="bg-white rounded-sm p-2">
      <div class="flex flex-row items-start gap-2 ">
        <button
          onClick={markCompleted}
          class="inline-grid relative"
        >
          <IconCircleCheck
            size={24}
            class={`col-start-1 row-start-1 ${
              task.completed ? "opacity-100" : "opacity-0"
            }`}
          />
          <IconCircle
            size={24}
            class={`col-start-1 row-start-1 ${
              task.completed ? "opacity-0" : "opacity-100"
            }`}
          />
        </button>
        <div class="flex-1 flex flex-col">
          <span class="font-semibold">
            {task.title}
          </span>
          <div class="flex items-center gap-1">
            <IconCalendarEvent size={12} />
            <span class="text-xs">
              Created at: {dateFormat.format(new Date(task.createdAt))}
            </span>
          </div>
        </div>
        <button onClick={handleDelete}>
          <IconTrash size={24} />
        </button>
      </div>
    </div>
  );
}
