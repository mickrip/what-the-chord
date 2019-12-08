import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Possibilities } from "./Possibilities";

const Box = styled.div`
  padding: 16px;
`;

const Center = styled.div`
  text-align: center;
`;

const PrimaryChordFound = styled.div`
  font-size: 20px;
  color: #239ea5;

  font-weight: bold;

  min-width: 300px;
  width: 300px;
  margin: auto;
`;

const SecondaryChordsFound = styled.div`
  font-size: 20px;
`;

const SecondaryChordsTitle = styled.div`
  font-size: 19px;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
  color: #848484;
`;

const ResultsFound = ({ results }) => {
  console.log("VCASH", results);
  const { matches, possibilities } = results;
  const hasMatches = matches.length > 0;
  const hasPossibles = possibilities.length > 0;
  return (
    <>
      <>
        {hasMatches && (
          <Box>
            <Center>
              <h2>Found</h2>
              {matches.map(({ root, modifier }) => {
                return (
                  <PrimaryChordFound>
                    {root} {modifier}
                  </PrimaryChordFound>
                );
              })}
            </Center>
            ""
          </Box>
        )}
        {hasPossibles && (
          <Box>
            <Center>
              <h2>Possibles</h2>
              {possibilities.map(({ root, modifier }) => {
                return (
                  <PrimaryChordFound>
                    {root} {modifier}
                  </PrimaryChordFound>
                );
              })}
            </Center>
          </Box>
        )}
      </>
    </>
  );
};

export default ResultsFound;
