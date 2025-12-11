import { readData } from '../common/data';
import { part1, part2, parsePoints } from './day9';

describe('Part 1', () => {
    [
        { file: 'sample.txt', expected: 50 },
        { file: 'input.txt', expected: 4763509452 },
    ].forEach(({ file, expected }) => {
        test(`${file} produces expected output`, () => {
            const input = readData(__dirname, file, parsePoints);
            expect(part1(input)).toBe(expected);
        });
    });
});

describe('Part 2', () => {
    [
        { file: 'sample.txt', expected: 24 },
        { file: 'input.txt', expected: 1516897893 },
    ].forEach(({ file, expected }) => {
        test(`${file} produces expected output`, () => {
            const input = readData(__dirname, file, parsePoints);
            expect(part2(input)).toBe(expected);
        });
    });
});
