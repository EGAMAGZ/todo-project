import { useSignal } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";
import useTaskList from "../hooks/useTaskList.tsx";
import IconPlus from "../components/Icons.tsx";
// TODO: Check why IconPlus from table-icons downloads node_modules and launches error.

export default function NewTaskInput() {
  const isValid = useSignal<boolean>(true);
  const [_, addTask] = useTaskList();

  const taskTitle = useSignal<string>("");

  function onSubmit(event: Event) {
    event.preventDefault();
    if (taskTitle.value.trim() === "") {
      isValid.value = false;
      return;
    }
    addTask({
      title: taskTitle.value,
      id: crypto.randomUUID(),
      completed: false,
      createdAt: new Date(),
    });

    taskTitle.value = "";
    isValid.value = true;
  }

  function onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;

    isValid.value = value.trim() !== "";
    taskTitle.value = value;
  }

  return (
    <form onSubmit={onSubmit}>
      <div class="flex bg-white rounded-sm p-2">
        <input
          type="text"
          placeholder="New task"
          class="flex-1 bg-transparent outline-none	"
          value={taskTitle}
          onInput={onInput}
          disabled={!IS_BROWSER}
        />
        <button class="inline-flex items-center text-uppercase font-medium">
          Add
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
