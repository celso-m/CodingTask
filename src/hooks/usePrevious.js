import { useEffect, useRef } from "react";

const usePrevious = value => {
  const prevChildRef = useRef();

  useEffect(() => {
    prevChildRef.current = value;
  }, [value]);

  return prevChildRef.current;
};

export default usePrevious;