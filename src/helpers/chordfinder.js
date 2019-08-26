// @flow
export const reduceToBase = (notes: Array<number>): Array<number> => {
  if (notes.length === 0) return [];
  const newNotes = notes
    .map(n => {
      return n % 12;
    })
    .filter(function(item, pos, self) {
      return self.indexOf(item) === pos;
    })
    .sort((a, b) => b - a);

  const max = newNotes.reduce(function(a, b) {
    return Math.max(a, b);
  });

  return newNotes.map(n => max - n);
};

export const reduceToBasetwoOct = (notes: Array<number>): Array<number> => {
  if (notes.length === 0) return [];
};

export const reducedNotesToHash = (notes: Array<number>): string => {
  return notes
    .map(n => {
      return n.toString(12);
    })
    .join("");
};
