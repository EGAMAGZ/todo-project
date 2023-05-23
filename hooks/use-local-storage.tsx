import { Signal, useSignal, useSignalEffect } from "@preact/signals";

export default function useLocalStorage<T,>(
  key: string,
  initialValue?: T,
): [Signal<T | null>, (newValue: T) => void, boolean] {
  const data = useSignal<T | null>(null);
  const loading = useSignal<boolean>(true);

  useSignalEffect(() => {
    const getItem = async () => {
      const item = await window.localStorage.getItem(key);

      if (item) {
        data.value = JSON.parse(item) as T;
      }
      loading.value = false;
    };

    getItem();
  });

  const changeValue = (newValue: T) => {
    data.value = newValue;
    window.localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [
    data,
    changeValue,
    loading.value,
  ];
}
