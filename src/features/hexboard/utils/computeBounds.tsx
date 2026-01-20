import { hexDef } from "./hexDefinitions";
import { axialToPixel } from "./hexMath";

export type Bounds = {
    minX: number;
    minY: number;
    width: number;
    height: number;
};

export function computeHexBoardBounds(
    hexes: hexDef[],
    radius: number,
    padding: number = radius,
    center: boolean = false
): Bounds {

    if (hexes.length === 0) {
        return { minX: 0, minY: 0, width: 0, height: 0 };
    }

    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    for (const hex of hexes) {
        const { x, y } = axialToPixel(hex.q, hex.r, radius);

        // include full hex extents
        minX = Math.min(minX, x - radius);
        maxX = Math.max(maxX, x + radius);
        minY = Math.min(minY, y - radius);
        maxY = Math.max(maxY, y + radius);

    }
    if (center) {
        const centerX = (minX + maxX) / 2;
        const centerY = (minY + maxY) / 2;
        const halfWidth = (maxX - minX) / 2;
        const halfHeight = (maxY - minY) / 2;
        minX = centerX - halfWidth;
        maxX = centerX + halfWidth;
        minY = centerY - halfHeight;
        maxY = centerY + halfHeight;
    }
    return {
        minX: minX - padding,
        minY: minY - padding,
        width: maxX - minX + padding * 2,
        height: maxY - minY + padding * 2,
    };
}
