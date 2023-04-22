import useTaskList from "../hooks/useTaskList.tsx";

export default function TaskPanel() {
  const [tasks, addTask] = useTaskList();

  function createTask() {
    addTask({ title: "New Task", id: crypto.randomUUID(), completed: false });
  }

  return (
    <>
      <span>total: {tasks.length}</span>

      <button onClick={createTask}>
        Create
      </button>
      <div>
        {tasks.map((task) => <div>{task.title}</div>)}
      </div>
    </>
  );
}
