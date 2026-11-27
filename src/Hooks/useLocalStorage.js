import { useState } from "react";

/**
 * Like useState but persisted in localStorage under `key`.
 */
export function useLocalStorage(key, initialValue) {
  const [stored, setStored] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const val = value instanceof Function ? value(stored) : value;
      setStored(val);
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.warn("useLocalStorage: could not save", key, e);
    }
  };

  return [stored, setValue];
}
