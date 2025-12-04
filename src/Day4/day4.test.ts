import { part1, part2 } from './day4';

import { readData } from '../common/data';
import { PaperRolls, parseData } from './paper_rolls';

describe('Part 1', () => {
    [
        { file: 'sample.txt', expected: 13 },
        { file: 'input.txt', expected: 1508 },
    ].forEach(({ file, expected }) => {
        test(`${file} produces expected output`, () => {
            const input: PaperRolls = readData(__dirname, file, parseData);
            expect(part1(input)).toBe(expected);
        });
    });
});

describe('Part 2', () => {
    [
        { file: 'sample.txt', expected: 43 },
        { file: 'input.txt', expected: 8538 },
    ].forEach(({ file, expected }) => {
        test(`${file} produces expected output`, () => {
            const input: PaperRolls = readData(__dirname, file, parseData);
            expect(part2(input)).toBe(expected);
        });
    });
});
