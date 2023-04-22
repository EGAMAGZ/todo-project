import TaskItem from "../components/TaskItem.tsx";
import useTaskList from "../hooks/useTaskList.tsx";

export default function AllTaskList() {
  const [tasks] = useTaskList();
  return (
    <div>
      {tasks.map((task, index) => (
        <>
          <TaskItem task={task} />
          {index < tasks.length - 1 && <hr />}
        </>
      ))}
    </div>
  );
}