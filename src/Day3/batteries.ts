export type Bank = {
  batteries: number[];
};

export function parseBank(line: string): Bank {
  const batteries = line.split("").map((numStr) => parseInt(numStr));
  return { batteries };
}
