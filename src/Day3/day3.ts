import { Bank } from "./batteries";

export function part1(input: Bank[]): number {
  let result = 0;
  for (const bank of input) {
    const { max, index } = arrayMax(bank.batteries.slice(0, -1));
    const { max: secondValue } = arrayMax(bank.batteries.slice(index + 1));
    result += parseInt("" + max + secondValue);
  }
  return result;
}

export function part1_recursive(input: Bank[]): number {
  return input.reduce((acc, bank) => {
    return acc + solve(bank.batteries, 2);
  }, 0);
}

export function part2(input: Bank[]): number {
  return input.reduce((acc, bank) => {
    return acc + solve(bank.batteries, 12);
  }, 0);
}

function solve(arr: number[], r: number): number {
  if (r === 1) {
    return arrayMax(arr).max;
  }
  const { max, index } = arrayMax(arr.slice(0, -(r - 1)));
  const nextValue = solve(arr.slice(index + 1), r - 1);
  return parseInt("" + max + nextValue);
}

function arrayMax(arr: number[]): { max: number; index: number } {
  const max = arr.reduce<{ max: number; index: number }>(
    (prev, curr, index) => (curr > prev.max ? { max: curr, index } : prev),
    { max: arr[0], index: 0 },
  );
  return max;
}
