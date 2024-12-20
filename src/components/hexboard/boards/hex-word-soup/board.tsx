import HexboardLayout from "../../hexboard/HexboardLayout"
import Hexboard from "../../hexboard/HexBoardSVG"
import { canvasGlobalsType, gameGlobalsType, hexProps } from "../../hexboard/hexDefinitions"
import { clickMessage } from "../../hexboard/hexFunctions"
import { hexOrientations } from "../../hexboard/hexMath"
import RosterDisplay from "../../hexboard/hexRosterDisplay"

export default function WordSoupBoard(props: { hexRoster: hexProps[], children?: JSX.Element }) {
	const hexRoster = props.hexRoster
	// <> States that control canvas parameters
	const canvasWidth = 6000
	const canvasHeight = 4200
	const hexRadius = 200
	const separationMultiplier = 1.1
	const hexGridOrigin = { x: 3000, y: 2100 }
	const orientation = hexOrientations["flat-top"]

	const gameGlobals: gameGlobalsType = {
		// Hexagons
		orientation: orientation,
		hexRadius: hexRadius,
		separationMultiplier: separationMultiplier,
		textSize: 122,
		drawBackBoard: true,
		onClick: clickMessage
	}

	const canvasGlobals: canvasGlobalsType = {
		canvasWidth: canvasWidth,
		canvasHeight: canvasHeight,
		hexGridOrigin: hexGridOrigin,
		canvasBackgroundColor: '#00c',
	}

	return <HexboardLayout id="wordSoupBoard" displayTitle="Word Soup"
		// forms={
		// 	[<BoardParameters
		// 		hexRadius={hexRadius}
		// 		separationMultiplier={separationMultiplier}
		// 		SEThexRadius={SEThexRadius}
		// 		SETseparationMultiplier={SETseparationMultiplier} hexgridOrigin={hexGridOrigin} SEThexGridOrigin={SEThexGridOrigin} />,
		// 	<CanvasParameters
		// 		canvasWidth={canvasWidth} SETcanvasWidth={SETcanvasWidth}
		// 		canvasHeight={canvasHeight} SETcanvasHeight={SETcanvasHeight}
		// 		hexGridOrigin={hexGridOrigin} SEThexGridOrigin={SEThexGridOrigin}
		// 	/>]
		// } 
		board={<Hexboard
			hexRoster={hexRoster}
			gameGlobals={gameGlobals}
			canvasGlobals={canvasGlobals} />} roster={<RosterDisplay hexRoster={hexRoster} />} >
		{props.children}
	</HexboardLayout>
}