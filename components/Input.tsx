import { JSX } from "preact/jsx-runtime";

export default function Input(props: JSX.HTMLAttributes<HTMLInputElement>) {
  return (
    <div class="bg-white rounded-sm p-1 border-gray-200 border-1 flex-1">
      <input
        class="w-full outline-none h-4"
        {...props}
      />
    </div>
  );
}
