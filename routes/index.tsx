import { Head } from "$fresh/runtime.ts";
import Card from "../components/Card.tsx";
import Header from "../components/Header.tsx";
import NewTaskInput from "../islands/Input.tsx";
import AllTaskList from "../islands/List.tsx";

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>TODO Task App</title>
      </Head>
      <div class="p-4">
        <div class="container flex flex-col gap-4 mx-auto">
          <Header />
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
    </>
  );
}
