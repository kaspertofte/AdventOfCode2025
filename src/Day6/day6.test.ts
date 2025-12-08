import { part1, part2 } from './day6';

import { readData } from '../common/data';

describe('Part 1, first solution', () => {
    [
        { file: 'sample.txt', expected: 4277556 },
        { file: 'input.txt', expected: 4648618073226 },
    ].forEach(({ file, expected }) => {
        test(`${file} produces expected output`, () => {
            const input = readData(__dirname, file, (line: string) =>
                line
                    .split(' ')
                    .map((entry) => entry.trim())
                    .filter((entry) => entry.length > 0),
            );
            expect(part1(input)).toBe(expected);
        });
    });
});

describe('Part 2', () => {
    [
        { file: 'sample.txt', expected: 3263827 },
        { file: 'input.txt', expected: 7329921182115 },
    ].forEach(({ file, expected }) => {
        test(`${file} produces expected output`, () => {
            const input = readData(__dirname, file, (line: string) => line.split(''), '\n', false);
            expect(part2(input)).toBe(expected);
        });
    });
});
