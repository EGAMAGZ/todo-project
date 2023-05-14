import { useSignal, useSignalEffect } from "@preact/signals";

export default function useLocalStorage<T,>(
  key: string,
  initialValue?: T,
): [T | undefined, (newValue: T) => void] {
  const value = useSignal<T | undefined>(initialValue);

  useSignalEffect(() => {
    const getItem = async () => {
      const item = await window.localStorage.getItem(key);

      if (item) {
        value.value = JSON.parse(item) as T;
      }
    };

    getItem();
  });

  const changeValue = (newValue: T) => {
    value.value = newValue;
    window.localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [
    value.value,
    changeValue,
  ];
}
