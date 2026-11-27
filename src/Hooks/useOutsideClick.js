import { useEffect } from "react";

/**
 * Calls `handler` when a click occurs outside the element referenced by `ref`.
 */
export function useOutsideClick(ref, handler) {
  useEffect(() => {
    if (!handler) return;
    const listener = (e) => {
      if (!ref.current || ref.current.contains(e.target)) return;
      handler(e);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
