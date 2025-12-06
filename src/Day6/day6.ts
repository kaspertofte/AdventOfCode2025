export function part1(input: string[][]): number {
    const operators = input.pop()!;
    return transpose(input).reduce<number>((acc, line, index) => {
        return acc + (operators[index] === '+' ? add(line) : multiply(line));
    }, 0);
}

export function part2(input: string[][]): number {
    const operators = input
        .pop()!
        .map((op) => op.trim())
        .filter((op) => op.length > 0);

    // Transpose the data and parse to numbers
    return (
        transpose(input)
            // Create a number[][] where every row contains the numbers of one expression
            .reduce<number[][]>(
                (acc, line) => {
                    // If all entries are NaN, start a new expression
                    if (line.every(isNaN)) {
                        acc.push([]);
                        return acc;
                    }
                    // Otherwise, concatenate the digits to form numbers
                    const num = line.reduce<string>((tempNum, digit) => {
                        tempNum += digit ? digit.toString() : '';
                        return tempNum;
                    }, '');
                    // push the number to the last expression
                    acc[acc.length - 1].push(parseInt(num));
                    return acc;
                },
                [[]],
            )
            .filter((arr) => arr.length > 0)
            // Do the calculations for each expression
            .reduce<number>((acc, line, index) => {
                return acc + (operators[index] === '+' ? add(line) : multiply(line));
            }, 0)
    );
}

function transpose(input: string[][]): number[][] {
    return Object.keys(input[0]).map((col) => input.map((row) => parseInt(row[parseInt(col)])));
}

function add(arr: number[]): number {
    return arr.reduce((acc, curr) => acc + curr, 0);
}

function multiply(arr: number[]): number {
    return arr.reduce((acc, curr) => acc * curr, 1);
}
