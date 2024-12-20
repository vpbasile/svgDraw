import { coordinateHex, hexID, hexProps, vector } from "./hexDefinitions";
import { directionVectors, sCoordinate } from "./hexMath";

export const centerHexagon: hexProps = coord2hex({ q: 0, r: 0 }, "hexboard-center bg-gray", 0)

export function randomMove(): vector { return directionVectors[Math.floor(6 * Math.random())] }
export function alreadyThere(hexSearch: hexProps, roster: hexProps[]): boolean {
	if (roster.find((hexCompare: hexProps) => (hexSearch.q === hexCompare.q) && (hexSearch.r === hexCompare.r))) {
		return true;
	}
	else return false;
}

export function coord2hex(props: coordinateHex, cssClasses: string = "bg-gray", uid: hexID): hexProps {
	return { q: props.q, r: props.r, cssClasses, hexText: "", clickMessage: "", uid: uid }
}


// <><> Color Funcions
export function blackHexes(hexes: hexProps[]):void {
	hexes.forEach(hex => hex.cssClasses = "hover-space bg-black")
}

export function colorHexes(hexes: hexProps[], getNextCssClass: { (): string; }) {
	hexes.forEach(hex => { hex.cssClasses = `hover-space ${getNextCssClass()}` })
}

export function reflectAcrossAxis(hex: hexProps, axis: string, cssClasses?: string): hexProps {
	switch (axis) {
		// Yes I know this looks silly, but I haven;t fixed the method for calculating s
		case "q": return coord2hex({ q: hex.q, r: sCoordinate(hex) }, cssClasses, 9999);
		case "r": return coord2hex({ q: sCoordinate(hex), r: hex.r }, cssClasses, 9999);
		default: return coord2hex({ q: hex.r, r: hex.q }, cssClasses, 9999);
	}
}

// <><> Click Handlers

export function clickMessage(hex: hexProps, id: number, hexText?: string): string {
	if (hexText) { return (`Hex ${id} clicked. ${hexText}`) }
	else { return (`Hex ${id} clicked. Coordinates q:${hex.q} r:${hex.r}`) }
}