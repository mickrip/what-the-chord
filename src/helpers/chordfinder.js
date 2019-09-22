// @flow

import { arrayUnique } from "./arrayUnique";
import chordlookup from "./chordlookup";
import { getNotesArray } from "./noteutils";

export const chordFinder = (notes: Array<number>): Object => {
  const normalisedRootVariations = getNormalisedRootVariations(notes);
  const bassNoteNumber = getBassNote(notes);
  //setNoteHash(reducedNotesToHash(normalisedRootVariations[0]));
  let chordLookup = {};

  const results = normalisedRootVariations
    .map(h => {
      const noteHash = reducedNotesToHash(h);

      const modifier = lookupChord(noteHash);
      const root = getNotesArray()[h[0]];
      const lookupKey = `${modifier}${root}`;

      const retValue =
        modifier && chordLookup[lookupKey] !== true
          ? {
              matchesRoot: bassNoteNumber === h[0],
              matchedHash: noteHash,
              modifier,
              rootNumber: h[0],
              root
            }
          : false;
      chordLookup[lookupKey] = true;
      return retValue;
    })
    .filter(n => n !== false);

  const exactMatchesFound = results.filter(r => r.matchesRoot === true);
  const nonExactMatchesFound = results.filter(r => r.matchesRoot !== true);

  return {
    anythingFound: results.length > 0,
    hasExactMatches: exactMatchesFound.length > 0,
    exactMatchesFound,
    nonExactMatchesFound,
    results
  };
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
