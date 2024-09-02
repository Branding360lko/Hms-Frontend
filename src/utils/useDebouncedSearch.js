import { useEffect, useState } from "react";

export const useDebouncedSearch = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(null);

  useEffect(() => {
    // console.log("debounce hit------");
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debouncedValue;
};
