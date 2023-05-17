import { ComponentChildren } from "preact";

interface AlertProps {
  children: ComponentChildren;
}

export default function Alert({ children }: AlertProps) {
  return (
    <div class="bg-red-400 border-1 border-red-500 text-white px-4 py-2 italic">
      {children}
    </div>
  );
}
