import { Bounds } from "./bounds";

export function measureSvgBounds(target: SVGGraphicsElement): Bounds {
    const box = target.getBBox();
    return {
        minX: box.x,
        minY: box.y,
        width: box.width,
        height: box.height,
    };
}

export function measureSvgBoundsFromSelector(selector: string): Bounds | null {
    const target = document.querySelector(selector);
    if (!(target instanceof SVGGraphicsElement)) {
        return null;
    }
    return measureSvgBounds(target);
}