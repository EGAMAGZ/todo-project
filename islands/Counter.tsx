import useTaskList from "../hooks/useTaskList.tsx";

export default function TotalTaskCounter() {
  const [task] = useTaskList();

  return <span class="text-xl text-white font-light">Total tasks created: {task.length}</span>;
}
