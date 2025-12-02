import { part1, part2 } from "./day2";

import { readData } from "../common/data";
import { parseRange } from "./range";

describe("Day 2, part1", () => {
  test("sample input", () => {
    const input = readData(__dirname, "sample.txt", parseRange, ",");
    expect(part1(input)).toBe(1227775554);
  });

  test("part1 input", () => {
    const input = readData(__dirname, "input.txt", parseRange, ",");
    expect(part1(input)).toBe(18893502033);
  });
});

describe("Day 2, part2", () => {
  test("sample input", () => {
    const input = readData(__dirname, "sample.txt", parseRange, ",");
    expect(part2(input)).toBe(4174379265);
  });

  test("part2 input", () => {
    const input = readData(__dirname, "input.txt", parseRange, ",");
    expect(part2(input)).toBe(26202168557);
  });
});
