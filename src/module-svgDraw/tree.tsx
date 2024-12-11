import { colorOrder, sizeOrder } from './constants';
import { drawLine } from './helpers';
import { colorT, myLineT } from './types';
export default function Tree(props: { root: myLineT }): JSX.Element {

    const { root } = props

    // Function to generate branches from a given line
    // Parameters:
    // - line: the line from which branches are generated
    // Returns an array of two new lines representing the branches
    function makeBranches(line: myLineT, color: colorT, width: string): myLineT[] {
        const { start, angle, length } = line
        const { x: x1, y: y1 } = start
        const x2 = x1 + length * Math.cos(angle)
        const y2 = y1 + length * Math.sin(angle)
        const newLength = length * 0.75
        const newAngle1 = angle + Math.PI / 4
        const newAngle2 = angle - Math.PI / 4
        const newLine1 = { start: { x: x2, y: y2 }, angle: newAngle1, length: newLength, color: color, width: width }
        const newLine2 = { start: { x: x2, y: y2 }, angle: newAngle2, length: newLength, color: color, width: width }
        return [newLine1, newLine2]
    }

    // Function to generate a tree structure of lines
    // Parameters:
    // - root: the root line from which the tree starts
    // - depth: the depth of the tree (number of levels)
    // Returns an array of lines representing the tree
    function makeTree(root: myLineT, depth: number, color: colorT, width: string): myLineT[] {
        if (depth === 0) return []
        const branches = makeBranches(root, color, width)
        const children = branches.flatMap(branch => makeTree(branch, depth - 1, color, width))
        return [root, ...children]
    }

    const x = [
        ...makeTree(root, 0, colorOrder[6], sizeOrder[6]),
        ...makeTree(root, 1, colorOrder[5], sizeOrder[0]),
        ...makeTree(root, 2, colorOrder[4], sizeOrder[1]),
        ...makeTree(root, 3, colorOrder[3], sizeOrder[2]),
        ...makeTree(root, 5, colorOrder[2], sizeOrder[3]),
        ...makeTree(root, 8, colorOrder[1], sizeOrder[4]),
        ...makeTree(root, 13, colorOrder[0], sizeOrder[5]),
    ].map((eachLine, index) => drawLine(eachLine, index))

    // An example tree to test the functions

    {/* Iterate over exampleTree, drawing each line if a matching line has not already been drawn */ }
    return <>{x}</>
}