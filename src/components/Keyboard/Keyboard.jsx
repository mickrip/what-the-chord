import React, { useState, useEffect } from "react";
import Key from "./Key";

const Keyboard = () => {
  const [notesSelected, setNotesSelected] = useState([]);

  const toggleNote = _note => {
    if (notesSelected.includes(_note)) {
      setNotesSelected(notesSelected.filter(n => n !== _note));
    } else {
      setNotesSelected(notesSelected.concat([_note]));
    }
  };

  useEffect(() => {
    console.log("NOTES", notesSelected);
  }, [notesSelected]);

  const noteNumbers = [...Array(24).keys()].map(n => n + 48);
  return (
    <div>
      {noteNumbers.map((nn, key) => {
        return (
          <Key
            key={key}
            noteRef={nn}
            onClick={() => {
              toggleNote(nn);
            }}
            isSelected={notesSelected.includes(nn)}
          />
        );
      })}
    </div>
  );
};

export default Keyboard;
