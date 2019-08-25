// C4 = 60

export const getNotesArray = () => {
  return ["c", "c#", "d", "d#", "e", "f", "f#", "g", "g#", "a", "a#", "b"];
};

export const numberToNote = number => {
  const notes = getNotesArray();
  const note = notes[number % 12];
  const octave = Math.floor(number / 12) - 1;
  return {
    note,
    octave
  };
};
