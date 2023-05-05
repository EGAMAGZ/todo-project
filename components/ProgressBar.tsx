import { percentage } from "../util/math.ts";

interface ProgressBarProps {
  max: number;
  value: number;
  label: string;
}

export default function ProgressBar({ max, value, label }: ProgressBarProps) {
  return (
    <div class="flex flex-col">
      <span class="font-normal text-md">{label}</span>
      <div class="rounded-xl flex items-center gap-2">
        <progress
          max={max}
          value={value}
          class="w-full"
          style="accent-color: #f87171 !important;"
        />
        <span class="font-semibold">{percentage(max, value)}%</span>
      </div>
    </div>
  );
}
