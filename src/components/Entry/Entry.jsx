import React from "react";
import soundplayer from "../../soundplayer";
//import { reduceToBase } from "../../helpers/chordfinder";
import useWindowSize from "../../hooks/useWindowSize";
import Keyboard from "../Keyboard/Keyboard";
import { useAppState } from "../AppState";

const Entry = () => {
  const windowSize = useWindowSize();
  const { selectedNotes, setSelectedNotes } = useAppState("keyboard");
  return (
    <Keyboard
      notes={selectedNotes}
      width={windowSize.width}
      onChange={notes => {
        soundplayer.play(notes);
        setSelectedNotes(notes);
        //const test = reduceToBase(notes);
        //console.log("TEST", test, reducedNotesToHash(test));
      }}
    />
  );
};

export default Entry;
