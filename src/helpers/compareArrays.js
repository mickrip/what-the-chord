function compareArrays(first, second) {
  return (
    first.every(e => second.includes(e)) && second.every(e => first.includes(e))
  );
}

export default compareArrays;
