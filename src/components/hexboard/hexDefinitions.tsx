import { ReactNode } from "react";

// Game stuff
export type gameGlobalsType = {
	// Hexagon propeties
	orientation: orientation,
	hexRadius: number,
	separationMultiplier: number,
	textSize: number,
	drawBackBoard: boolean,
	onClick: hexClickFunction,
	// Children
	children?: ReactNode
}

export type canvasGlobalsType = {
	canvasWidth: number, canvasHeight: number,
	hexGridOrigin: coordinateXY,
	canvasBackgroundColor: string,
};

export type orientation = { name: string; cornerAngles: number[]; }
export type orientationName = 'flat-top' | 'pointy-top'

// Hexagon stuff

// Eventually, this will want to be more specific
export type hexID = number;

export type hexProps = {
	// <> FIXME: I should not be passing down the gameGlobals to every hexagon - why did I do this in the first place?
	// gameGlobals: gameGlobalsType;
	uid: hexID;
	q: number;
	r: number;
	cssClasses?: string;
	hexText?: string;
	clickMessage: string;
}
export type vector = { q: number, r: number }
export type direction = number; // ZZZ Should contrain to  0 | 1 | 2 | 3 | 4 | 5;
export type coordinateHex = { q: number, r: number }
export type coordinateXY = { x: number, y: number }


export type hexClickFunction = (hex: hexProps, id: number, hexText?: string) => unknown
