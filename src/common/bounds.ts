export type Bounds = {
    minX: number;
    minY: number;
    width: number;
    height: number;
};

export function emptyBounds(): Bounds {
    return { minX: 0, minY: 0, width: 0, height: 0 };
}

export function padBounds(bounds: Bounds, padding: number): Bounds {
    return {
        minX: bounds.minX - padding,
        minY: bounds.minY - padding,
        width: bounds.width + padding * 2,
        height: bounds.height + padding * 2,
    };
}