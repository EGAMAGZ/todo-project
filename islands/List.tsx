import TaskItem from "../components/TaskItem.tsx";
import useTaskListManager from "../hooks/useTaskList.tsx";
import { Task } from "../util/types.ts";

function CompletedTasks({ completedTasks, updateTask }: {
  completedTasks: Task[];
  updateTask: (taskId: string, updatedTask: Task) => void;
}) {
  return (
    <>
      <span>Completed tasks</span>
      <div>
        {completedTasks.map((task, index) => (
          <>
            <TaskItem task={task} updateTask={updateTask} />

            {index < completedTasks.length - 1 && <hr />}
          </>
        ))}
      </div>
    </>
  );
}

function IncompleteTasks({ incompleteTasks, updateTask }: {
  incompleteTasks: Task[];
  updateTask: (taskId: string, updatedTask: Task) => void;
}) {
  return (
    <>
      {incompleteTasks.map((task, index) => (
        <>
          <TaskItem task={task} updateTask={updateTask} />
          {index < incompleteTasks.length - 1 && <hr />}
        </>
      ))}
    </>
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
          <>
            <div>
              {incompleteTasks.length > 0 && (
                <IncompleteTasks
                  incompleteTasks={incompleteTasks}
                  updateTask={updateTask}
                />
              )}
            </div>
            <div>
              {completeTasks.length > 0 && (
                <CompletedTasks
                  completedTasks={completeTasks}
                  updateTask={updateTask}
                />
              )}
            </div>
          </>
        )
        : <span>No tasks</span>}
    </div>
  );
}
