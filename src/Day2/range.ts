export type Range = {
    start: number;
    end: number;
};

export function parseRange(line: string): Range {
    const [startStr, endStr] = line.split('-');
    return {
        start: parseInt(startStr),
        end: parseInt(endStr),
    };
}
