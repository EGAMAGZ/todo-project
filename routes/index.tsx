import { IconCheck, IconChecks } from "tabler-icons";

import { Head } from "$fresh/runtime.ts";

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <div>
        <IconChecks size="24" />
        <IconCheck size="24" />
      </div>
    </>
  );
}
