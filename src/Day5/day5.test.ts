import { part1, part2 } from './day5';
import { readIngredients } from './ingredients';

describe('Part 1, first solution', () => {
    [
        { file: 'sample.txt', expected: 3 },
        { file: 'input.txt', expected: 558 },
    ].forEach(({ file, expected }) => {
        test(`${file} produces expected output`, () => {
            const input = readIngredients(__dirname, file);
            expect(part1(input)).toBe(expected);
        });
    });
});

describe('Part 2', () => {
    [
        { file: 'sample.txt', expected: 14 },
        { file: 'input.txt', expected: 344813017450467 },
    ].forEach(({ file, expected }) => {
        test(`${file} produces expected output`, () => {
            const input = readIngredients(__dirname, file);
            expect(part2(input)).toBe(expected);
        });
    });
});
