// @flow

import { arrayUnique } from "./arrayUnique";
import chordlookup from "./chordlookup";
import { getNotesArray } from "./noteutils";
import orderBy from "lodash/orderBy";
import uniq from "lodash/uniq";

export const chordFinder = (notes: Array<number>): Object => {
  let sortedNotes = notes.sort((a, b) => a - b);
  let firstSweep = getChordsFromNotes(sortedNotes);

  const test = removeDupesFromResultArray(
    getPossibilitiesFromNotes(sortedNotes)
  );

  return {
    matches: firstSweep,
    possibilities: test
  };
};

export const getPossibilitiesFromNotes = (
  notes: Array<number>
): Array<Object> => {
  let sortedNotes = notes.sort((a, b) => a - b);
  const firstNote = sortedNotes[sortedNotes.length - 1] + 13;
  const lastNote = sortedNotes[0] - 13;
  let possibilities = [];

  for (let x = firstNote; x > lastNote; x--) {
    let originalNoteSelection = [...sortedNotes];
    originalNoteSelection.push(x);

    if (uniq(originalNoteSelection).length === originalNoteSelection.length) {
      const newThing = getChordsFromNotes(originalNoteSelection);
      if (newThing.length > 0) {
        possibilities = possibilities.concat(newThing);
        //console.log("FOUND", newThing);
      }
    }
  }

  return orderBy(
    possibilities,
    ["startsWithRoot", "spreadFactor"],
    ["desc", "asc"]
  );
};

export const removeFromResultArrayByKey = (resultArray, key) => {
  return resultArray.filter(_r => {
    return _r.key !== key;
  });
};

export const removeDupesFromResultArray = (
  results: Array<Object>
): Array<Object> => {
  let lookupKey = {};

  return results.reduce((acc, curr) => {
    if (!lookupKey[curr.key]) {
      acc = acc.concat(curr);
      lookupKey[curr.key] = true;
    }

    return acc;
  }, []);
};

export const calculateSpreadFactor = (notes: Array<number>): number => {
  return notes[notes.length - 1] - notes[0];
};

export const getChordsFromNotes = (notes: Array<number>): Array<Object> => {
  const normalisedRootVariations = getNormalisedRootVariations(notes);
  const bassNoteNumber = getBassNote(notes);
  let chordLookup = {};

  return normalisedRootVariations
    .map(h => {
      const noteHash = reducedNotesToHash(h);
      const modifier = lookupChord(noteHash);
      const root = getNotesArray()[h[0]];
      const lookupKey = `${root}${modifier}`;

      const retValue =
        modifier && !chordLookup[lookupKey]
          ? {
              key: lookupKey,
              originalNotes: notes,
              spreadFactor: calculateSpreadFactor(notes),
              startsWithRoot: bassNoteNumber === h[0],
              matchedHash: noteHash,
              modifier,
              rootNumber: h[0],
              root
            }
          : false;
      chordLookup[lookupKey] = true;
      return retValue;
    })
    .filter(n => n !== false)
    .sort((a, b) => (b.startsWithRoot === true ? 1 : -1));
};

export const getNormalisedRootVariations = (
  notes: Array<number>
): Array<Array<number>> => {
  const rootVariations = arrayUnique([
    reduceToBase(notes),
    reduceTo2Octaves(notes),
    reduceToBaseProximity(notes)
  ]);

  let moreVariations = [];
  for (let x = 1; x <= notes.length; x++) {
    const test = rootVariations.map(hash => {
      return invertChord(hash, x + 1);
    });

    moreVariations = moreVariations.concat(moreVariations, test);
  }

  return arrayUnique(rootVariations.concat(rootVariations, moreVariations));
};

export const getBassNote = (notes: Array<number>) => {
  return sortAndNormaliseNotes(notes)[0];
};

export const sortAndNormaliseNotes = (notes: Array<number>): Array<number> => {
  if (notes.length === 0) return [];
  let sortedNotes = notes.sort((a, b) => a - b);

  while (sortedNotes.every(n => n >= 0)) {
    sortedNotes = sortedNotes.map(n => n - 12);
  }

  return sortedNotes.map(n => n + 12);
};

export const normaliseToZeroAndSort = (notes: Array<number>): Array<number> => {
  const min = notes.reduce(function(p, v) {
    return p < v ? p : v;
  });

  const sortedNotes = sortAndNormaliseNotes(notes.map(n => n - min));
  return sortedNotes.filter(
    (item, index) => sortedNotes.indexOf(item) === index
  );
};

export const reduceToBase = (notes: Array<number>): Array<number> => {
  if (notes.length === 0) return [];
  return sortAndNormaliseNotes(notes)
    .map(n => {
      return n % 12;
    })
    .filter(function(item, pos, self) {
      return self.indexOf(item) === pos;
    })
    .sort((a, b) => a - b);
};

export const reduceTo2Octaves = (notes: Array<number>): Array<number> => {
  if (notes.length === 0) return [];

  const n1 = sortAndNormaliseNotes(notes);

  let baseNote = n1[0];
  const reducedArray = n1
    .reduce((acc, cur) => {
      if (acc.length === 0) return [cur];
      while (cur > baseNote) {
        cur = cur - 12;
      }
      if (cur < baseNote) cur = cur + 12;
      baseNote = cur;
      return acc.concat(cur);
    }, [])
    .filter((item, pos, self) => {
      return self.indexOf(item) === pos;
    })
    .sort((a, b) => a - b);

  return sortAndNormaliseNotes(reducedArray);
};

export const reduceToBaseProximity = (notes: Array<number>): Array<number> => {
  if (notes.length === 0) return [];

  const reducedArray = reduceToBase(notes).reduce((acc, cur) => {
    if (acc.length === 0) return [cur];

    const lastAssed = acc[acc.length - 1];

    while (cur - lastAssed <= 2 && cur - lastAssed > 0) {
      cur = cur + 12;
    }

    return acc.concat(cur);
  }, []);
  return sortAndNormaliseNotes(reducedArray);
};

export const reducedNotesToHash = (notes: Array<number>): string => {
  if (notes.length === 0) return "";
  return normaliseToZeroAndSort(notes)
    .map(n => {
      return n.toString(16).padStart(2, "0");
    })
    .join("");
};

export const invertChord = (
  notes: Array<number>,
  inversion: number
): Array<number> => {
  const notesUpAnOctave = notes.sort((a, b) => a - b).map(n => n + 12);
  const lowestNote = notesUpAnOctave[0];
  let lastNote = notesUpAnOctave[notesUpAnOctave.length - 1];
  do {
    lastNote = lastNote - 12;
  } while (lastNote > lowestNote);
  let newNotes = notesUpAnOctave.slice(0, -1).concat([lastNote]);
  for (let x = 1; x < inversion; x++) {
    newNotes = invertChord(newNotes, 0);
  }

  return sortAndNormaliseNotes(newNotes);
};

export const lookupChord = (hashString: string) => {
  return chordlookup[hashString] || false;
};
