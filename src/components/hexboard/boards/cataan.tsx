import { Box } from "@chakra-ui/react";
import { useState } from "react";
import BoardParameters from "../forms/BoardParameters";
import CanvasParameters from "../forms/CanvasParameters";
import RosterDisplay from "../forms/hexRosterDisplay";
import HexboardSVG from "../HexBoardSVG";
import { canvasGlobalsType, gameGlobalsType, hexDef } from "../hexDefinitions";
import { clickMessage } from "../hexFunctions";
import { hexOrientations } from "../hexMath";

export default function Cataan() {
	// <> States that control canvas parameters
	const [hexRadius, SEThexRadius] = useState(200);
	const [separationMultiplier, SETseparationMultiplier] = useState(1.1)
	const [canvasHeight, SETcanvasHeight] = useState(3600)
	const [canvasWidth, SETcanvasWidth] = useState(3600)
	// Constants, States, and Functions unique to this board
	// <> This color stuff is reusable across all boards

	const colors = {
		"desert": "tan",
		"forest": "green",
		"pasture": "lightgreen",
		"mountain": "grey",
		"field": "yellow",
		"hill": "brown"
	}

	// <><><> Step 1: Create the hex roster
	const tempRoster: hexDef[] = [
		{ q: 0, r: -2, color: colors.mountain, id: 1, clickMessage: "Stone Hex" },
		{ q: 1, r: -2, color: colors.pasture, id: 2, clickMessage: "Sheep Hex" },
		{ q: 2, r: -2, color: colors.forest, id: 3, clickMessage: "Wood Hex" },
		{ q: -1, r: -1, color: colors.field, id: 4, clickMessage: "Wheat Hex" },
		{ q: 0, r: -1, color: colors.hill, id: 5, clickMessage: "Brick Hex" },
		{ q: 1, r: -1, color: colors.pasture, id: 6, clickMessage: "Sheep Hex" },
		{ q: 2, r: -1, color: colors.hill, id: 7, clickMessage: "Brick Hex" },
		{ q: -2, r: 0, color: colors.field, id: 8, clickMessage: "Wheat Hex" },
		{ q: -1, r: 0, color: colors.forest, id: 9, clickMessage: "Wood Hex" },
		{ q: 0, r: 0, color: colors.desert, id: 10, clickMessage: "Center Hex" },
		{ q: 1, r: 0, color: colors.forest, id: 11, clickMessage: "Wood Hex" },
		{ q: 2, r: 0, color: colors.mountain, id: 12, clickMessage: "Stone Hex" },
		{ q: -2, r: 1, color: colors.forest, id: 13, clickMessage: "Wood Hex" },
		{ q: -1, r: 1, color: colors.mountain, id: 14, clickMessage: "Stone Hex" },
		{ q: 0, r: 1, color: colors.field, id: 15, clickMessage: "Wheat Hex" },
		{ q: 1, r: 1, color: colors.pasture, id: 16, clickMessage: "Sheep Hex" },
		{ q: -2, r: 2, color: colors.hill, id: 17, clickMessage: "Brick Hex" },
		{ q: -1, r: 2, color: colors.field, id: 18, clickMessage: "Wheat Hex" },
		{ q: 0, r: 2, color: colors.pasture, id: 19, clickMessage: "Sheep Hex" }
	]

	console.log('Hex Count:', tempRoster.length)
	const hexRoster = tempRoster

	// <><><> Step 2: Create the control panel

	const buildControlPanel = <Box id="control-panel-trivia">
		{/* Canvas Parameters */}
		<Box id="control-panel-trivia">
			<CanvasParameters
				// Canvas-specific parameters
				canvasWidth={canvasWidth} SETcanvasWidth={SETcanvasWidth}
				canvasHeight={canvasHeight} SETcanvasHeight={SETcanvasHeight} />
			<BoardParameters
				// Hexagonally-specific parameters
				hexRadius={hexRadius}
				separationMultiplier={separationMultiplier}
				SEThexRadius={SEThexRadius}
				SETseparationMultiplier={SETseparationMultiplier} hexgridOrigin={{
					x: 0,
					y: 0
				}} />
		</Box>
		<RosterDisplay hexRoster={hexRoster} />
	</Box>

	const gameGlobals: gameGlobalsType = {
		displayTitle: "Create Board",
		orientation: hexOrientations['pointy-top'],
		hexRadius: hexRadius,
		separationMultiplier: separationMultiplier,
		textSize: 12,
		drawBackBoard: false,
		onClick: clickMessage
	}

	const canvasGlobals: canvasGlobalsType = {
		canvasWidth: canvasWidth,
		canvasHeight: canvasHeight,
	}

	return <HexboardSVG gameGlobals={gameGlobals} canvasGlobals={canvasGlobals} hexRoster={hexRoster}
		controlPanel={buildControlPanel}
	/>
}