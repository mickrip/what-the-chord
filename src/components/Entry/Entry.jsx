import React, { useEffect, useState } from "react";
import soundplayer from "../../soundplayer";
import useWindowSize from "../../hooks/useWindowSize";
import Keyboard from "../Keyboard/Keyboard";
import { useAppState } from "../AppState";
import { chordFinder } from "../../helpers/chordfinder";

import ResultsFound from "../ResultsFound/ResultsFound";
import Meta from "../Meta/Meta";
import Notation from "../Notation/Notation";
import { Col, Grid, Row } from "react-styled-flexboxgrid";
import TopBar from "../TopBar/TopBar";
import ProvideMidi from "../ProvideMidi/ProvideMidi";

const Entry = () => {
  const [results, setResults] = useState({ matches: [], possibilities: [] });
  const windowSize = useWindowSize();
  const { selectedNotes, setSelectedNotes } = useAppState("keyboard");

  useEffect(() => {
    const matchedHashes = chordFinder(selectedNotes);
    setResults(matchedHashes);
  }, [selectedNotes]);

  return (
    <>
      <Meta results={results} />
      <TopBar />
      <ProvideMidi>
        <Keyboard
          notes={selectedNotes}
          width={windowSize.width}
          onChange={notes => {
            soundplayer.play(notes);
            setSelectedNotes(notes);
          }}
        />
      </ProvideMidi>
      <Grid>
        <Row>
          <Col sm={4}>
            <Notation selectedNotes={selectedNotes} />
          </Col>
          <Col sm={8}>
            <ResultsFound results={results} selectedNotes={selectedNotes} />
          </Col>
        </Row>
      </Grid>
    </>
  );
};

export default Entry;
