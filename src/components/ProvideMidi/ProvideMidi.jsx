import React, { useEffect, useState, useCallback } from "react";
import { useAppState } from "../AppState";
import uniq from "lodash/uniq";
import throttle from "lodash/throttle";
import debounce from "lodash/debounce";

let currentNotes = [];

const ProvideMidi = ({ children }) => {
  const { midi } = useAppState("config");
  const { selectedNotes, setSelectedNotes } = useAppState("keyboard");

  const throttleSetSelectedNotes = debounce(n => {
    console.log("TRUTH", n);
    setSelectedNotes(n);
  }, 500);

  const addNote = noteId => {
    const t = new Date().getTime();

    currentNotes = currentNotes.filter(v => {
      return t - v.t < 700;
    });

    currentNotes.push({
      t,
      noteId
    });

    const uniqueNotes = uniq(currentNotes.map(x => x.noteId));

    throttleSetSelectedNotes(uniqueNotes);
  };

  const midiHandler = m => {
    var command = m.data[0];
    var note = m.data[1];
    var velocity = m.data.length > 2 ? m.data[2] : 0; // a velocity value might not be included with a noteOff command

    if (velocity > 0 && command > 0) {
      addNote(note);
    }
  };

  useEffect(() => {
    if (midi === true) {
      navigator.requestMIDIAccess().then(function(access) {
        for (const input of access.inputs.values()) {
          input.onmidimessage = midiHandler;
        }
      });
    }
  }, [midi]);

  return <>{children}</>;
};

export default ProvideMidi;
