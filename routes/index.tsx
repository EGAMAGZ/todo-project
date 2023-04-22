import { IconCheck, IconChecks } from "tabler-icons";

import { Head } from "$fresh/runtime.ts";
import Header from "../components/Header.tsx";
import TaskPanel from "../islands/TaskPanel.tsx";

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <div class="p-4">
        <div class="container mx-auto">
          <Header />
          <TaskPanel />
          <IconChecks size="24" />
          <IconCheck size="24" />
        </div>
      </div>
    </>
  );
}
