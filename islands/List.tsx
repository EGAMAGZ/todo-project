import TaskItem from "../components/TaskItem.tsx";
import useTaskList from "../hooks/useTaskList.tsx";
import { Task } from "../util/types.ts";

function CompletedTasks({ completedTasks, updateTask }: {
  completedTasks: Task[];
  updateTask: (taskId: string, updatedTask: Task) => void;
}) {
  return (
    <div>
      {completedTasks.length > 0 && (
        <>
          <span>Completed tasks</span>
          {completedTasks.map((task) => (
            <TaskItem task={task} updateTask={updateTask} />
          ))}
        </>
      )}
    </div>
  );
}

function IncompleteTasks({ incompleteTasks, updateTask }: {
  incompleteTasks: Task[];
  updateTask: (taskId: string, updatedTask: Task) => void;
}) {
  return (
    <div>
      {incompleteTasks.length > 0 &&
        incompleteTasks.map((task, index) => (
          <>
            <TaskItem task={task} updateTask={updateTask} />
            {index < incompleteTasks.length - 1 && <hr />}
          </>
        ))}
    </div>
  );
}

export default function AllTaskList() {
  const { tasks, updateTask } = useTaskList();
  const completedTasks = tasks.filter((task) => task.completed);

  const incompletedTasks = tasks.filter((task) => !task.completed);

  return (
    <div>
      {tasks.length > 0
        ? (
          <>
            <IncompleteTasks
              incompleteTasks={incompletedTasks}
              updateTask={updateTask}
            />
            <CompletedTasks
              completedTasks={completedTasks}
              updateTask={updateTask}
            />
          </>
        )
        : <span>No tasks</span>}
    </div>
  );
}
