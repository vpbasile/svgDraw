import { SVGPart } from "../../../types";

// Game stuff

export type canvasGlobalsType = {
	canvasWidth: number, canvasHeight: number
};

export type HexOrientation = { name: 'flat-top' | 'pointy-top'; cornerAngles: number[]; }

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
	additionalSVG?: SVGPart
}
export type vector = { q: number, r: number }
export type direction = 0 | 1 | 2 | 3 | 4 | 5;
export type coordinateHex = { q: number, r: number }
export type coordinateXY = { x: number, y: number }


export type hexClickFunction = (hex: hexDef, id: number, hexText?: string) => unknown


export type BoardBounds = {
    minX: number;
    minY: number;
    width: number;
    height: number;
};

export type HexBoardState = {
    hexRadius: number;
    separationMultiplier: number;
    orientation: HexOrientation;
};

