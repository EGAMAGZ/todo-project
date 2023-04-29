import { ComponentChildren } from "preact";

interface CardProps {
  children: ComponentChildren;
}

export default function Card({ children }: CardProps) {
  return (
    <div class="bg-gray-200 rounded-md p-4 flex flex-col gap-2">
      {children}
    </div>
  );
}
