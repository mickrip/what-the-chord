import React from "react";
import styled from "styled-components";

const Box = styled.div`
  padding: 16px;
  h2 {
    color: #239ea5;
  }
`;

const PrimaryChordFound = styled.div`
  font-size: ${props => (props.smaller ? "25px" : "80px")};
  color: ${props => (props.smaller ? "#444" : "#000")};

  font-weight: bold;
`;

const PossiblesWrapper = styled.div`
  font-size: 25px;
`;

const ResultsFound = ({ results, selectedNotes }) => {
  const { matches, possibilities } = results;
  const hasMatches = matches.length > 0;
  const hasPossibles = possibilities.length > 0;
  if (selectedNotes.length === 0) return null;
  if (!hasMatches && !hasPossibles && selectedNotes.length === 0) return null;
  return (
    <>
      <>
        {hasMatches && (
          <Box>
            {matches.map(({ root, modifier }, key) => {
              if (key === 0) {
                return (
                  <PrimaryChordFound key={key}>
                    {root} {modifier}
                  </PrimaryChordFound>
                );
              } else {
                return (
                  <PrimaryChordFound smaller key={key}>
                    or {root} {modifier}
                  </PrimaryChordFound>
                );
              }
            })}
          </Box>
        )}
        {!hasMatches && (
          <Box>
            <PrimaryChordFound>No Chord Found</PrimaryChordFound>
          </Box>
        )}
        {hasPossibles && (
          <Box>
            <h2>Alternatives</h2>
            {possibilities.map(({ root, modifier }, key) => {
              return (
                <PossiblesWrapper key={key}>
                  {root} {modifier}
                </PossiblesWrapper>
              );
            })}
          </Box>
        )}
      </>
    </>
  );
};

export default ResultsFound;
