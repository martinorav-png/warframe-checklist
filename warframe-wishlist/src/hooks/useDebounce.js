import { useState, useEffect } from "react";

/**
 * Debounces a value by the given delay in ms.
 * @param {any} value
 * @param {number} delay
 * @returns {any}
 */
export function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
