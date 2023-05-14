import { Head } from "$fresh/runtime.ts";
import Card from "../components/Card.tsx";
import Header from "../components/Header.tsx";
import { TasksProvider } from "../context/tasks.tsx";
import NewTaskInput from "../islands/Input.tsx";
import AllTaskList from "../islands/List.tsx";
import TasksStats from "../islands/Stats.tsx";

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>TODO Task App</title>
      </Head>
      <TasksProvider>
        <div class="p-4">
          <div class="container flex flex-col gap-4 mx-auto">
            <Header />
            <Card>
              <TasksStats />
            </Card>
            <Card>
              <span class="font-semibold text-xl">
                Create new task
              </span>
              <NewTaskInput />
            </Card>
            <Card>
              <AllTaskList />
            </Card>
          </div>
        </div>
      </TasksProvider>
    </>
  );
}
