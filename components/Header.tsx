import getGreeting from "../util/greeting.ts";
import IconChecks from "@tabler/icons/checks.tsx";

export default function Header() {
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  const formattedDate = date.toLocaleDateString(navigator.language, options);
  const greeting = `${getGreeting()}!`;

  return (
    <div class="bg-red-500 rounded-md min-h-[40vh] flex flex-col justify-end p-4 relative overflow-hidden">
      <span class="text-6xl text-white font-semibold z-[2]">{greeting}</span>
      <span class="text-xl text-white font-light z-[2]">{formattedDate}</span>
      <div class="absolute bottom-0 right-0 z-[1]">
        <IconChecks size={320} color="#FAA4A5" />
      </div>
    </div>
  );
}
