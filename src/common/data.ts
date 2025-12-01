import fs from "fs";
import path from "path";

export function readData<T = string>(
  dirName: string,
  fileName: string,
  parser?: (line: string) => T,
): T[] {
  const filePath = path.join(dirName, fileName);
  const lines = fs
    .readFileSync(filePath, "utf-8")
    .split("\n")
    .filter((line: string) => line.length > 0)
    .map((line: string) => line.trim());

  return parser ? lines.map(parser) : (lines as T[]);
}
