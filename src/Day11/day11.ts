export function part1(input: Node[]): number {
    const graph = getGraph(input);
    const cache: { [key: string]: number[] } = {
        out: [1, 1, 1],
    };
    const paths = getPaths(graph, 'you', 0, 0, cache);
    return paths;
}

export function part2(input: Node[]): number {
    const graph = getGraph(input);
    const cache: { [key: string]: number[] } = {
        out: [0, 0, 1],
    };
    const paths = getPaths(graph, 'svr', 0, 2, cache);
    return paths;
}

function getPaths(
    graph: Map<string, string[]>,
    source: string,
    visited: number,
    requirement: number,
    cache: { [key: string]: (number | undefined)[] },
): number {
    if (cache[source] && cache[source][visited] !== undefined) {
        return cache[source][visited];
    }
    const result = graph.get(source)!.reduce((acc, val) => {
        const count = val === 'dac' || val === 'fft' ? 1 : 0;
        return acc + getPaths(graph, val, visited + count, requirement, cache);
    }, 0);

    if (!cache[source]) {
        cache[source] = [undefined, undefined, undefined];
    }
    cache[source][visited] = result;
    return result;
}

type Node = {
    id: string;
    children: string[];
};

function getGraph(input: Node[]): Map<string, string[]> {
    return input.reduce<Map<string, string[]>>(
        (map, node) => map.set(node.id, node.children),
        new Map<string, string[]>(),
    );
}

export function parseNode(line: string): Node {
    const content = line.split(':');
    const children = content[1]
        .split(' ')
        .map((c) => c.trim())
        .filter((str) => str.length > 0);
    return {
        id: content[0],
        children,
    };
}
