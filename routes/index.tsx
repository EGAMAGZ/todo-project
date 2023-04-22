import { IconCheck, IconChecks } from "tabler-icons";

import { Head } from "$fresh/runtime.ts";
import Header from "../components/Header.tsx";
import TaskPanel from "../islands/TaskPanel.tsx";
import NewTaskInput from "../islands/Input.tsx";

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <div class="p-4">
        <div class="container mx-auto flex flex-col gap-4">
          <Header />
          <div class="bg-gray-200 rounded-md p-4 flex flex-col gap-2">
            <span class="font-semibold text-underline text-xl">
              Create new task
            </span>
            <NewTaskInput />
          </div>
          <TaskPanel />
          <IconChecks size="24" />
          <IconCheck size="24" />
        </div>
      </div>
    </>
  );
}
