import { DialInstruction, normalizeDialInstruction } from './DialInstruction';

export function part1(input: DialInstruction[]): number {
    let result = 0;
    let position = 50;
    for (const instruction of input) {
        position = turnDial(position, instruction);
        if (position === 0) {
            result += 1;
        }
    }
    return result;
}

export function part2(input: DialInstruction[]): number {
    let result = 0;
    let position = 50;
    for (const instruction of input) {
        result += Math.floor(instruction.distance / 100);
        const normInstruction = normalizeDialInstruction(instruction);
        if (normInstruction.direction === 'R' && normInstruction.distance > 100 - position) {
            result += 1;
        }
        if (
            position !== 0 &&
            normInstruction.direction === 'L' &&
            normInstruction.distance > position
        ) {
            result += 1;
        }

        position = turnDial(position, normInstruction);

        if (position === 0) {
            result += 1;
        }
    }
    return result;
}

function turnDial(position: number, instruction: DialInstruction): number {
    if (instruction.direction === 'L') {
        position -= instruction.distance;
    }
    if (instruction.direction === 'R') {
        position += instruction.distance;
    }
    position = position % 100;
    if (position < 0) {
        position += 100;
    }
    return position;
}
