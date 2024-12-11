import { colorOrder } from "./constants";
import Tree from "./tree";
import { coordinateT, myLineT } from "./types";

export default function SVGDraw() {
    // Constants
    const canvasSize: number = 1500
    const seed: coordinateT = { x: canvasSize / 2, y: canvasSize / 2 }
    const root: myLineT = { start: seed, angle: 3 * Math.PI / 4, length: 200, color: colorOrder[5], width: '21px' };
    const rootMirror: myLineT = { start: seed, angle: -Math.PI / 4, length: 200, color: colorOrder[5], width: '21px' };

    // Function to draw a line on the canvas
    // Parameters:
    // - zLine: an object representing the line with properties start (coordinates), angle, and length
    // - color: the color of the line (default is 'black')
    // - width: the width of the line (default is '1px')
    // - key: an optional key for React to identify the element

    return (<svg width={canvasSize} height={canvasSize}>
        <Tree root={root} />
        <Tree root={rootMirror} />
    </svg>)
}