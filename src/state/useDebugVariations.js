import { useState } from "react";

let syncVariations = [];
const useDebugVariations = () => {
  const [data, setData] = useState([]);

  const addToVariations = (name, notes) => {
    syncVariations.push({ name, notes });
    setData(syncVariations);
  };

  return {
    variations: data,
    addToVariations
  };
};

export default useDebugVariations;
