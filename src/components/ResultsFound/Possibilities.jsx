import React, { useEffect, useState } from "react";
import styled from "styled-components";

export const Possibilities = ({ possibilities }) => {
  const { exactMatchesFound, nonExactMatchesFound } = possibilities;
  return (
    <>
      <h2>Exact Matches</h2>
      {exactMatchesFound.map(match => {
        return (
          <div>
            {match.root} {match.modifier}
          </div>
        );
      })}
      <h2>Non Exact Matches</h2>
      {nonExactMatchesFound.map(match => {
        return (
          <div>
            {match.root} {match.modifier}
          </div>
        );
      })}
    </>
  );
};
