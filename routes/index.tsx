import { Head } from "$fresh/runtime.ts";
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
          <div class="bg-gray-200 rounded-md p-4 flex flex-col gap-2">
            <span class="font-semibold text-underline text-xl">
              Create new task
            </span>
            <NewTaskInput />
          </div>
          <div class="bg-gray-200 rounded-md p-4 flex flex-col gap-2">
            <AllTaskList />
          </div>
        </div>
      </div>
    </>
  );
}
