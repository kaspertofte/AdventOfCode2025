import { part1, part2 } from './day1';
import { parseDialInstruction } from './DialInstruction';

import { readData } from '../common/data';

describe('Day 1, part1', () => {
    test('sample input', () => {
        const input = readData(__dirname, 'sample.txt', parseDialInstruction);
        expect(part1(input)).toBe(3);
    });

    test('part1 input', () => {
        const input = readData(__dirname, 'input.txt', parseDialInstruction);
        expect(part1(input)).toBe(1172);
    });
});

describe('Day 1, part2', () => {
    test('sample input', () => {
        const input = readData(__dirname, 'sample.txt', parseDialInstruction);
        expect(part2(input)).toBe(6);
    });

    test('part2 input', () => {
        const input = readData(__dirname, 'input.txt', parseDialInstruction);
        expect(part2(input)).toBe(6932);
    });
});
