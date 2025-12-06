import { Database } from './ingredients';

export function part1(input: Database): number {
    let result = 0;
    input.ingredients.forEach((ingredient) => {
        const isFresh = input.fresh.some(
            (range) => ingredient >= range.start && ingredient <= range.end,
        );
        if (isFresh) {
            result += 1;
        }
    });
    return result;
}

export function part2(input: Database): number {
    let result = 0;
    const lastRange = input.fresh
        .sort((a, b) => a.start - b.start)
        .reduce((prevRange, range) => {
            if (range.start <= prevRange.end) {
                return {
                    start: prevRange.start,
                    end: Math.max(prevRange.end, range.end),
                };
            } else {
                result += prevRange.end - prevRange.start + 1;
                return { ...range };
            }
        });
    return result + lastRange.end - lastRange.start + 1;
}
