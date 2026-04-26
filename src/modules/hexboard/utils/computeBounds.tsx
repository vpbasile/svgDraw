import { Bounds, emptyBounds, padBounds } from "../../../common/bounds";
import { hexDef, HexOrientation } from "./hexDefinitions";
import { calcTheta, hex_to_pixel } from "./hexMath";

export function computeHexBoardBounds(
    hexes: hexDef[],
    radius: number,
    orientation: HexOrientation,
    separationMultiplier: number,
    padding: number = radius,
    center: boolean = false
): Bounds {

    if (hexes.length === 0) {
        return emptyBounds();
    }

    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    for (const hex of hexes) {
        const centerPoint = hex_to_pixel(hex.q, hex.r, radius, orientation, separationMultiplier);

        for (const angle of orientation.cornerAngles) {
            const theta = calcTheta(angle);
            const x = centerPoint.x + radius * Math.cos(theta);
            const y = centerPoint.y + radius * Math.sin(theta);

            minX = Math.min(minX, x);
            maxX = Math.max(maxX, x);
            minY = Math.min(minY, y);
            maxY = Math.max(maxY, y);
        }
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
    return padBounds({
        minX,
        minY,
        width: maxX - minX,
        height: maxY - minY,
    }, padding);
}
