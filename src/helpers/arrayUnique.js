export const arrayUnique = arr => {
  const test = arr.reduce((acc, cur) => {
    const shitHash = cur.join("|");
    acc[shitHash] = cur;
    return acc;
  }, {});

  return Object.keys(test).map(k => {
    return test[k];
  });
};
