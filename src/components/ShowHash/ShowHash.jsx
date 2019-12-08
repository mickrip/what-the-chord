import React  from "react";
import styled from "styled-components";
import {
  getNormalisedRootVariations,
  reducedNotesToHash
} from "../../helpers/chordfinder";

const ShowHashStyles = styled.div`
  height: 14px;
  bottom: 0;
  right: 0;
  position: absolute;
  padding: 8px;
  background: #236c90;
  font-family: monospace;
  color: white;
`;

const ShowHash = ({ selectedNotes }) => {
  const normalisedRootVariations = getNormalisedRootVariations(selectedNotes);
  const hash = reducedNotesToHash(normalisedRootVariations[0]);
  return <ShowHashStyles>Chord Ident: {hash}</ShowHashStyles>;
};

export default ShowHash;
