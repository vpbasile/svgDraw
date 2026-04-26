import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { PageSizeKey } from "../../../common/pageSizeSettings";
import RosterDisplay from "../forms/D_HexRoster";
import BoardParameters from "../forms/F_BoardParameters";
import HexboardWrapper from "../HexboardWrapper";
import { computeHexBoardBounds } from "../utils/computeBounds";
import { gameGlobalsType, hexDef } from "../utils/hexDefinitions";
import { hexOrientations } from "../utils/hexMath";

const MODULE_DEFAULT_PAGE_SIZE: PageSizeKey = '11x8.5';

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

	/**
	 * Coordinates and IDs for the hexagons arranged in a Cataan-style board layout.
	 * Each space defines a position (q, r in cube coordinates) and a unique ID.
	 */
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

	/**
	 * Combines space coordinates with terrain colors to create the complete hex roster.
	 * Maps each space to its corresponding terrain and generates a hexagon definition.
	 */
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
	const hexRoster = tempRoster

	// <><><> Step 2: Create the control panel

	const buildControlPanel = <Box id="control-panel-cataan">
		<BoardParameters
			// Hexagonally-specific parameters
			hexRadius={hexRadius}
			separationMultiplier={separationMultiplier}
			SEThexRadius={SEThexRadius}
			SETseparationMultiplier={SETseparationMultiplier} hexgridOrigin={{
				x: 0,
				y: 0
			}} />
		<RosterDisplay hexRoster={hexRoster} />
	</Box>

	const orientation = hexOrientations['pointy-top'];

	/**
	 * Board rendering configuration that controls visual properties.
	 * Defines how hexagons are oriented, sized, and spaced.
	 */
	const gameGlobals: gameGlobalsType = {
		displayTitle: "Cataan",
		orientation,
		hexRadius: hexRadius,
		separationMultiplier: separationMultiplier,
		textSize: 12,
		drawBackBoard: false,
	}

	const bounds = computeHexBoardBounds(hexRoster, hexRadius, orientation, separationMultiplier, hexRadius);
	const viewBox = `${bounds.minX} ${bounds.minY} ${bounds.width} ${bounds.height}`;

	return <HexboardWrapper
		title="Cataan"
		defaultPageSize={MODULE_DEFAULT_PAGE_SIZE}
		gameGlobals={gameGlobals}
		viewBox={viewBox}
		hexRoster={hexRoster}
		controlPanel={buildControlPanel}
	/>
}