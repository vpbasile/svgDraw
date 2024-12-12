import { sizeOrder } from '../constants';
import { drawLine } from '../helpers';
import { colorSelector, myLineT } from '../types';
import './rainbowPrime.css';

export default function Tree(props: { root: myLineT, delta: number, depth: number }): JSX.Element {
    const { root, delta, depth } = props

    // Function to generate branches from a given line
    // Parameters:
    // - line: the line from which branches are generated
    // Returns an array of two new lines representing the branches
    function makeBranches(line: myLineT, delta:number, color: colorSelector, width: string): myLineT[] {
        const { start, angle, length } = line
        const { x: x1, y: y1 } = start
        const x2 = x1 + length * Math.cos(angle)
        const y2 = y1 + length * Math.sin(angle)
        const newLength = length * 0.75
        const newAngle1 = angle + delta
        const newAngle2 = angle - delta
        const newLine1 = { start: { x: x2, y: y2 }, angle: newAngle1, length: newLength, color: color, width: width }
        const newLine2 = { start: { x: x2, y: y2 }, angle: newAngle2, length: newLength, color: color, width: width }
        return [newLine1, newLine2]
    }

    // Function to generate a tree structure of lines
    // Parameters:
    // - root: the root line from which the tree starts
    // - depth: the depth of the tree (number of levels)
    // Returns an array of lines representing the tree
    function makeTree(root: myLineT, depth: number, color: colorSelector, width: string): myLineT[] {
        if (depth === 0) return []
        const branches = makeBranches(root, delta, color, width)
        const children = branches.flatMap(branch => makeTree(branch, depth - 1, color, width))
        return [root, ...children]
    }

    // const fibs = [0, 1, 1, 2, 3, 5, 8, 13, 21]

    // Draw the tree
    return <>{Array.from({ length: depth }, (_, i) => makeTree(root, i, i, sizeOrder[i]))
        .flat()
        // Iterate over exampleTree, drawing each line if a matching line has not already been drawn
        .map((eachLine, index) => drawLine(eachLine, index))}</>
}