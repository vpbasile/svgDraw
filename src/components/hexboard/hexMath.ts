import { canvasGlobalsType, coordinateHex, coordinateXY, direction, gameGlobalsType, hexDef, vector } from "./hexDefinitions"
import { rollover } from "./math"
const sqrt3 = Math.sqrt(3)

export const hexOrientations = {
	"pointy-top": { "name": "pointy-top", "cornerAngles": [30, 90, 150, 210, 270, 330] },
	"flat-top": { "name": "flat-top", "cornerAngles": [0, 60, 120, 180, 240, 300] }
}

// Store all of the q,r directiom vector pairs in an array
export const directionVectors: vector[] = [
	{ "q": +1, "r": 0 }, // Direction 0
	{ "q": +1, "r": -1 }, // Direction 1
	{ "q": 0, "r": -1 }, // Direction 2
	{ "q": -1, "r": 0 }, // Direction 3
	{ "q": -1, "r": +1 }, // Direction 4
	{ "q": 0, "r": +1 } // Direction 5
]

export function calcTheta(angle: number) { return angle * Math.PI / 180 }

export function cube_neighbor(center: coordinateHex, direction: number): coordinateHex {
	return { "q": center.q + directionVectors[direction].q, "r": center.r + directionVectors[direction].r }
}
export function cube_scale(hex: coordinateHex, factor: number): coordinateHex { return { "q": hex.q * factor, "r": hex.r * factor } }
function cube_direction(direction: number) { return directionVectors[direction] }
function cube_add(hexA: coordinateHex, hexB: coordinateHex): coordinateHex { return { "q": hexA.q + hexB.q, "r": hexA.r + hexB.r } }

// <> FIX - This should be a class property, not a function
export function sCoordinate(hex: coordinateHex) { return -hex.q - hex.r }

export function cube_ring(center: coordinateHex, radius: number): coordinateHex[] {
	const results: coordinateHex[] = []
	let hex: coordinateHex = cube_add(center, cube_scale(cube_direction(4), radius))
	for (let i = 0; i < 6; i++) {
		for (let j = 0; j < radius; j++) {
			results.push(hex)
			hex = cube_neighbor(hex, i)
		}
	}
	return [...results]
}


export function hex_to_pixel(q: number, r: number, gameGlobals: gameGlobalsType): coordinateXY {
	let x: number
	let y: number
	const orientation = gameGlobals.orientation;
	const hexRadius = gameGlobals.hexRadius;
	const separationMultiplier = gameGlobals.separationMultiplier;
	const hexGridOrigin = { x: 0, y: 0 };
	if (orientation.name === "flat-top") {
		x = hexRadius * (3. / 2 * q)
		y = hexRadius * (sqrt3 / 2 * q + sqrt3 * r)
	}
	// else if (orientation.name === "pointy-top") {
	else {
		x = hexRadius * (sqrt3 * q + sqrt3 / 2 * r)
		y = hexRadius * (3. / 2 * r)
	}
	return { "x": x * separationMultiplier + hexGridOrigin.x, "y": y * separationMultiplier + hexGridOrigin.y }
}

type range = { min: number, max: number }
function rangeDistance(range: range): number { return range.max - range.min }

export function calcCenteredRectangle(hexRoster: hexDef[], gameGlobals: gameGlobalsType): canvasGlobalsType {
	// <> Find the min and max values for q and r.  Convert those to rectangular coordinates.  
	let maxRadius = 0
	hexRoster.forEach(hex => {
		const q = hex.q;
		const r = hex.r;
		const s = -q - r;
		if (Math.abs(q) > maxRadius) { maxRadius = q }
		if (Math.abs(r) > maxRadius) { maxRadius = r }
		if (Math.abs(s) > maxRadius) { maxRadius = s }
	});
	maxRadius++;
	const cornerPoints: coordinateXY[] = directionVectors.map((vector) => {
		return hex_to_pixel(vector.q * maxRadius, vector.r * maxRadius, gameGlobals)
	})
	// Now that we know all the corners of the enclosing hexagon, we enclose that in a rectangle by finding the min and max for x and y
	const initRange = { min: 0, max: 0 };
	const xRange: range = initRange;
	const yRange: range = initRange;
	cornerPoints.forEach((point) => {
		if (point.x < xRange.min) { xRange.min = point.x }
		if (point.x > xRange.max) { xRange.max = point.x }
		if (point.y < yRange.min) { yRange.min = point.y }
		if (point.y > yRange.max) { yRange.max = point.y }
	})

	const width = rangeDistance(xRange)
	const height = rangeDistance(yRange)
	return {
		canvasWidth: width,
		canvasHeight: height
	}
}

export function rolloverDirection(value: number): direction { return (rollover(value, 5)) as direction }

