import React from "react";
import TopBarStyles from "./TopBarStyles.jsx";
import { Col, Grid, Row } from "react-styled-flexboxgrid";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppState } from "../AppState";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const TopBar = () => {
  const { midi, setMidi } = useAppState("config");

  return (
    <>
      <TopBarStyles>
        <Grid fluid>
          <Row>
            <Col xs={6}>
              <h1>What the Chord</h1>
            </Col>
            <Col xs={6}>
              <ul className="top-nav">
                <li>
                  <a href="#" onClick={() => {}}>
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => {
                      setMidi(!midi);
                    }}
                  >
                    {midi ? <FontAwesomeIcon icon={faCheck} /> : null} Midi
                  </a>
                </li>
                <li>
                  <a href="https://github.com/mickrip/what-the-chord">
                    <FontAwesomeIcon icon={faGithub} /> GitHub
                  </a>
                </li>
              </ul>
            </Col>
          </Row>
        </Grid>
      </TopBarStyles>
    </>
  );
};

export default TopBar;
