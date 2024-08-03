export const range = (from: number, to: number) => {
  const results: number[] = [];
  for (let index = from; index <= to; index++) {
    results.push(index)
  }

  return results;
}