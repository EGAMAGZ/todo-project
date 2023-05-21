import { Task } from "../util/types.ts";
import IconCalendarEvent from "@tabler/icons/calendar-event.tsx";
import IconCircle from "@tabler/icons/circle.tsx";
import IconCircleCheck from "@tabler/icons/circle-check.tsx";
import IconPencil from "@tabler/icons/pencil.tsx";
import IconPencilOff from "@tabler/icons/pencil-off.tsx";
import IconTrash from "@tabler/icons/trash.tsx";
import { useComputed, useSignal } from "@preact/signals";
import Input from "./Input.tsx";
import { IS_BROWSER } from "https://deno.land/x/fresh@1.1.5/runtime.ts";
import IconDeviceFloppy from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/device-floppy.tsx";
import Alert from "./Alert.tsx";

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
  const isEmpty = useSignal<boolean>(false);
  const isValid = useComputed(() => !isEmpty.value);
  const title = useSignal(taskTitle);

  const handleSubmit = (event: Event) => {
    event.preventDefault();
    if (title.value.trim() === "") {
      isEmpty.value = true;
      return;
    }
    onUpdate(title.value);

    isEmpty.value = false;
  };

  const handleInput = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;

    title.value = value;
    isEmpty.value = value.trim() === "";
  };

  return (
    <form class="flex-1 flex flex-col" onSubmit={handleSubmit}>
      <div class="flex flex-col gap-2">
        <label class="font-semibold">Editing task...</label>
        <div class="flex gap-2">
          <Input
            type="text"
            value={title}
            onInput={handleInput}
          />
          <button
            class="inline-flex items-center gap-1 text-uppercase font-medium bg-red-500 px-4 py-1 text-white rounded-sm"
            disabled={!IS_BROWSER}
          >
            <span>
              Save
            </span>
            <IconDeviceFloppy size={24} />
          </button>
        </div>
      </div>
      {!isValid.value && (
        <Alert>
          <span>Please enter a title.</span>
        </Alert>
      )}
    </form>
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
