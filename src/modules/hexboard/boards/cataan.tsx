import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { PageSizeKey } from "../../../common/pageSizeSettings";
import RosterDisplay from "../forms/D_HexRoster";
import BoardParameters from "../forms/F_BoardParameters";
import HexboardSVG from "../HexBoardSVG";
import { computeHexBoardBounds } from "../utils/computeBounds";
import { gameGlobalsType, hexDef } from "../utils/hexDefinitions";
import { hexOrientations } from "../utils/hexMath";

const MODULE_DEFAULT_PAGE_SIZE: PageSizeKey = '36x24';

export default function Cataan() {
	// <> States that control canvas parameters
	const [hexRadius, SEThexRadius] = useState(200);
	const [separationMultiplier, SETseparationMultiplier] = useState(1.1)
	// Constants, States, and Functions unique to this board
	// <> This color stuff is reusable across all boards

	const colors = {
		"mountaintop": "white",
		"forest": "green",
		"pasture": "lightgreen",
		"mountain": "grey",
		"field": "yellow",
		"hill": "brown"
	}

	const spaces = [
		{ q: 0, r: -2, id: 1 },
		{ q: 1, r: -2, id: 2 },
		{ q: 2, r: -2, id: 3 },
		{ q: -1, r: -1, id: 4 },
		{ q: 0, r: -1, id: 5 },
		{ q: 1, r: -1, id: 6 },
		{ q: 2, r: -1, id: 7 },
		{ q: -2, r: 0, id: 8 },
		{ q: -1, r: 0, id: 9 },
		{ q: 0, r: 0, id: 10 },
		{ q: 1, r: 0, id: 11 },
		{ q: 2, r: 0, id: 12 },
		{ q: -2, r: 1, id: 13 },
		{ q: -1, r: 1, id: 14 },
		{ q: 0, r: 1, id: 15 },
		{ q: 1, r: 1, id: 16 },
		{ q: -2, r: 2, id: 17 },
		{ q: -1, r: 2, id: 18 },
		{ q: 0, r: 2, id: 19 }
	]

	// const recommendedRoster = [
	// 	{ color: colors.mountain },
	// 	{ color: colors.pasture },
	// 	{ color: colors.forest },
	// 	{ color: colors.field },
	// 	{ color: colors.hill },
	// 	{ color: colors.pasture },
	// 	{ color: colors.hill },
	// 	{ color: colors.field },
	// 	{ color: colors.forest },
	// 	{ color: colors.mountaintop },
	// 	{ color: colors.forest },
	// 	{ color: colors.mountain },
	// 	{ color: colors.forest },
	// 	{ color: colors.mountain },
	// 	{ color: colors.field },
	// 	{ color: colors.pasture },
	// 	{ color: colors.hill },
	// 	{ color: colors.field },
	// 	{ color: colors.pasture }
	// ];

	const customRoster = [
		{ color: colors.forest },
		{ color: colors.pasture },
		{ color: colors.pasture},
		{ color: colors.field },
		{ color: colors.mountain },
		{ color: colors.hill },
		{ color: colors.forest },
		{ color: colors.field },
		{ color: colors.hill },
		{ color: colors.mountaintop },
		{ color: colors.mountain },
		{ color: colors.field },
		{ color: colors.forest },
		{ color: colors.mountain },
		{ color: colors.hill },
		{ color: colors.pasture },
		{ color: colors.forest },
		{ color: colors.pasture },
		{ color: colors.field },
	]

	// <><><> Step 1: Create the hex roster
	// Combine the spaces and the chosen roster
	const tempRoster: hexDef[] = []
	spaces.forEach((space, index) => {
		const thisTerrain = customRoster[index].color;
		tempRoster.push({
			q: space.q,
			r: space.r,
			id: space.id,
			color: thisTerrain,
			clickMessage: `Space ${space.id} - ${thisTerrain}`
		})
	})
	console.log('Hex Count:', tempRoster.length)
	const hexRoster = tempRoster

	// <><><> Step 2: Create the control panel

	const buildControlPanel = <Box id="control-panel-trivia">
		{/* Canvas Parameters */}
		<Box id="control-panel-trivia">
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

	const orientation = hexOrientations['pointy-top'];

	const gameGlobals: gameGlobalsType = {
		displayTitle: "Create Board",
		orientation,
		hexRadius: hexRadius,
		separationMultiplier: separationMultiplier,
		textSize: 12,
		drawBackBoard: false,
	}

	const bounds = computeHexBoardBounds(hexRoster, hexRadius, orientation, separationMultiplier, hexRadius);
	const viewBox = `${bounds.minX} ${bounds.minY} ${bounds.width} ${bounds.height}`;

	return <HexboardSVG gameGlobals={gameGlobals} viewBox={viewBox} hexRoster={hexRoster}
		defaultPageSize={MODULE_DEFAULT_PAGE_SIZE}
		controlPanel={buildControlPanel}
	/>
}