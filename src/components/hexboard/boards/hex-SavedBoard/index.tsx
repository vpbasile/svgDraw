import { useState } from 'react';
import BoardParameters from '../../forms/BoardParameters';
import CanvasParameters from '../../forms/CanvasParameters';
import RosterDisplay from '../../forms/hexRosterDisplay';
import { canvasGlobalsType, gameGlobalsType, hexDef } from '../../hexDefinitions';
import { clickMessage } from '../../hexFunctions';
import { hexOrientations } from '../../hexMath';
import HexboardSVG from '../../new-HexBoardSVG';

export default function SavedBoard() {
	// <> States that control canvas parameters
	const [canvasWidth, SETcanvasWidth] = useState(6000)
	const [canvasHeight, SETcanvasHeight] = useState(4200)
	const [hexRadius, SEThexRadius] = useState(200);
	const [separationMultiplier, SETseparationMultiplier] = useState(1.1)
	const [hexGridOrigin, SEThexGridOrigin] = useState({ x: 3000, y: 700 });
	const [orientation] = useState(hexOrientations["flat-top"])
	// function toggleOrientation(): void {
	// 	if (orientation===hexOrientations["flat-top"]){SETorientation(hexOrientations["pointy-top"])} else {
	// 		SETorientation(hexOrientations["flat-top"])
	// 	}
	// }

	// const hexRoster = fileData.hexRoster;
	let idGen = 0;
	const hexRoster: hexDef[] = [{ "q": 0, "r": 0, id: idGen++, clickMessage: "zzzz" }, { "q": 1, "r": 0, id: idGen++, clickMessage: "zzzz" }, { "q": 2, "r": 0, id: idGen++, clickMessage: "zzzz" }, { "q": -1, "r": 0, id: idGen++, clickMessage: "zzzz" }, { "q": 3, "r": 0, id: idGen++, clickMessage: "zzzz" }, { "q": 4, "r": 0, id: idGen++, clickMessage: "zzzz" }, { "q": 4, "r": 1, id: idGen++, clickMessage: "zzzz" }, { "q": 4, "r": -1, id: idGen++, clickMessage: "zzzz" }, { "q": 4, "r": -2, id: idGen++, clickMessage: "zzzz" }, { "q": 3, "r": -1, id: idGen++, clickMessage: "zzzz" }, { "q": 5, "r": -3, id: idGen++, clickMessage: "zzzz" }, { "q": 6, "r": -4, id: idGen++, clickMessage: "zzzz" }, { "q": 1, "r": 1, id: idGen++, clickMessage: "zzzz" }, { "q": 1, "r": 2, id: idGen++, clickMessage: "zzzz" }, { "q": 0, "r": 3, id: idGen++, clickMessage: "zzzz" }, { "q": -1, "r": 4, id: idGen++, clickMessage: "zzzz" }, { "q": -2, "r": 4, id: idGen++, clickMessage: "zzzz" }, { "q": -3, "r": 4, id: idGen++, clickMessage: "zzzz" }, { "q": 0, "r": 4, id: idGen++, clickMessage: "zzzz" }, { "q": 1, "r": 4, id: idGen++, clickMessage: "zzzz" }, { "q": -4, "r": 4, id: idGen++, clickMessage: "zzzz" }, { "q": -5, "r": 4, id: idGen++, clickMessage: "zzzz" }, { "q": -5, "r": 5, id: idGen++, clickMessage: "zzzz" }, { "q": -4, "r": 5, id: idGen++, clickMessage: "zzzz" }, { "q": -4, "r": 6, id: idGen++, clickMessage: "zzzz" }, { "q": -4, "r": 7, id: idGen++, clickMessage: "zzzz" }, { "q": -4, "r": 3, id: idGen++, clickMessage: "zzzz" }, { "q": -4, "r": 2, id: idGen++, clickMessage: "zzzz" }, { "q": -3, "r": 1, id: idGen++, clickMessage: "zzzz" }, { "q": -3, "r": 2, id: idGen++, clickMessage: "zzzz" }, { "q": -5, "r": 2, id: idGen++, clickMessage: "zzzz" }, { "q": -2, "r": 2, id: idGen++, clickMessage: "zzzz" }, { "q": -2, "r": 1, id: idGen++, clickMessage: "zzzz" }, { "q": -2, "r": 3, id: idGen++, clickMessage: "zzzz" }, { "q": -5, "r": 6, id: idGen++, clickMessage: "zzzz" }, { "q": -5, "r": 7, id: idGen++, clickMessage: "zzzz" }, { "q": -6, "r": 8, id: idGen++, clickMessage: "zzzz" }, { "q": -6, "r": 9, id: idGen++, clickMessage: "zzzz" }, { "q": -5, "r": 8, id: idGen++, clickMessage: "zzzz" }, { "q": -7, "r": 8, id: idGen++, clickMessage: "zzzz" }, { "q": -7, "r": 7, id: idGen++, clickMessage: "zzzz" }, { "q": -7, "r": 9, id: idGen++, clickMessage: "zzzz" }, { "q": -5, "r": 9, id: idGen++, clickMessage: "zzzz" }, { "q": -4, "r": 9, id: idGen++, clickMessage: "zzzz" }, { "q": -8, "r": 9, id: idGen++, clickMessage: "zzzz" }, { "q": -6, "r": 7, id: idGen++, clickMessage: "zzzz" }, { "q": -6, "r": 10, id: idGen++, clickMessage: "zzzz" }, { "q": -7, "r": 10, id: idGen++, clickMessage: "zzzz" }, { "q": -7, "r": 11, id: idGen++, clickMessage: "zzzz" }, { "q": -4, "r": 8, id: idGen++, clickMessage: "zzzz" }, { "q": -3, "r": 7, id: idGen, clickMessage: "zzzz" }]
	// const canvasGlobals = fileData.canvasGlobals;

	const gameGlobals: gameGlobalsType = {
		// Hexagons
		orientation: orientation,
		hexRadius: hexRadius,
		separationMultiplier: separationMultiplier,
		textSize: 12,
		drawBackBoard: true,
		onClick: clickMessage
	}

	const canvasGlobals: canvasGlobalsType = {
		canvasWidth: canvasWidth,
		canvasHeight: canvasHeight,
		hexGridOrigin: hexGridOrigin,
		canvasBackgroundColor: '#000',
	}

	const buildControlPanel = <>
		<CanvasParameters
			// Canvas-specific parameters
			canvasWidth={canvasWidth} SETcanvasWidth={SETcanvasWidth}
			canvasHeight={canvasHeight} SETcanvasHeight={SETcanvasHeight}
			hexGridOrigin={hexGridOrigin} SEThexGridOrigin={SEThexGridOrigin} />,
		<BoardParameters
			// Hexagonally-specific parameters
			hexRadius={hexRadius}
			separationMultiplier={separationMultiplier}
			SEThexRadius={SEThexRadius}
			SETseparationMultiplier={SETseparationMultiplier} hexgridOrigin={{
				x: 0,
				y: 0
			}} SEThexGridOrigin={SEThexGridOrigin} />
		<RosterDisplay hexRoster={hexRoster} />
	</>

	return <HexboardSVG gameGlobals={gameGlobals} canvasGlobals={canvasGlobals} hexRoster={hexRoster} controlPanel={buildControlPanel} />
}