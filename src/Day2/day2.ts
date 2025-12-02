import { Range } from "./range";

export function part1(input: Range[]): number {
  let result = 0;
  for (const range of input) {
    for (let id = range.start; id <= range.end; id++) {
      if (isInvalidIdPart1(id)) {
        result += id;
      }
    }
  }
  return result;
}

export function part2(input: Range[]): number {
  let result = 0;
  for (const range of input) {
    for (let id = range.start; id <= range.end; id++) {
      for (let numSeq = 2; numSeq <= id.toString().length; numSeq++) {
        if (containsRepeatedSequence(id, numSeq)) {
          result += id;
          break;
        }
      }
    }
  }
  return result;
}

function isInvalidIdPart1(id: number): boolean {
  const asString = id.toString();
  if (asString.length % 2 !== 0) {
    return false;
  }
  const firstHalf = asString.substring(0, asString.length / 2);
  const secondHalf = asString.substring(asString.length / 2);
  return firstHalf === secondHalf;
}

function containsRepeatedSequence(id: number, numSeq: number): boolean {
  const asString = id.toString();
  if (asString.length % numSeq !== 0) {
    return false;
  }
  const firstPart = asString.substring(0, asString.length / numSeq);
  const seqLength = firstPart.length;
  for (let i = 1; i < numSeq; i++) {
    if (firstPart !== asString.substring(i * seqLength, (i + 1) * seqLength)) {
      return false;
    }
  }
  return true;
}
