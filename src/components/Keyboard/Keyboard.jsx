import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Key from "./Key";

const getKeyRangeBasedOnSize = size => {
  let keyWidth = 50;
  let potentiallyHowManyWhiteKeys = 8;
  let start = 60;
  let end = 73;
  let height = 120;

  if (size > 700) {
    keyWidth = 40;
    potentiallyHowManyWhiteKeys = Math.floor(size / keyWidth);
    const octaves = potentiallyHowManyWhiteKeys / 7;
    const numberofKeys = Math.ceil(octaves * 12);
    start = Math.floor(60 - numberofKeys / 2);
    end = Math.floor(60 + numberofKeys / 2);
    height = 160;
  }

  return {
    keyWidth: size / potentiallyHowManyWhiteKeys,
    start: start,
    end: end + 2,
    height
  };
};

const KeyBoardWrapper = styled.div`
  height: ${props => props.height}px;
  overflow: hidden;
  white-space: nowrap;
  box-shadow: 0 5px 11px rgba(0, 0, 0, 0.08);
`;

const Keyboard = ({ onChange, width, notes }) => {
  const [notesSelected, setNotesSelected] = useState([]);
  const [keyWidth, setKeyWidth] = useState(40);
  const [keyHeight, setKeyHeight] = useState(80);
  const [startNote, setStartNote] = useState(0);
  const [endNOte, setEndNote] = useState(0);

  const toggleNote = _note => {
    let newNotes;
    if (notesSelected.includes(_note)) {
      newNotes = notesSelected.filter(n => n !== _note);
    } else {
      newNotes = notesSelected.concat([_note]);
    }
    setNotesSelected(newNotes);
    onChange(newNotes);
  };

  useEffect(() => {
    setNotesSelected(notes);
  }, [notes]);

  useEffect(() => {
    const { keyWidth, start, end, height } = getKeyRangeBasedOnSize(width);
    setKeyWidth(keyWidth);
    setStartNote(start);
    setEndNote(end);
    setKeyHeight(height);
  }, [width]);

  const noteNumbers = [...Array(endNOte - startNote).keys()].map(
    n => n + startNote
  );

  return (
    <KeyBoardWrapper height={keyHeight}>
      {noteNumbers.map((nn, key) => {
        return (
          <Key
            width={keyWidth}
            height={keyHeight}
            key={key}
            noteRef={nn}
            onClick={() => {
              toggleNote(nn);
            }}
            isSelected={notesSelected.includes(nn)}
          />
        );
      })}
    </KeyBoardWrapper>
  );
};

export default Keyboard;
