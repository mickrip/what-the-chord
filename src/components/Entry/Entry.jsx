import React, { useEffect, useState } from "react";
import soundplayer from "../../soundplayer";
import useWindowSize from "../../hooks/useWindowSize";
import Keyboard from "../Keyboard/Keyboard";
import { useAppState } from "../AppState";
import { chordFinder } from "../../helpers/chordfinder";
import ShowHash from "../ShowHash/ShowHash";
import ResultsFound from "../ResultsFound/ResultsFound";
import Meta from "../Meta/Meta";
import Notation from "../Notation/Notation";
import { Col, Grid, Row } from "react-styled-flexboxgrid";

const Entry = () => {
  const [results, setResults] = useState({ matches: [], possibilities: [] });
  const windowSize = useWindowSize();
  const { selectedNotes, setSelectedNotes } = useAppState("keyboard");

  useEffect(() => {
    const matchedHashes = chordFinder(selectedNotes);
    setResults(matchedHashes);
    console.log("matchedHashes", matchedHashes);
  }, [selectedNotes]);

  return (
    <>
      <Meta results={results}/>
      <Keyboard
        notes={selectedNotes}
        width={windowSize.width}
        onChange={notes => {
          soundplayer.play(notes);
          setSelectedNotes(notes);
        }}
      />
      <Grid>
        <Row>
          <Col sm={3}> <Notation selectedNotes={selectedNotes}/></Col>
          <Col sm={9}> <ResultsFound results={results}/></Col>
        </Row>
      </Grid>
      <ShowHash selectedNotes={selectedNotes}/>
    </>
  );
};

export default Entry;
