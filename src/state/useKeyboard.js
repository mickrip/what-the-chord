import { useState } from "react";

const useKeyboard = () => {
  const [selectedNotes, setSelectedNotes] = useState([]);

  return {
    setSelectedNotes,
    selectedNotes
  };
};

export default useKeyboard;
