import React from "react";
import styled from "styled-components";
import { numberToNote } from "./helpers";

const whiteKeyColor = "#fff";
const whiteKeyColorHover = "#efefef";
const whiteKeyColorSelected = "#61a569";

const blackKeyColor = "#333";
const blackKeyColorHover = "#777";
const blackKeyColorSelected = "#61a569";

const BaseKey = styled.div`
  display: inline-block;
  box-shadow: inset 2px 2px 2px rgba(255, 255, 255, 0.4),
    inset -2px -2px 2px rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  border-radius: 0 0 5px 5px;
  position: relative;
  cursor: pointer;
`;

const WhiteKey = styled(BaseKey)`
  width: ${props => props.w}px;
  height: ${props => props.w * 6}px;
  z-index: 1;
  background: ${props =>
    props.isSelected ? whiteKeyColorSelected : whiteKeyColor};
  &:hover {
    background: ${props =>
      props.isSelected ? whiteKeyColorSelected : whiteKeyColorHover};
  }
`;

const BlackKey = styled(BaseKey)`
  width: ${props => Math.floor(props.w / 1.5) - 0}px;
  left: -${props => Math.floor(props.w / 1.5 / 2)}px;
  margin-right: -${props => Math.floor(props.w / 1.5)}px;
  height: ${props => props.w * 3.75}px;
  z-index: 2;
  vertical-align: top;
  background: ${props =>
    props.isSelected ? blackKeyColorSelected : blackKeyColor};
  &:hover {
    background: ${props =>
      props.isSelected ? blackKeyColorSelected : blackKeyColorHover};
  }
`;

const Key = ({ width = 40, noteRef, onClick, isSelected }) => {
  const noteObject = numberToNote(noteRef);

  const sharedProps = {
    w: width,
    onClick,
    isSelected
  };

  return noteObject.note.length === 1 ? (
    <WhiteKey {...sharedProps} />
  ) : (
    <BlackKey {...sharedProps} />
  );
};

export default Key;
