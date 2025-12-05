import fs from 'fs';
import path from 'path';

export type Database = {
    fresh: { start: number; end: number }[];
    ingredients: number[];
};

export function readIngredients(dirName: string, fileName: string): Database {
    const filePath = path.join(dirName, fileName);
    const fresh: { start: number; end: number }[] = [];
    const ingredients: number[] = [];
    fs.readFileSync(filePath, 'utf-8')
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
        .forEach((line) => {
            if (line.includes('-')) {
                fresh.push(pareFresh(line));
            } else {
                ingredients.push(parseInt(line));
            }
        });

    return {
        fresh,
        ingredients,
    };
}

function pareFresh(line: string): { start: number; end: number } {
    const [startStr, endStr] = line.split('-');
    return {
        start: parseInt(startStr),
        end: parseInt(endStr),
    };
}
