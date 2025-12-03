import { part1, part1_recursive, part2 } from './day3';

import { readData } from '../common/data';
import { parseBank } from './batteries';

describe('Part 1, first solution', () => {
    [
        { file: 'sample.txt', expected: 357 },
        { file: 'input.txt', expected: 17332 },
    ].forEach(({ file, expected }) => {
        test(`${file} produces expected output`, () => {
            const input = readData(__dirname, file, parseBank);
            expect(part1(input)).toBe(expected);
        });
    });
});

describe('Part 1 recursive solution', () => {
    [
        { file: 'sample.txt', expected: 357 },
        { file: 'input.txt', expected: 17332 },
    ].forEach(({ file, expected }) => {
        test(`${file} produces expected output`, () => {
            const input = readData(__dirname, file, parseBank);
            expect(part1_recursive(input)).toBe(expected);
        });
    });
});

describe('Part 2', () => {
    [
        { file: 'sample.txt', expected: 3121910778619 },
        { file: 'input.txt', expected: 172516781546707 },
    ].forEach(({ file, expected }) => {
        test(`${file} produces expected output`, () => {
            const input = readData(__dirname, file, parseBank);
            expect(part2(input)).toBe(expected);
        });
    });
});
