import { readData } from '../common/data';
import { parseJunction, part1, part2 } from './day8';

describe('Part 1', () => {
    [
        { file: 'sample.txt', pairs: 10, expected: 40 },
        { file: 'input.txt', pairs: 1000, expected: 171503 },
    ].forEach(({ file, pairs, expected }) => {
        test(`${file} produces expected output`, () => {
            const input = readData(__dirname, file, parseJunction);
            expect(part1(input, pairs)).toBe(expected);
        });
    });
});

describe('Part 2', () => {
    [
        { file: 'sample.txt', expected: 25272 },
        { file: 'input.txt', expected: 9069509600 },
    ].forEach(({ file, expected }) => {
        test(`${file} produces expected output`, () => {
            const input = readData(__dirname, file, parseJunction);
            expect(part2(input)).toBe(expected);
        });
    });
});
