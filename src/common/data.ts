import fs from 'fs';
import path from 'path';

export function readData<T = string>(
    dirName: string,
    fileName: string,
    parser: (line: string) => T = (line: string) => line as T,
    seperator: string = '\n',
    trim: boolean = true,
): T[] {
    const filePath = path.join(dirName, fileName);
    const lines = fs.readFileSync(filePath, 'utf-8').split(seperator);

    return trim
        ? lines
              .map((line: string) => line.trim())
              .filter((line: string) => line.length > 0)
              .map(parser)
        : lines.map(parser);
}
