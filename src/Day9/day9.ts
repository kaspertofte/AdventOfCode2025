export function part1(input: Point[]): number {
    const areas = getAreaMatrix(input);
    const sortedAreas = areas.flat().sort((a, b) => b.area - a.area);
    return sortedAreas[0].area;
}

export function part2(input: Point[]): number {
    const areas = getAreaMatrix(input);
    const sortedAreas = areas.flat().sort((a, b) => b.area - a.area);
    const constraints = getConstraints(input);

    for (const area of sortedAreas) {
        if (
            constraints.every((c) => {
                return c(area.rectangle);
            })
        ) {
            return area.area;
        }
    }
    return -1;
}

export type Point = { x: number; y: number };

export function parsePoints(line: string): Point {
    const coords = line.split(',').map((num) => parseInt(num.trim()));
    return { x: coords[0], y: coords[1] };
}

function area(a: Point, b: Point): number {
    return (Math.abs(a.x - b.x) + 1) * (Math.abs(a.y - b.y) + 1);
}

function getAreaMatrix(input: Point[]): { rectangle: Rectangle; area: number }[][] {
    const distances: { rectangle: Rectangle; area: number }[][] = new Array<
        { rectangle: Rectangle; area: number }[]
    >(input.length);
    input.forEach((valA, idxA) => {
        distances[idxA] = new Array<{ rectangle: Rectangle; area: number }>(idxA);
        for (let idxB = 0; idxB < idxA; idxB++) {
            distances[idxA][idxB] = {
                rectangle: { c1: input[idxA], c2: input[idxB] },
                area: area(valA, input[idxB]),
            };
        }
    });
    return distances;
}

type Rectangle = {
    c1: Point;
    c2: Point;
};

type Constraint = (rect: Rectangle) => boolean;

function getConstraints(input: Point[]): Constraint[] {
    return input.map((coord, idx, arr) => {
        if (idx < arr.length - 1) {
            return getConstraint(coord, arr[idx + 1]);
        } else {
            return getConstraint(coord, arr[0]);
        }
    });
}

// The constraint should return true, if the segment does not pass through the rectangle
// The constraint should return false, if the segment passes through the rectangle
function getConstraint(p1: Point, p2: Point): Constraint {
    const xA = Math.min(p1.x, p2.x);
    const xB = Math.max(p1.x, p2.x);
    const yA = Math.min(p1.y, p2.y);
    const yB = Math.max(p1.y, p2.y);

    if (p1.x === p2.x) {
        return (rect: Rectangle) => {
            const x1 = Math.min(rect.c1.x, rect.c2.x);
            const x2 = Math.max(rect.c1.x, rect.c2.x);
            const y1 = Math.min(rect.c1.y, rect.c2.y);
            const y2 = Math.max(rect.c1.y, rect.c2.y);

            return p1.x <= x1 || x2 <= p1.x || yB <= y1 || yA >= y2;
        };
    }
    if (p1.y === p2.y) {
        return (rect: Rectangle) => {
            const x1 = Math.min(rect.c1.x, rect.c2.x);
            const x2 = Math.max(rect.c1.x, rect.c2.x);
            const y1 = Math.min(rect.c1.y, rect.c2.y);
            const y2 = Math.max(rect.c1.y, rect.c2.y);

            return p1.y <= y1 || y2 <= p1.y || xB <= x1 || xA >= x2;
        };
    }
    throw new Error('This should not happen');
}
