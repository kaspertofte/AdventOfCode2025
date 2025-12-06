import fs from 'fs';
import path from 'path';

export function readData<T = string>(
    dirName: string,
    fileName: string,
    parser: (line: string) => T = (line: string) => line as T,
    seperator: string = '\n',
): T[] {
    const filePath = path.join(dirName, fileName);
    const lines = fs
        .readFileSync(filePath, 'utf-8')
        .split(seperator)
        .map((line: string) => line.trim())
        .filter((line: string) => line.length > 0);

    return lines.map(parser);
}


export function readDataNoTrim<T = string>(
    dirName: string,
    fileName: string,
    parser: (line: string) => T = (line: string) => line as T,
    seperator: string = '\n',
): T[] {
    const filePath = path.join(dirName, fileName);
    const lines = fs
        .readFileSync(filePath, 'utf-8')
        .split(seperator);

    return lines.map(parser);
}
