import React, { useEffect, useState, useCallback } from "react";
import { useAppState } from "../AppState";
import uniq from "lodash/uniq";

import debounce from "lodash/debounce";

let currentNotes = [];
let midiInputs;

const ProvideMidi = ({ children }) => {
  const { midi } = useAppState("config");
  const { setSelectedNotes } = useAppState("keyboard");
  const [alreadyInitialised, setAlreadyInitialised] = useState(false);

  const throttleSetSelectedNotes = debounce(n => {
    setSelectedNotes(n);
  }, 400);

  const addNote = useCallback(
    noteId => {
      const t = new Date().getTime();

      currentNotes = currentNotes.filter(v => {
        return t - v.t < 400;
      });

      currentNotes.push({
        t,
        noteId
      });

      const sortedNotes = currentNotes.map(x => x.noteId);
      const uniqueNotes = uniq(sortedNotes);

      throttleSetSelectedNotes(uniqueNotes.sort());
    },
    [throttleSetSelectedNotes]
  );

  const midiHandler = useCallback(
    m => {
      const command = m.data[0];
      const note = m.data[1];
      const velocity = m.data.length > 2 ? m.data[2] : 0; // a velocity value might not be included with a noteOff command

      if (velocity > 0 && command > 0) {
        addNote(note);
      }
    },
    [addNote]
  );

  useEffect(() => {
    if (midi === true) {
      if (alreadyInitialised === false) {
        navigator.requestMIDIAccess().then(function(access) {
          midiInputs = access.inputs;

          for (const input of midiInputs.values()) {
            input.onmidimessage = midiHandler;
          }
          setAlreadyInitialised(true);
        });
      }
    } else {
      // turn off everything
      if (alreadyInitialised) {
        for (const input of midiInputs.values()) {
          input.onmidimessage = () => {};
        }
        setAlreadyInitialised(false);
      }
    }
  }, [midi, midiHandler, alreadyInitialised]);

  return <>{children}</>;
};

export default ProvideMidi;
