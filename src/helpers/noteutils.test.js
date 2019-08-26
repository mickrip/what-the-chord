import { getNotesArray, noteObjToNumber, numberToNote } from "./noteutils";

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

test("noteObjToNumber", () => {
  expect(noteObjToNumber({ note: "c", octave: 4 })).toEqual(60);
  expect(noteObjToNumber({ note: "e", octave: 6 })).toEqual(88);
  expect(noteObjToNumber({ note: "d#", octave: 1 })).toEqual(27);
  expect(noteObjToNumber({ note: "e", octave: 7 })).toEqual(100);
  expect(noteObjToNumber({ note: "g#", octave: 4 })).toEqual(68);
  expect(noteObjToNumber("unwelcome")).toEqual(false);
  expect(noteObjToNumber({ note: "foo", octave: 4 })).toEqual(false);
  expect(noteObjToNumber({ note: "a" })).toEqual(false);
  expect(noteObjToNumber({ note: "a", octave: "foo" })).toEqual(false);
  expect(noteObjToNumber()).toEqual(false);
});
