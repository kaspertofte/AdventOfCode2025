import { readData } from '../common/data';
import { parseNode, part1, part2 } from './day11';

describe('Part 1', () => {
    [
        { file: 'sample.txt', expected: 5 },
        { file: 'input.txt', expected: 690 },
    ].forEach(({ file, expected }) => {
        test(`${file} produces expected output`, () => {
            const input = readData(__dirname, file, parseNode);
            expect(part1(input)).toBe(expected);
        });
    });
});

describe('Part 2', () => {
    [
        { file: 'sample2.txt', expected: 2 },
        { file: 'input.txt', expected: 557332758684000 },
    ].forEach(({ file, expected }) => {
        test(`${file} produces expected output`, () => {
            const input = readData(__dirname, file, parseNode);
            expect(part2(input)).toBe(expected);
        });
    });
});
