import { useState, useEffect } from "react";

const useConfig = () => {
  const [midi, setMidi] = useState(false);

  return {
    midi,
    setMidi
  };
};

export default useConfig;
