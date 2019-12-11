import React from "react";
import styled from "styled-components";


const Box = styled.div`
  padding: 16px;
`;



const PrimaryChordFound = styled.div`
  font-size: 15px;
  color: #239ea5;
  font-weight: bold;
  min-width: 300px;
  width: 300px;

`;


const ResultsFound = ({ results }) => {

  const { matches, possibilities } = results;
  const hasMatches = matches.length > 0;
  const hasPossibles = possibilities.length > 0;
  return (
    <>
      <>
        {hasMatches && (
          <Box>
            <h2>Found</h2>
            {matches.map(({ root, modifier }, key) => {
              return (
                <PrimaryChordFound key={key}>
                  {root} {modifier}
                </PrimaryChordFound>
              );
            })}
          </Box>
        )}
        {hasPossibles && (
          <Box>
            <h2>Possibles</h2>
            {possibilities.map(({ root, modifier }, key) => {
              return (
                <PrimaryChordFound key={key}>
                  {root} {modifier}
                </PrimaryChordFound>
              );
            })}
          </Box>
        )}
      </>
    </>
  );
};

export default ResultsFound;
