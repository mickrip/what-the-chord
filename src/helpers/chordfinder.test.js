import { reduceToBase } from "./chordfinder";

test("test", () => {
  const notes = [65, 30, 40, 45, 63, 63, 65];
  expect(reduceToBase(notes)).toStrictEqual([0, 3, 4, 5, 6]);
});
