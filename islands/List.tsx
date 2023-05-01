import IconCaretDown from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/caret-down.tsx";
import TaskItem from "../components/TaskItem.tsx";
import useTaskListManager from "../hooks/useTaskListManager.tsx";
import { Task } from "../util/types.ts";
import { useSignal } from "@preact/signals";
import { IconCircleX } from "../components/Icons.tsx";

interface TaskListProps {
  tasks: Task[];
  updateTask: (taskId: string, updatedTask: Task) => void;
}

function CompletedTaskList({ tasks, updateTask }: TaskListProps) {
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
        <span class="font-semibold">Completed</span>
        <span>{tasks.length}</span>
      </button>
      {showList.value &&
        (
          <div class="flex flex-col gap-1">
            {tasks.map((task, index) => (
              <>
                <TaskItem task={task} updateTask={updateTask} />
              </>
            ))}
          </div>
        )}
    </div>
  );
}

function IncompleteTaskList({ tasks, updateTask }: TaskListProps) {
  return (
    <div class="flex flex-col gap-1">
      {tasks.map((task, index) => (
        <>
          <TaskItem task={task} updateTask={updateTask} />
        </>
      ))}
    </div>
  );
}

function EmptyTaskList() {
  return (
    <div class="flex flex-col items-center justify-center h-32">
      <IconCircleX size={64} />
      <span class="text-xl mt-3">
        You have no tasks yet.
      </span>
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
              <IncompleteTaskList
                tasks={incompleteTasks}
                updateTask={updateTask}
              />
            )}
            {completeTasks.length > 0 && (
              <CompletedTaskList
                tasks={completeTasks}
                updateTask={updateTask}
              />
            )}
          </div>
        )
        : <EmptyTaskList />}
    </div>
  );
}
