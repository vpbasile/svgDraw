import { drawLine } from '../helpers';
import { colorSelector, myLineT } from '../types';
// import './treeColor.css';
import './rainbow.css';


export default function Tree(props: { root: myLineT, delta: number, depth: number }): JSX.Element {
    const { root, delta, depth } = props;
    // Replace the root's width with the depth and the root's color with the colorSelector
    root.width = `${depth}px`;
    const maxDepth = 13;
    root.color = maxDepth - depth as colorSelector;

    // Cache for storing previously computed branches
    const branchCache = new Map<string, myLineT[]>();

    // Helper to generate a cache key
    const getKey = (line: myLineT, depth: number) => `${line.start.x},${line.start.y},${line.angle},${depth}`;

    // Function to generate branches
    function makeBranches(line: myLineT, delta: number, color: colorSelector, width: string): myLineT[] {
        const { start, angle, length } = line;
        const { x: x1, y: y1 } = start;
        const x2 = x1 + length * Math.cos(angle);
        const y2 = y1 + length * Math.sin(angle);
        const newLength = length * 0.75;
        const newAngle1 = angle + delta;
        const newAngle2 = angle - delta;
        const newLine1 = { start: { x: x2, y: y2 }, angle: newAngle1, length: newLength, color, width };
        const newLine2 = { start: { x: x2, y: y2 }, angle: newAngle2, length: newLength, color, width };
        return [newLine1, newLine2];
    }

    // Recursive function to generate the tree
    function makeTree(root: myLineT, depth: number): myLineT[] {
        if (depth === 0) return [];

        const key = getKey(root, depth);
        if (branchCache.has(key)) return branchCache.get(key)!;

        // Dynamically calculate the width based on depth
        const width = `${depth}px`;

        // This reverse logic is fixed here:
        const color = depth <= 13 ? maxDepth - depth : 13 as colorSelector;

        const branches = makeBranches(root, delta, color, width);
        const children = branches.flatMap(branch => makeTree(branch, depth - 1));
        const result = [root, ...children];

        branchCache.set(key, result);
        return result;
    }

    // Generate the tree structure
    const tree = makeTree(root, depth);


    // Draw the tree
    return <>{tree.map((line, index) => drawLine(line, index))}</>;
}
