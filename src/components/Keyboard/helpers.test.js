import { getNotesArray, numberToNote } from "./helpers";

test("getNotesArray", () => {
  const notes = getNotesArray();
  expect(notes.length).toBe(12);
});

test("numberToNote", () => {
  expect(numberToNote(60)).toStrictEqual({ note: "c", octave: 4 });
  expect(numberToNote(88)).toStrictEqual({ note: "e", octave: 6 });
  expect(numberToNote(27)).toStrictEqual({ note: "d#", octave: 1 });
  expect(numberToNote(100)).toStrictEqual({ note: "e", octave: 7 });
  expect(numberToNote(68)).toStrictEqual({ note: "g#", octave: 4 });
});
