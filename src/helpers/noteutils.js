//@flow

export const getNotesArray = () => {
  return ["c", "c#", "d", "d#", "e", "f", "f#", "g", "g#", "a", "a#", "b"];
};

export const numberToNote = (number: number) => {
  const notes = getNotesArray();
  const note = notes[number % 12];
  const octave = Math.floor(number / 12) - 1;
  return {
    note,
    octave
  };
};

export const noteObjToNumber = (noteObj: { note: string, octave: number }) => {
  if (noteObj === undefined) return false;
  const { note, octave } = noteObj;

  if (Math.floor(octave) !== octave) return false;

  const notes = getNotesArray();
  const noteIndex = notes.indexOf(note);

  if (noteIndex === -1) return false;

  return notes.indexOf(note) + (octave + 1) * 12;
};

export const selectedNotesToVex = selectedNotes => {
  const noteObjs = selectedNotes.map(n => numberToNote(n));
  const treble = noteObjs.filter(n => n.octave >= 4);
  const bass = noteObjs.filter(n => n.octave < 4);
  return {
    treble: treble.map(n => `${n.note}/${n.octave}`),
    bass: bass.map(n => `${n.note}/${n.octave}`)
  };
};
