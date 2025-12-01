export type DialInstruction = {
  direction: "L" | "R";
  distance: number;
};

export function parseDialInstruction(line: string): DialInstruction {
  const direction = line[0];
  const distance = parseInt(line.substring(1));
  return {
    direction: direction as "L" | "R",
    distance: distance,
  };
}

export function normalizeDialInstruction(
  instruction: DialInstruction,
): DialInstruction {
  let { direction, distance } = instruction;
  distance = distance % 100;
  return { direction, distance };
}
