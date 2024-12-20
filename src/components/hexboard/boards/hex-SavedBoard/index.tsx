import { useState } from 'react';
import Hexboard from "../../hexboard/HexBoardSVG";
import HexboardLayout from '../../hexboard/HexboardLayout';
import BoardParameters from '../../hexboard/forms/BoardParameters';
import CanvasParameters from '../../hexboard/forms/CanvasParameters';
import { clickMessage } from '../../hexboard/hexFunctions';
import { hexOrientations } from '../../hexboard/hexMath';
import RosterDisplay from '../../hexboard/hexRosterDisplay';
import fileData from './data.json';

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

	const hexRoster = fileData.hexRoster;
	// const canvasGlobals = fileData.canvasGlobals;

	const gameGlobals: gameglobalsType = {
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

	return <HexboardLayout id="savedBoard" displayTitle="Saved Board" forms={[<BoardParameters
		hexRadius={hexRadius}
		separationMultiplier={separationMultiplier}
		SEThexRadius={SEThexRadius}
		SETseparationMultiplier={SETseparationMultiplier} hexgridOrigin={hexGridOrigin} SEThexGridOrigin={SEThexGridOrigin} />,
	<CanvasParameters
		canvasWidth={canvasWidth} SETcanvasWidth={SETcanvasWidth}
		canvasHeight={canvasHeight} SETcanvasHeight={SETcanvasHeight}
		hexGridOrigin={hexGridOrigin} SEThexGridOrigin={SEThexGridOrigin}
	/>]} board={<Hexboard
		hexRoster={hexRoster}
		gameGlobals={gameGlobals}
		canvasGlobals={canvasGlobals} />} roster={<RosterDisplay hexRoster={hexRoster} />} />
}