import { PaperRolls } from './paper_rolls';

export function part1(input: PaperRolls): number {
    let result = 0;
    input.forEach((line, row) => {
        line.forEach((cell, col) => {
            if (cell === '@' && countNeighbors(input, row, col) < 4) {
                result += 1;
            }
        });
    });
    return result;
}

export function part2(input: PaperRolls): number {
    let result = 0;
    const newPaperRolls = [...input];
    input.forEach((line, row) => {
        line.forEach((cell, col) => {
            if (cell === '@' && countNeighbors(input, row, col) < 4) {
                newPaperRolls[row][col] = '.';
                result += 1;
            }
        });
    });
    return result === 0 ? result : result + part2(newPaperRolls);
}

function countNeighbors(input: PaperRolls, row: number, col: number): number {
    let count = 0;
    const directions = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
    ];
    directions.forEach(([dRow, dCol]) => {
        const newRow = row + dRow;
        const newCol = col + dCol;
        if (
            newRow >= 0 &&
            newRow < input.length &&
            newCol >= 0 &&
            newCol < input[col].length &&
            input[newRow][newCol] === '@'
        ) {
            count += 1;
        }
    });
    return count;
}
