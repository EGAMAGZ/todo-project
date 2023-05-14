import { useComputed, useSignal } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";
import useTaskListInput from "../hooks/use-task-list-input.tsx";
import { IconPlus, IconX } from "../components/Icons.tsx";

export default function NewTaskInput() {
  const taskTitle = useSignal<string>("");

  const isEmpty = useSignal<boolean>(false);
  const isValid = useComputed(() => !isEmpty.value);
  const { addTask } = useTaskListInput();

  const handleSubmit = (event: Event) => {
    event.preventDefault();
    if (taskTitle.value.trim() === "") {
      isEmpty.value = true;
      return;
    }

    addTask(taskTitle.value);

    taskTitle.value = "";
    isEmpty.value = false;
  };

  const handleInput = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;

    isEmpty.value = value.trim() === "";
    taskTitle.value = value;
  };

  const clearInput = () => {
    taskTitle.value = "";
  };

  return (
    <form onSubmit={handleSubmit}>
      <div class="flex bg-white rounded-sm p-2">
        <input
          type="text"
          placeholder="New task"
          class="flex-1 bg-transparent outline-none"
          value={taskTitle}
          onInput={handleInput}
          disabled={!IS_BROWSER}
        />
        {taskTitle.value.trim() !== "" && (
          <button
            type="button"
            class="mx-2"
            onClick={clearInput}
            disabled={!IS_BROWSER}
          >
            <IconX size={24} />
          </button>
        )}
        <button
          class="inline-flex items-center gap-1 text-uppercase font-medium bg-red-500 px-4 py-1 text-white rounded-sm"
          disabled={!IS_BROWSER}
        >
          <span>
            Add
          </span>
          <IconPlus size={24} />
        </button>
      </div>

      {!isValid.value && (
        <div class="bg-red-400 border-1 border-red-500 text-white px-4 py-2 italic">
          Please enter a title.
        </div>
      )}
    </form>
  );
}
