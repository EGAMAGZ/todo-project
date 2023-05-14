import { useSignal } from "@preact/signals";

export default function useConfirmDelete() {
  const confirmDelete = useSignal<boolean>(false);
}
