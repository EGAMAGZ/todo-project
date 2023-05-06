import { Task } from "../util/types.ts";
import {
  IconCalendarEvent,
  IconCircle,
  IconCircleCheck,
  IconPencil,
  IconPencilOff,
  IconTrash,
} from "./Icons.tsx";
import { useSignal } from "@preact/signals";
import Input from "./Input.tsx";
import { IS_BROWSER } from "https://deno.land/x/fresh@1.1.5/runtime.ts";
import IconDeviceFloppy from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/device-floppy.tsx";

interface TaskItemProps {
  task: Task;
  updateTask: (taskId: string, updatedTask: Task) => void;
  deleteTask: (taskId: string) => void;
}

interface DisplayTaskProps {
  task: Task;
}

interface EditTaskProps {
  taskTitle: string;
  onUpdate: (newTitle: string) => void;
}

function DisplayTask({ task }: DisplayTaskProps) {
  const dateFormat = Intl.DateTimeFormat(navigator.language, {
    dateStyle: "medium",
  });

  return (
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
  );
}

function EditTask({ taskTitle, onUpdate }: EditTaskProps) {
  const title = useSignal(taskTitle);

  const handleSubmit = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    title.value = value;
  };

  const handleUpdate = () => {
    onUpdate(title.value);
  };

  return (
    <div class="flex-1 flex flex-col gap-2">
      <label class="font-semibold">Title:</label>
      <div class="flex gap-2">
        <Input
          type="text"
          value={title}
          onChange={handleSubmit}
        />
        <button
          class="inline-flex items-center gap-1 text-uppercase font-medium bg-red-500 px-4 py-1 text-white rounded-sm"
          disabled={!IS_BROWSER}
          onClick={handleUpdate}
        >
          <span>
            Save
          </span>
          <IconDeviceFloppy size={24} />
        </button>
      </div>
    </div>
  );
}

export default function TaskItem(
  { task, updateTask, deleteTask }: TaskItemProps,
) {
  const isEditing = useSignal(false);

  const markCompleted = () => {
    updateTask(task.id, { ...task, completed: !task.completed });
  };

  const handleUpdate = (newTitle: string) => {
    updateTask(task.id, { ...task, title: newTitle });
    isEditing.value = false;
  };

  const handleDelete = (event: Event) => {
    deleteTask(task.id);
  };

  const handleEdit = (event: Event) => {
    isEditing.value = !isEditing.value;
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
        {isEditing.value
          ? <EditTask taskTitle={task.title} onUpdate={handleUpdate} />
          : <DisplayTask task={task} />}

        <button
          onClick={handleEdit}
          class="inline-grid relative"
        >
          <IconPencil
            size={24}
            class={`col-start-1 row-start-1 transition-opacity ${
              isEditing.value ? "opacity-0" : "opacity-100"
            }`}
          />
          <IconPencilOff
            size={24}
            class={`col-start-1 row-start-1 transition-opacity ${
              isEditing.value ? "opacity-100" : "opacity-0"
            }`}
          />
        </button>
        <button onClick={handleDelete}>
          <IconTrash size={24} />
        </button>
      </div>
    </div>
  );
}
