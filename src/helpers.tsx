// function with a single aprameter, wonce, which has a default value of "blumber"
// function greet(name = "blumber") {

import { myLineT } from "./types";

export function drawLine(zLine: myLineT, key?: number): JSX.Element {
    const { start, angle, length } = zLine
    let { color, width } = zLine
    const { x: x1, y: y1 } = start
    const x2 = x1 + length * Math.cos(angle)
    const y2 = y1 + length * Math.sin(angle)
    // If color is not provided, default to white
    if (!color) color = 'white'
    // If width is not provided, default to 1px
    if (!width) width = '1px'
    // <line x1={ x1 } y1 = { y1 } x2 = { x2 } y2 = { y2 } style = {{ stroke: color, strokeWidth: width }} key = {`line${key}`} />
    return (<line x1={x1} y1={y1} x2={x2} y2={y2} style={{ stroke: color, strokeWidth: width }} key={`line${key}`} />)
}

// Find the perpendiculr bisector of a line and return a line half the length of the original
export function findPerpendicularBisector(line: myLineT): myLineT {
    const { start, angle, length } = line
    const { x: x1, y: y1 } = start
    const x2 = x1 + length * Math.cos(angle)
    const y2 = y1 + length * Math.sin(angle)
    const mx = (x1 + x2) / 2
    const my = (y1 + y2) / 2
    const mangle = angle + Math.PI / 2
    return { start: { x: mx, y: my }, angle: mangle, length: length / 2 }
}