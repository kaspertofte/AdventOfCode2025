import { readData } from '../common/data';
import { part1, part2 } from './day7';

describe('Part 1', () => {
    [
        { file: 'sample.txt', expected: 21 },
        { file: 'input.txt', expected: 1555 },
    ].forEach(({ file, expected }) => {
        test(`${file} produces expected output`, () => {
            const input = readData(__dirname, file);
            expect(part1(input)).toBe(expected);
        });
    });
});

describe('Part 2', () => {
    [
        { file: 'smallSample.txt', expected: 8 },
        { file: 'sample.txt', expected: 40 },
        { file: 'input.txt', expected: 12895232295789 },
    ].forEach(({ file, expected }) => {
        test(`${file} produces expected output`, () => {
            const input = readData(__dirname, file);
            expect(part2(input)).toBe(expected);
        });
    });
});
