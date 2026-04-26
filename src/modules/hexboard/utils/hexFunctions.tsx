import { coordinateHex, hexDef, hexID, vector } from "./hexDefinitions";
import { directionVectors, sCoordinate } from "./hexMath";

export const centerHexagon: hexDef = coord2hex({ q: 0, r: 0 }, "hexboard-center bg-gray", 0)

export function randomMove(): vector { return directionVectors[Math.floor(6 * Math.random())] }
export function alreadyThere(hexSearch: coordinateHex, roster: hexDef[]): boolean {
	if (roster.find((hexCompare: hexDef) => (hexSearch.q === hexCompare.q) && (hexSearch.r === hexCompare.r))) {
		return true;
	}
	else return false;
}

export function coord2hex(props: coordinateHex, color: string = "gray", id: hexID): hexDef {
	return { q: props.q, r: props.r, hexText: "", clickMessage: "", id: id, color: color }
}

export function hex2coord(hex: hexDef): coordinateHex {
	return { q: hex.q, r: hex.r }
}

// <><> Color Funcions
export function blackHexes(hexes: hexDef[]): void {
	hexes.forEach(hex => hex.color = "hover-space bg-black")
}

export function reflectAcrossAxis(hex: hexDef, axis: string, color?: string): hexDef {
	switch (axis) {
		// Yes I know this looks silly, but I haven;t fixed the method for calculating s
		case "q": return coord2hex({ q: hex.q, r: sCoordinate(hex) }, color, 9999);
		case "r": return coord2hex({ q: sCoordinate(hex), r: hex.r }, color, 9999);
		default: return coord2hex({ q: hex.r, r: hex.q }, color, 9999);
	}
}

// <><> Click Handlers

export function defaultClickMessage(hex: hexDef, id: number, hexText?: string): string {
	if (hexText) { return (`Hex ${id} clicked. ${hexText}`) }
	else { return (`Hex ${id} clicked. Coordinates q:${hex.q} r:${hex.r}`) }
}