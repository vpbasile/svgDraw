import { FormControl, FormLabel } from '@chakra-ui/react';
import { useState } from 'react';
import { PageSizeKey } from '../../../../common/pageSizeSettings';
import { palettes } from '../../../../common/palettes';
import SidebarSection from '../../../../common/SidebarSection';
import RosterDisplay from '../../forms/D_HexRoster';
import BoardParameters from '../../forms/F_BoardParameters';
import HexboardSVG from '../../HexBoardSVG';
import { computeHexBoardBounds } from '../../utils/computeBounds';
import { gameGlobalsType, hexDef } from '../../utils/hexDefinitions';
import { hexOrientations } from '../../utils/hexMath';

export default function SavedBoard() {
	// <> States that control canvas parameters
	const [hexRadius, SEThexRadius] = useState(200);
	const [separationMultiplier, SETseparationMultiplier] = useState(1.1)
	const [orientation] = useState(hexOrientations["flat-top"])
	const MODULE_DEFAULT_PAGE_SIZE: PageSizeKey = '24x36';

	// Constants, States, and Functions unique to this board
	let colorIndex = 0;
	function getNextcolor() {
		const color = colors[colorIndex];
		colorIndex = (colorIndex + 1) % colors.length;
		return color;
	}
	const [selectedPalette, setSelectedPalette] = useState<string>('coolToWarm');
	const colors = palettes[selectedPalette]

	const controlPalette = (
		<SidebarSection id="palette-control" title="Color Palette">
			{Object.keys(palettes).map((paletteKey) => (
				<FormControl key={paletteKey} display="flex" alignItems="center">
					<FormLabel htmlFor={paletteKey} mb="0">
						{paletteKey.charAt(0).toUpperCase() + paletteKey.slice(1)}
					</FormLabel>
					<input
						aria-label={`Select Palette ${paletteKey}`}
						title={`Select Palette ${paletteKey}`}
						type="radio"
						id={paletteKey}
						name="palette"
						value={paletteKey}
						checked={selectedPalette === paletteKey}
						onChange={(e) => setSelectedPalette(e.target.value)}
					/>
				</FormControl>
			))}
		</SidebarSection>
	);

	// const hexRoster = fileData.hexRoster;
	let idGen = 0;
	const hexRoster: hexDef[] = [
		{ "q": 0, "r": 0, id: idGen++, clickMessage: "zzzz", color: getNextcolor() },
		{ "q": 1, "r": 0, id: idGen++, clickMessage: "zzzz", color: getNextcolor() },
		{ "q": 2, "r": 0, id: idGen++, clickMessage: "zzzz", color: getNextcolor() },
		{ "q": -1, "r": 0, id: idGen++, clickMessage: "zzzz", color: getNextcolor() },
		{ "q": 3, "r": 0, id: idGen++, clickMessage: "zzzz", color: getNextcolor() },
		{ "q": 4, "r": 0, id: idGen++, clickMessage: "zzzz", color: getNextcolor() },
		{ "q": 4, "r": 1, id: idGen++, clickMessage: "zzzz", color: getNextcolor() },
		{ "q": 4, "r": -1, id: idGen++, clickMessage: "zzzz", color: getNextcolor() },
		{ "q": 4, "r": -2, id: idGen++, clickMessage: "zzzz", color: getNextcolor() },
		{ "q": 3, "r": -1, id: idGen++, clickMessage: "zzzz", color: getNextcolor() },
		{ "q": 5, "r": -3, id: idGen++, clickMessage: "zzzz", color: getNextcolor() },
		{ "q": 6, "r": -4, id: idGen++, clickMessage: "zzzz", color: getNextcolor() },
		{ "q": 1, "r": 1, id: idGen++, clickMessage: "zzzz", color: getNextcolor() },
		{ "q": 1, "r": 2, id: idGen++, clickMessage: "zzzz", color: getNextcolor() },
		{ "q": 0, "r": 3, id: idGen++, clickMessage: "zzzz", color: getNextcolor() },
		{ "q": -1, "r": 4, id: idGen++, clickMessage: "zzzz", color: getNextcolor() },
		{ "q": -2, "r": 4, id: idGen++, clickMessage: "zzzz", color: getNextcolor() },
		{ "q": -3, "r": 4, id: idGen++, clickMessage: "zzzz", color: getNextcolor() },
		{ "q": 0, "r": 4, id: idGen++, clickMessage: "zzzz", color: getNextcolor() },
		{ "q": 1, "r": 4, id: idGen++, clickMessage: "zzzz", color: getNextcolor() },
		{ "q": -4, "r": 4, id: idGen++, clickMessage: "zzzz", color: getNextcolor() },
		{ "q": -5, "r": 4, id: idGen++, clickMessage: "zzzz", color: getNextcolor() },
		{ "q": -5, "r": 5, id: idGen++, clickMessage: "zzzz", color: getNextcolor() },
		{ "q": -4, "r": 5, id: idGen++, clickMessage: "zzzz", color: getNextcolor() },
		{ "q": -4, "r": 6, id: idGen++, clickMessage: "zzzz", color: getNextcolor() },
		{ "q": -4, "r": 7, id: idGen++, clickMessage: "zzzz", color: getNextcolor() },
		{ "q": -4, "r": 3, id: idGen++, clickMessage: "zzzz", color: getNextcolor() },
		{ "q": -4, "r": 2, id: idGen++, clickMessage: "zzzz", color: getNextcolor() },
		{ "q": -3, "r": 1, id: idGen++, clickMessage: "zzzz", color: getNextcolor() },
		{ "q": -3, "r": 2, id: idGen++, clickMessage: "zzzz", color: getNextcolor() },
		{ "q": -5, "r": 2, id: idGen++, clickMessage: "zzzz", color: getNextcolor() },
		{ "q": -2, "r": 2, id: idGen++, clickMessage: "zzzz", color: getNextcolor() },
		{ "q": -2, "r": 1, id: idGen++, clickMessage: "zzzz", color: getNextcolor() },
		{ "q": -2, "r": 3, id: idGen++, clickMessage: "zzzz", color: getNextcolor() },
		{ "q": -5, "r": 6, id: idGen++, clickMessage: "zzzz", color: getNextcolor() },
		{ "q": -5, "r": 7, id: idGen++, clickMessage: "zzzz", color: getNextcolor() },
		{ "q": -6, "r": 8, id: idGen++, clickMessage: "zzzz", color: getNextcolor() },
		{ "q": -6, "r": 9, id: idGen++, clickMessage: "zzzz", color: getNextcolor() },
		{ "q": -5, "r": 8, id: idGen++, clickMessage: "zzzz", color: getNextcolor() },
		{ "q": -7, "r": 8, id: idGen++, clickMessage: "zzzz", color: getNextcolor() },
		{ "q": -7, "r": 7, id: idGen++, clickMessage: "zzzz", color: getNextcolor() },
		{ "q": -7, "r": 9, id: idGen++, clickMessage: "zzzz", color: getNextcolor() },
		{ "q": -5, "r": 9, id: idGen++, clickMessage: "zzzz", color: getNextcolor() },
		{ "q": -4, "r": 9, id: idGen++, clickMessage: "zzzz", color: getNextcolor() },
		{ "q": -8, "r": 9, id: idGen++, clickMessage: "zzzz", color: getNextcolor() },
		{ "q": -6, "r": 7, id: idGen++, clickMessage: "zzzz", color: getNextcolor() },
		{ "q": -6, "r": 10, id: idGen++, clickMessage: "zzzz", color: getNextcolor() },
		{ "q": -7, "r": 10, id: idGen++, clickMessage: "zzzz", color: getNextcolor() },
		{ "q": -7, "r": 11, id: idGen++, clickMessage: "zzzz", color: getNextcolor() },
		{ "q": -4, "r": 8, id: idGen++, clickMessage: "zzzz", color: getNextcolor() },
		{ "q": -3, "r": 7, id: idGen++, clickMessage: "zzzz", color: getNextcolor() }
	]

	const gameGlobals: gameGlobalsType = {
		// Hexagons
		orientation: orientation,
		hexRadius: hexRadius,
		separationMultiplier: separationMultiplier,
		textSize: 12,
		drawBackBoard: true,
		displayTitle: "Board from Save File",
	}

	const bounds = computeHexBoardBounds(
		hexRoster,
		hexRadius,
		orientation,
		separationMultiplier,
		hexRadius,
	);
	const viewBox = `${bounds.minX} ${bounds.minY} ${bounds.width} ${bounds.height}`;

	const buildControlPanel = <>
		{controlPalette}
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
	</>

	return <HexboardSVG gameGlobals={gameGlobals} viewBox={viewBox} hexRoster={hexRoster} controlPanel={buildControlPanel} defaultPageSize={MODULE_DEFAULT_PAGE_SIZE} />
}