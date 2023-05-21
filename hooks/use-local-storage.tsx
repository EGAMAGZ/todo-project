import { Signal, useSignal, useSignalEffect } from "@preact/signals";

export default function useLocalStorage<T,>(
  key: string,
  initialValue?: T,
): [Signal<T | undefined>, (newValue: T) => void] {
  const storedItem = useSignal<T | undefined>(initialValue);

  useSignalEffect(() => {
    const getItem = async () => {
      const item = await window.localStorage.getItem(key);

      if (item) {
        storedItem.value = JSON.parse(item) as T;
      }
    };

    getItem();
  });

  const changeValue = (newValue: T) => {
    storedItem.value = newValue;
    window.localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [
    storedItem,
    changeValue,
  ];
}
