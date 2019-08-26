import { useState, useEffect, useCallback } from "react";

function useWindowSize() {
  const isClient = typeof window === "object";
  const [windowSize, setWindowSize] = useState(0);

  const getSize = useCallback(() => {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }, [isClient]);

  const handleResize = useCallback(() => {
    setWindowSize(getSize);
  }, [setWindowSize, getSize]);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getSize, isClient, handleResize]);

  useEffect(() => {
    handleResize();
  }, [handleResize]);

  return windowSize;
}

export default useWindowSize;
