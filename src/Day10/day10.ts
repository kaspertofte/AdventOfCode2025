import { Constraint, equalTo, Model, solve } from 'yalps';

export function part1(input: Machine[]): number {
    return input.reduce<number>((acc, machine, mIdx) => {
        const constraints = new Map<string, Constraint>();
        const variables: Map<string, Map<string, number>> = new Map<string, Map<string, number>>();
        addLightDiagramConstraints(machine, mIdx, constraints, variables);
        addVariables(machine, mIdx, variables);
        const model = getModel(constraints, variables);
        return acc + solve(model).result;
    }, 0);
}

export function part2(input: Machine[]): number {
    return input.reduce<number>((acc, machine, mIdx) => {
        const constraints = new Map<string, Constraint>();
        const variables: Map<string, Map<string, number>> = new Map<string, Map<string, number>>();
        addJoltageConstraints(machine, mIdx, constraints);
        addVariables(machine, mIdx, variables);
        const model = getModel(constraints, variables);
        return acc + solve(model).result;
    }, 0);
}

type Machine = {
    lightDiagram: (0 | 1)[];
    buttonWirings: number[][];
    joltage: number[];
};

function addVariables(
    machine: Machine,
    machineIdx: number,
    variables: Map<string, Map<string, number>>,
) {
    machine.buttonWirings.forEach((button, idx) => {
        const variable = new Map<string, number>();
        variable.set('obj', 1);
        button.forEach((wire) => variable.set(`m${machineIdx}_${wire}`, 1));
        variables.set(`m${machineIdx}_b${idx}`, variable);
    });
}

function addLightDiagramConstraints(
    machine: Machine,
    machineIdx: number,
    constraints: Map<string, Constraint>,
    variables: Map<string, Map<string, number>>,
) {
    machine.lightDiagram.forEach((val, idx) => {
        constraints.set(`m${machineIdx}_${idx}`, equalTo(val));
        // this variable models the modulos operator.
        // y = 2*b + val
        // is equivalent to
        // y mod 2 = val
        variables.set(
            `m${machineIdx}_${idx}_mod`,
            new Map<string, number>().set(`m${machineIdx}_${idx}`, -2),
        );
    });
}

function addJoltageConstraints(
    machine: Machine,
    machineIdx: number,
    constraints: Map<string, Constraint>,
) {
    machine.joltage.forEach((val, idx) => {
        constraints.set(`m${machineIdx}_${idx}`, equalTo(val));
    });
}

function getModel(
    constraints: Map<string, Constraint>,
    variables: Map<string, Map<string, number>>,
): Model {
    return {
        direction: 'minimize',
        objective: 'obj',
        constraints,
        variables,
        integers: true,
    };
}

export function parseMachine(line: string): Machine {
    const content = line.split(' ');
    const lightDiagram = content
        .shift()!
        .slice(1, -1)
        .split('')
        .map((char) => (char === '#' ? 1 : 0));
    const joltage = content
        .pop()!
        .slice(1, -1)
        .split(',')
        .map((c) => parseInt(c));
    const buttonWirings = content.map((wiring) =>
        wiring
            .slice(1, -1)
            .split(',')
            .map((c) => parseInt(c)),
    );
    return { lightDiagram, joltage, buttonWirings };
}
