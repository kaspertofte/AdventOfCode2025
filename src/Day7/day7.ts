export function part1(input: string[]): number {
    const firstLine = input.shift();
    const startIndex = firstLine!.indexOf('S');
    const startBeam = new Set<number>().add(startIndex);

    const { splits } = input.reduce<{ beams: Set<number>; splits: number }>(
        (result, line) => {
            const newSplits = splitLine(line, result.beams);
            return {
                beams: newSplits.newBeams,
                splits: result.splits + newSplits.splits,
            };
        },
        { beams: startBeam, splits: 0 },
    );
    return splits;
}

export function part2(input: string[]): number {
    return input
        .reduce<number[]>((paths, line) => {
            return processLine(line, paths);
        }, Array<number>(input[0].length).fill(0))
        .reduce((acc, val) => acc + val);
}

function processLine(line: string, paths: number[]): number[] {
    const result: number[] = Array<number>(line.length).fill(0);
    line.split('').forEach((char, idx) => {
        if (char === 'S') {
            result[idx] = 1;
        }
        if (char === '^') {
            result[idx - 1] += paths[idx];
            result[idx + 1] += paths[idx];
        }
        if (char === '.') {
            result[idx] += paths[idx];
        }
    });
    return result;
}

function splitLine(line: string, beams: Set<number>): { newBeams: Set<number>; splits: number } {
    let splits = 0;
    const newBeams = new Set<number>();
    beams.forEach((beam) => {
        if (line[beam] === '^') {
            newBeams.add(beam + 1).add(beam - 1);
            splits++;
        }
        if (line[beam] === '.') {
            newBeams.add(beam);
        }
    });
    return { newBeams, splits };
}
