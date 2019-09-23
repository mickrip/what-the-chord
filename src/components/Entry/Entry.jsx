import React, { useEffect, useState } from "react";
import soundplayer from "../../soundplayer";
import useWindowSize from "../../hooks/useWindowSize";
import Keyboard from "../Keyboard/Keyboard";
import { useAppState } from "../AppState";
import { chordFinder } from "../../helpers/chordfinder";
import ShowHash from "../ShowHash/ShowHash";
import ResultsFound from "../ResultsFound/ResultsFound";

const Entry = () => {
  const [results, setResults] = useState([]);

  const windowSize = useWindowSize();
  const { selectedNotes, setSelectedNotes } = useAppState("keyboard");

  useEffect(() => {
    const matchedHashes = chordFinder(selectedNotes);

    setResults(matchedHashes);
    console.log("matchedHashes", matchedHashes);
  }, [selectedNotes]);

  return (
    <>
      <Keyboard
        notes={selectedNotes}
        width={windowSize.width}
        onChange={notes => {
          soundplayer.play(notes);
          setSelectedNotes(notes);
        }}
      />
      <ResultsFound results={results} />
      <ShowHash selectedNotes={selectedNotes} />
    </>
  );
};

export default Entry;