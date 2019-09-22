import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Box = styled.div`
  padding: 16px;
`;

const Center = styled.div`
  text-align: center;
`;

const PrimaryChordFound = styled.div`
  text-transform: lowercase;
  font-size: 33px;
  color: #239ea5;

  font-weight: bold;

  min-width: 300px;
  width: 300px;
  margin: auto;
  padding: 16px;
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
  if (results.anythingFound === false || results.length === 0) return null;

  return results.hasExactMatches === true ? (
    <ExactMatches results={results} />
  ) : (
    <NonExactMatches results={results} />
  );
};
const ExactMatches = ({ results }) => {
  return (
    <>
      <Box>
        <Center>
          {results.exactMatchesFound.map(({ root, modifier }) => {
            return (
              <PrimaryChordFound>
                {root} {modifier}
              </PrimaryChordFound>
            );
          })}
        </Center>
      </Box>
      <Box>
        <Center>
          {results.nonExactMatchesFound.length > 0 && (
            <SecondaryChordsTitle>It also could be:</SecondaryChordsTitle>
          )}

          {results.nonExactMatchesFound.map(({ root, modifier }) => {
            return (
              <SecondaryChordsFound>
                {root} {modifier}
              </SecondaryChordsFound>
            );
          })}
        </Center>
      </Box>
    </>
  );
};

const NonExactMatches = ({ results }) => {
  return (
    <Box>
      <Center>
        {results.nonExactMatchesFound &&
          results.nonExactMatchesFound.length > 0 && (
            <SecondaryChordsTitle>Found</SecondaryChordsTitle>
          )}

        {results.nonExactMatchesFound.map(({ root, modifier }) => {
          return (
            <SecondaryChordsFound>
              {root} {modifier}
            </SecondaryChordsFound>
          );
        })}
      </Center>
    </Box>
  );
};

export default ResultsFound;
