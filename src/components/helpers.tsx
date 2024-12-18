// function with a single aprameter, wonce, which has a default value of "blumber"
// function greet(name = "blumber") {

import { coordinateT, myLineT } from "../types";

export function drawLine(zLine: myLineT, key?: number): JSX.Element {
    const { start, angle, length } = zLine
    let { color, width } = zLine
    const { x: x1, y: y1 } = start
    const x2 = x1 + length * Math.cos(angle)
    const y2 = y1 + length * Math.sin(angle)
    // If color is not provided, default to 50% grey
    if (!color) color = '#808080'
    // If width is not provided, default to 1px
    if (!width) width = '1px'
    // <line x1={ x1 } y1 = { y1 } x2 = { x2 } y2 = { y2 } style = {{ stroke: color, strokeWidth: width }} key = {`line${key}`} />
    return (<line x1={x1} y1={y1} x2={x2} y2={y2} style={{ strokeWidth: width, stroke: color }} key={`line${key}`} />)
}

export function rotateLinesAroundPoint(lines: myLineT[], angle: number, point:coordinateT): myLineT[] {
    const { x: cx, y: cy } = point;
    return lines.map(line => {
        const { start, angle: lineAngle, length, color, width, z } = line;
        const { x, y } = start;

        // Step 1: Translate the start point relative to the center of rotation
        const translatedX = x - cx;
        const translatedY = y - cy;

        // Step 2: Rotate the point
        const rotatedX = translatedX * Math.cos(angle) - translatedY * Math.sin(angle);
        const rotatedY = translatedX * Math.sin(angle) + translatedY * Math.cos(angle);

        // Step 3: Translate back to the original position
        const newX = rotatedX + cx;
        const newY = rotatedY + cy;

        // Step 4: Rotate the line's angle
        const newAngle = lineAngle + angle;

        // Return a new line with updated position and angle
        return { start: { x: newX, y: newY }, angle: newAngle, length, color, width, z };
    });
}


// Find the perpendiculr bisector of a line and return a line half the length of the original
export function findPerpendicularBisector(line: myLineT): myLineT {
    const { start, angle, length, z } = line
    const { x: x1, y: y1 } = start
    const x2 = x1 + length * Math.cos(angle)
    const y2 = y1 + length * Math.sin(angle)
    const mx = (x1 + x2) / 2
    const my = (y1 + y2) / 2
    const mangle = angle + Math.PI / 2
    return { start: { x: mx, y: my }, angle: mangle, length: length / 2, z }
}