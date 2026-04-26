import { Box, Button, Container, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { PageSizeKey } from "../../../common/pageSizeSettings";
import { palettes } from "../../../common/palettes";
import SidebarSection from "../../../common/SidebarSection";
import RosterDisplay from "../forms/D_HexRoster";
import BoardParameters from "../forms/F_BoardParameters";
import HexboardWrapper from "../HexboardWrapper";
import { computeHexBoardBounds } from "../utils/computeBounds";
import { gameGlobalsType, hexDef } from "../utils/hexDefinitions";
import { cube_ring, hexOrientations } from "../utils/hexMath";

const MODULE_DEFAULT_PAGE_SIZE: PageSizeKey = '36x24';

export default function CreateBoard() {
	// <> States that control canvas parameters
	const [hexRadius, SEThexRadius] = useState(200);
	const [separationMultiplier, SETseparationMultiplier] = useState(1.1)
	const [defaultOrientation, SETdefaultOrientation] = useState(hexOrientations["pointy-top"])	
	// Constants, States, and Functions unique to this board
	// <> This color stuff is reusable across all boards
	const [selectedPalette, setSelectedPalette] = useState<string>('trivia');
	const [colors, setColors] = useState(palettes[selectedPalette]);

	useEffect(() => {
		setColors(palettes[selectedPalette]);
	}, [selectedPalette]);

	let colorIndex = 0;
	/**
	 * Cycles through the palette colors sequentially.
	 * Returns the next color in the palette, wrapping around to the beginning when the end is reached.
	 * @returns {string} A color value from the current palette
	 */
	function getNextcolor() {
		const color = colors[colorIndex];
		colorIndex = (colorIndex + 1) % colors.length;
		return color;
	}

	// States unique to this board
	const [qTemp, SETqTemp] = useState(0);
	const [rTemp, SETrTemp] = useState(0);
	const [colorTemp, SETcolorTemp] = useState(getNextcolor());

	// <><><> Step 1: Create the hex roster
	/**
	 * Generates a hexagon grid by creating concentric rings around a center hexagon.
	 * The center is colored, subsequent rings are filled with a placeholder gray color.
	 * Each hexagon includes its cube coordinates displayed as text.
	 */
	const blankColor = "rgba(128, 128, 128, 0.5)"
	const centerHex: hexDef = { q: 0, r: 0, color: getNextcolor(), id: 0, clickMessage: "Center Hex" }
	let tempRoster: hexDef[] = [centerHex]
	const boardSize: number = 7
	for (let i = 1; i < boardSize; i++) {
		const thisRing = cube_ring(centerHex, i)
			.map((eachHex) => {
				const uid = tempRoster.length
				return {
					q: eachHex.q, r: eachHex.r,
					color: blankColor,
					id: uid,
					clickMessage: `Hex ${uid}`,
					hexText: `q:${eachHex.q},r:${eachHex.r}`
					
				}
			})
		tempRoster = tempRoster.concat(thisRing);
	}
	
	const [hexRoster, SEThexRoster] = useState<hexDef[]>(tempRoster)

	// Handle adding a hex to the roster
	function addHex() {
		const tempRoster = Array.from(hexRoster)
		tempRoster.push({ q: qTemp, r: rTemp, color: colorTemp, id: hexRoster.length, clickMessage: `Hex ${hexRoster.length}` })
		SEThexRoster(tempRoster);
	}

	// <><><> Step 2: Create the control panel

	const controlPalette = (
		<SidebarSection id="palette-control" title="Color Palette">
					{Object.keys(palettes).map((paletteKey) => (
						<FormControl key={paletteKey} display="flex" alignItems="center">
							<FormLabel htmlFor={paletteKey} mb="0">
								{paletteKey.charAt(0).toUpperCase() + paletteKey.slice(1)}
							</FormLabel>
							<input
								type="radio"
								id={paletteKey}
								aria-label={`Select Palette ${paletteKey}`}
								title={`Select Palette ${paletteKey}`}
								name="palette"
								value={paletteKey}
								checked={selectedPalette === paletteKey}
								onChange={(e) => setSelectedPalette(e.target.value)}
							/>
						</FormControl>
					))}
		</SidebarSection>
	);

	const orientationControl = (
		<SidebarSection id="orientation-control" title="Orientation">
					<FormControl>
						<FormLabel htmlFor="orientation-select">Orientation</FormLabel>
						<select
							id="orientation-select"
							aria-label="Select Orientation"
							title="Select Orientation"
							onChange={(e) => SETdefaultOrientation(hexOrientations[e.target.value as keyof typeof hexOrientations])}
						>
							{Object.keys(hexOrientations).map((orientation) => <option key={orientation} value={orientation}>{orientation}</option>)}
						</select>
					</FormControl>
		</SidebarSection>
	);

	let keyGen = 0;
	const addHexControl = (
		<SidebarSection id="add-hex-control" title="Add Hex">
					<Container color={'orange.500'}>
						<Box id="setQBox">
							<label className="" htmlFor="qField">q:</label>
							<Input id="qField" className="form-control" name="qField" value={qTemp} onChange={(e) => SETqTemp(+e.target.value)} />
						</Box>
						<Box className="setRBox">
							<label className="" htmlFor="rField">r:</label>
							<Input id="rField" className="form-control" name="rField" value={rTemp} onChange={(e) => SETrTemp(+e.target.value)} />
						</Box>
						<Box id="chooseColor">
							<FormLabel htmlFor="colorSelect">Color</FormLabel>
							<select id="colorSelect" aria-label="Select Color" title="Select Color" value={colorTemp} onChange={(e) => SETcolorTemp(e.target.value)}>
								<option value="">-- Select a color --</option>
								{colors.map((color) => <option key={`colorChoice-${keyGen++}`} value={color}>{color}</option>)}
							</select>
						</Box>
						<Box id="buttons">
							<Button onClick={() => addHex()}>Add</Button>
						</Box>
					</Container>
		</SidebarSection>
	);

	const buildControlPanel = <Box id="control-panel-trivia">
		{controlPalette}
		{orientationControl}
			<BoardParameters
				// Hexagonally-specific parameters
				hexRadius={hexRadius}
				separationMultiplier={separationMultiplier}
				SEThexRadius={SEThexRadius}
				SETseparationMultiplier={SETseparationMultiplier} hexgridOrigin={{
					x: 0,
					y: 0
				}} />
		{addHexControl}
		<RosterDisplay hexRoster={hexRoster} />
	</Box>

	/**
	 * Board rendering configuration that controls visual properties.
	 * Defines how hexagons are oriented, sized, and spaced.
	 */
	const gameGlobals: gameGlobalsType = {
		displayTitle: "Create Board",
		orientation: defaultOrientation,
		hexRadius: hexRadius,
		separationMultiplier: separationMultiplier,
		textSize: 12,
		drawBackBoard: false,
	}

	const bounds = computeHexBoardBounds(hexRoster, hexRadius, defaultOrientation, separationMultiplier, hexRadius);
	const viewBox = `${bounds.minX} ${bounds.minY} ${bounds.width} ${bounds.height}`;

	return <HexboardWrapper
		title="Create Board"
		defaultPageSize={MODULE_DEFAULT_PAGE_SIZE}
		gameGlobals={gameGlobals}
		viewBox={viewBox}
		hexRoster={hexRoster}
		controlPanel={buildControlPanel}
	/>
}