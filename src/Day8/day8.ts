export function part1(input: junction[], pairs: number): number {
    const distances = getDistanceMatrix(input);
    const { circuits } = createCircuits(distances, input.length, pairs);
    return circuits
        .sort((circA, circB) => circB.length - circA.length)
        .slice(0, 3)
        .reduce<number>((acc, val) => acc * val.length, 1);
}

export function part2(input: junction[]): number {
    const distances = getDistanceMatrix(input);
    const { lastJunctionIdx } = createCircuits(distances, input.length, Infinity);
    return input[lastJunctionIdx.idxA].x * input[lastJunctionIdx.idxB].x;
}

export type junction = {
    x: number;
    y: number;
    z: number;
};

export function parseJunction(line: string): junction {
    const coords = line.split(',').map((val) => {
        return parseInt(val);
    });
    return { x: coords[0], y: coords[1], z: coords[2] };
}

function distance(a: junction, b: junction): number {
    return Math.sqrt(
        (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y) + (a.z - b.z) * (a.z - b.z),
    );
}

function getDistanceMatrix(input: junction[]): number[][] {
    const distances: number[][] = new Array<number[]>(input.length);
    input.forEach((valA, idxA) => {
        distances[idxA] = new Array<number>(idxA);
        for (let idxB = 0; idxB < idxA; idxB++) {
            distances[idxA][idxB] = distance(valA, input[idxB]);
        }
    });
    return distances;
}

function createCircuits(
    distances: number[][],
    junctions: number,
    pairs: number,
): { circuits: number[][]; lastJunctionIdx: { idxA: number; idxB: number } } {
    const circuits = initialiseCircuits(junctions);
    const sortedDistances = distances.flat().sort((a, b) => b - a);
    let connectedPairs = 0;
    let junctionIdx = { idxA: -1, idxB: -1 };
    while (connectedPairs < pairs && circuits.length > 1 && sortedDistances.length > 0) {
        let nextDist = sortedDistances.pop()!;
        junctionIdx = nextJunctions(distances, nextDist);

        const { circuitA, circuitB } = circuitsToConnect(circuits, junctionIdx);

        if (circuitA !== circuitB) {
            circuits[circuitA] = circuits[circuitA].concat(circuits[circuitB]);
            circuits.splice(circuitB, 1);
        }
        connectedPairs++;
    }

    return {
        circuits,
        lastJunctionIdx: junctionIdx,
    };
}

function circuitsToConnect(
    circuits: number[][],
    junctions: { idxA: number; idxB: number },
): { circuitA: number; circuitB: number } {
    let circuitA = -1,
        circuitB = -1;
    for (let idx = 0; idx < circuits.length; idx++) {
        if (circuits[idx].includes(junctions.idxA)) {
            circuitA = idx;
        }
        if (circuits[idx].includes(junctions.idxB)) {
            circuitB = idx;
        }
        if (circuitA !== -1 && circuitB !== -1) {
            break;
        }
    }
    return { circuitA, circuitB };
}

function nextJunctions(distances: number[][], distance: number): { idxA: number; idxB: number } {
    let idxB = -1;
    let idxA = distances.findIndex((dists) => {
        idxB = dists.findIndex((dist) => dist === distance);
        return idxB !== -1;
    });
    return { idxA, idxB };
}

function initialiseCircuits(length: number): number[][] {
    const circuits: number[][] = [];
    for (let i = 0; i < length; i++) {
        circuits.push([i]);
    }
    return circuits;
}
