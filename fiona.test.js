import {
  every,
  some,
  take,
  drop,
  partition,
  range,
  cat,
  split,
  append,
  nth,
  first,
  second,
} from "./fiona";

test("every", () => {
  const isOdd = (x) => x % 2 !== 0;
  expect(every(isOdd, undefined)).toBe(true);
  expect(every(isOdd, [])).toBe(true);
  expect(every(isOdd, [1])).toBe(true);
  expect(every(isOdd, [2])).toBe(false);
  expect(every(isOdd, [1, 2, 3])).toBe(false);
  expect(every(isOdd, [1, 3, 5, 7, 9, 11, 13, 132])).toBe(false);
  expect(every(isOdd, [1, 3, 5, 7, 9, 11, 13, 131])).toBe(true);
});

test("some", () => {
  const isOdd = (x) => x % 2 !== 0;
  expect(some(isOdd, undefined)).toBe(false);
  expect(some(isOdd, [])).toBe(false);
  expect(some(isOdd, [1])).toBe(true);
  expect(some(isOdd, [2])).toBe(false);
  expect(some(isOdd, [1, 2, 3])).toBe(true);
  expect(some(isOdd, [1, 3, 5, 7, 9, 11, 13, 132])).toBe(true);
  expect(some(isOdd, [2, 4, 6, 8, 10, 12, 14, 28])).toBe(false);
});

test("take", () => {
  expect(take(2, [0])).toEqual([0]);
  expect(take(2, [])).toEqual([]);
  expect(take(2, [0, 1, 2, 3, 4, 5])).toEqual([0, 1]);
  expect(take(10, [0, 1, 2, 3, 4, 5])).toEqual([0, 1, 2, 3, 4, 5]);
});

test("drop", () => {
  expect(drop(2, [0])).toEqual([]);
  expect(drop(2, [])).toEqual([]);
  expect(drop(2, [0, 1, 2, 3, 4, 5])).toEqual([2, 3, 4, 5]);
});

test("partition", () => {
  expect(partition(2, [0, 1, 2, 3, 4, 5])).toEqual([
    [0, 1],
    [2, 3],
    [4, 5],
  ]);
  expect(partition(2, [0, 1, 2, 3, 4])).toEqual([[0, 1], [2, 3], [4]]);
});

test("range", () => {
  expect(range(0)).toEqual([]);
  expect(range(1)).toEqual([0]);
  expect(range(10)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

test("cat", () => {
  expect(cat("", "")).toEqual("");
  expect(cat("abc", "def")).toEqual("abcdef");
});

test("split", () => {
  expect(split("", "abc")).toEqual(["a", "b", "c"]);
  expect(split(" ", "A faint clap of thunder")).toEqual([
    "A",
    "faint",
    "clap",
    "of",
    "thunder",
  ]);
});

test("append", () => {
  expect(append(0, [])).toEqual([0]);
  expect(append(4, [1, 2, 3])).toEqual([1, 2, 3, 4]);
});

test("nth", () => {
  expect(nth(0, null)).toEqual(null);
  expect(nth(0, [])).toEqual(undefined);
  expect(nth(0, [1, 2, 3])).toEqual(1);
  expect(nth(1, [1, 2, 3])).toEqual(2);
  expect(nth(2, [1, 2, 3])).toEqual(3);
});

test("first", () => {
  expect(first(null)).toEqual(null);
  expect(first([])).toEqual(undefined);
  expect(first([1, 2, 3])).toEqual(1);
});

test("second", () => {
  expect(second(null)).toEqual(null);
  expect(second([])).toEqual(undefined);
  expect(second([1, 2, 3])).toEqual(2);
});
