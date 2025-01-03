import { myLineT } from '../../types';

export default function Tree(root: myLineT, delta: number, depth: number, palette: string[]): myLineT[] {
    const maxDepth = depth;

    // Set root color to the (palette.length - maxDepth) color
    root.width = `${depth}px`;
    root.color = palette[palette.length - maxDepth];

    // Cache for storing previously computed branches
    const branchCache = new Map<string, myLineT[]>();

    // Helper to generate a cache key
    const getKey = (line: myLineT, depth: number) => `${line.start.x},${line.start.y},${line.angle},${depth}`;

    // Function to generate branches
    function makeBranches(line: myLineT, delta: number, color: string, width: string): myLineT[] {
        const { start, angle, length, z, key } = line;
        const { x: x1, y: y1 } = start;
        const x2 = x1 + length * Math.cos(angle);
        const y2 = y1 + length * Math.sin(angle);
        const newLength = length * 0.75;
        const newAngle1 = angle + delta;
        const newAngle2 = angle - delta;
        const newLine1 = { start: { x: x2, y: y2 }, angle: newAngle1, length: newLength, color, width, z: z - 1, key: `${key}1` };
        const newLine2 = { start: { x: x2, y: y2 }, angle: newAngle2, length: newLength, color, width, z: z - 1, key: `${key}2` };
        return [newLine1, newLine2];
    }

    // Recursive function to generate the tree
    function makeTree(root: myLineT, depth: number): myLineT[] {
        if (depth === 0) return [];

        const key = getKey(root, depth);
        if (branchCache.has(key)) return [];

        // Dynamically calculate the width based on depth
        const width = `${depth}px`;

        // Select the color for the current depth level, starting from the root color
        const colorIndex = palette.length - maxDepth + (maxDepth - depth);
        const color = palette[colorIndex];

        const branches = makeBranches(root, delta, color, width);
        const children = branches.flatMap(branch => makeTree(branch, depth - 1));
        const result = [root, ...children];

        branchCache.set(key, result);
        return result;
    }

    // Generate the tree structure
    const tree = makeTree(root, depth);

    // Return the generated tree structure
    return tree;
}
