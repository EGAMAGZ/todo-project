import { IconChecks } from "tabler-icons";

export default function Header() {
  return (
    <div class="bg-red-500 rounded-md min-h-[40vh] flex flex-col justify-end p-4 relative overflow-hidden">
      <span class="text-6xl text-white">TODO Tasks</span>
      <div class="absolute bottom-0 right-0">
        <IconChecks size="320" color="#FAA4A5" />
      </div>
    </div>
  );
}
