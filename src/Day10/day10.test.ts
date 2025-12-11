import { readData } from '../common/data';
import { parseMachine, part1, part2 } from './day10';

describe('Part 1', () => {
    [
        { file: 'sample.txt', expected: 7 },
        { file: 'input.txt', expected: 578 },
    ].forEach(({ file, expected }) => {
        test(`${file} produces expected output`, () => {
            const input = readData(__dirname, file, parseMachine);
            expect(part1(input)).toBe(expected);
        });
    });
});

describe('Part 2', () => {
    [
        { file: 'sample.txt', expected: 33 },
        { file: 'input.txt', expected: 20709 },
    ].forEach(({ file, expected }) => {
        test(`${file} produces expected output`, () => {
            const input = readData(__dirname, file, parseMachine);
            expect(part2(input)).toBe(expected);
        });
    });
});
