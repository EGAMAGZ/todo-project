import IconCaretDown from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/caret-down.tsx";
import TaskItem from "../components/TaskItem.tsx";
import useTaskListManager from "../hooks/useTaskList.tsx";
import { Task } from "../util/types.ts";
import { useSignal } from "@preact/signals";

function CompletedTasks({ completedTasks, updateTask }: {
  completedTasks: Task[];
  updateTask: (taskId: string, updatedTask: Task) => void;
}) {
  const showList = useSignal<boolean>(true);

  return (
    <div class="flex flex-col gap-2">
      <button
        class="text-white p-2 inline-flex items-center max-w-max gap-2 bg-red-500 rounded-sm"
        onClick={() => {
          showList.value = !showList.value;
        }}
      >
        <IconCaretDown
          size={24}
          class={`transition-transform ${showList.value ? "" : "-rotate-90"}`}
        />
        <span class="font-semibold">Completed tasks</span>
      </button>
      {showList.value &&
        (
          <div class="flex flex-col gap-1">
            {completedTasks.map((task, index) => (
              <>
                <TaskItem task={task} updateTask={updateTask} />
              </>
            ))}
          </div>
        )}
    </div>
  );
}

function IncompleteTasks({ incompleteTasks, updateTask }: {
  incompleteTasks: Task[];
  updateTask: (taskId: string, updatedTask: Task) => void;
}) {
  return (
    <div class="flex flex-col gap-1">
      {incompleteTasks.map((task, index) => (
        <>
          <TaskItem task={task} updateTask={updateTask} />
        </>
      ))}
    </div>
  );
}

export default function AllTaskList() {
  const { tasks, updateTask } = useTaskListManager();
  const completeTasks = tasks.filter((task) => task.completed);

  const incompleteTasks = tasks.filter((task) => !task.completed);

  return (
    <div>
      {tasks.length > 0
        ? (
          <div class="flex flex-col gap-2">
            {incompleteTasks.length > 0 && (
              <IncompleteTasks
                incompleteTasks={incompleteTasks}
                updateTask={updateTask}
              />
            )}
            {completeTasks.length > 0 && (
              <CompletedTasks
                completedTasks={completeTasks}
                updateTask={updateTask}
              />
            )}
          </div>
        )
        : <span>No tasks</span>}
    </div>
  );
}
