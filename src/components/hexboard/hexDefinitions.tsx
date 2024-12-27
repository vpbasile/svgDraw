import { ReactNode } from "react";

// Game stuff
export type gameGlobalsType = {
	// Display properties
	displayTitle: string,
	// Hexagon propeties
	orientation: orientation,
	hexRadius: number,
	separationMultiplier: number,
	textSize: number,
	hexText?: string,
	drawBackBoard: boolean,
	// Children
	children?: ReactNode
}

export type canvasGlobalsType = {
	canvasWidth: number, canvasHeight: number
};

export type orientation = { name: string; cornerAngles: number[]; }
export type orientationName = 'flat-top' | 'pointy-top'

// Hexagon stuff

// Eventually, this will want to be more specific
export type hexID = number;

export type hexDef = {
	// This is the unique identifier for a hexagon on the board.  It has everything needed to render the hexagon when accompanied by the gameGlobals
	id: hexID;
	q: number;
	r: number;
	color?: string;
	hexText?: string;
	clickMessage: string;
}
export type vector = { q: number, r: number }
export type direction = 0 | 1 | 2 | 3 | 4 | 5;
export type coordinateHex = { q: number, r: number }
export type coordinateXY = { x: number, y: number }


export type hexClickFunction = (hex: hexDef, id: number, hexText?: string) => unknown
