import { Box, Button, Container, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { palettes } from "../../../components/palettes";
import BoardParameters from "../forms/BoardParameters";
import CanvasParameters from "../forms/CanvasParameters";
import RosterDisplay from "../forms/hexRosterDisplay";
import HexboardSVG from "../HexBoardSVG";
import { canvasGlobalsType, gameGlobalsType, hexDef } from "../hexDefinitions";
import { cube_ring, hexOrientations } from "../hexMath";

export default function Grid() {
	// <> States that control canvas parameters
	const [hexRadius, SEThexRadius] = useState(200);
	const [separationMultiplier, SETseparationMultiplier] = useState(1.1)
	const [canvasHeight, SETcanvasHeight] = useState(3600)
	const [canvasWidth, SETcanvasWidth] = useState(3600)
	const [defaultOrientation, SETdefaultOrientation] = useState(hexOrientations["pointy-top"])	
	// Constants, States, and Functions unique to this board
	// <> This color stuff is reusable across all boards
	const [selectedPalette, setSelectedPalette] = useState<string>('trivia');
	const [colors, setColors] = useState(palettes[selectedPalette]);

	useEffect(() => {
		setColors(palettes[selectedPalette]);
	}, [selectedPalette]);

	let colorIndex = 0;
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
	// Define a color for the genreated hexes - 50% gray with 50% opacity
	const blankColor = "rgba(128, 128, 128, 0.5)"
	const boundary = cube_ring({ q: 0, r: 0 }, 4)
	const tempRoster: hexDef[] = boundary.map((hex, index) => {
		return { q: hex.q, r: hex.r, color: blankColor, id: index, clickMessage: `Hex ${index}` }
	})
	
	console.log('Hex Count:', tempRoster.length)
	const [hexRoster, SEThexRoster] = useState<hexDef[]>(tempRoster)

	// Handle adding a hex to the roster
	function addHex() {
		const tempRoster = Array.from(hexRoster)
		tempRoster.push({ q: qTemp, r: rTemp, color: colorTemp, id: hexRoster.length, clickMessage: `Hex ${hexRoster.length}` })
		SEThexRoster(tempRoster);
	}

	// <><><> Step 2: Create the control panel

	const controlPalette = <FormControl id="palette-control">
		<FormLabel>Color Palette</FormLabel>
		{Object.keys(palettes).map((paletteKey) => (
			<FormControl key={paletteKey} display="flex" alignItems="center">
				<FormLabel htmlFor={paletteKey} mb="0">
					{paletteKey.charAt(0).toUpperCase() + paletteKey.slice(1)}
				</FormLabel>
				<input
					type="radio"
					id={paletteKey}
					name="palette"
					value={paletteKey}
					checked={selectedPalette === paletteKey}
					onChange={(e) => setSelectedPalette(e.target.value)}
				/>
			</FormControl>
		))}
	</FormControl>;

	const orientationControl = <FormControl id="orientation-control">
		<FormLabel>Orientation</FormLabel>
		<Select  onChange={(e) => SETdefaultOrientation(hexOrientations[e.target.value as keyof typeof hexOrientations])}>
			{Object.keys(hexOrientations).map((orientation) => <option key={orientation} value={orientation}>{orientation}</option>)}
		</Select>
	</FormControl>;

	let keyGen = 0;
	const buildControlPanel = <Box id="control-panel-trivia">
		{/* Select Palette */}
		{controlPalette}
		{/* Canvas Parameters */}
		<Box id="control-panel-trivia">
			{orientationControl}
			{controlPalette}
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
		<Container color={'orange.500'}>
			<h3>Add Hex</h3>
			<Box id="setQBox">
				<label className="" htmlFor="qField">q:</label>
				<Input className="form-control" name="qField" defaultValue={qTemp} onChange={(e) => SETqTemp(+e.target.value)} />
			</Box>
			<Box className="setRBox">
				<label className="" htmlFor="rField">r:</label>
				<Input className="form-control" name="rField" defaultValue={rTemp} onChange={(e) => SETrTemp(+e.target.value)} />
			</Box>
			<Box id="chooseColor">
				<Select id="colorSelect" defaultValue={colorTemp} onChange={(e) => SETcolorTemp(e.target.value)}>
					{colors.map((color) => <option key={`colorChoice-${keyGen++}`} value={color}>{color}</option>)}
				</Select>
			</Box>
			<Box id="buttons">
				<Button onClick={() => addHex()}>Add</Button>
			</Box>
		</Container>
		<RosterDisplay hexRoster={hexRoster} />
	</Box>

	const gameGlobals: gameGlobalsType = {
		displayTitle: "Create Board",
		orientation: defaultOrientation,
		hexRadius: hexRadius,
		separationMultiplier: separationMultiplier,
		textSize: 12,
		drawBackBoard: false,
	}

	const canvasGlobals: canvasGlobalsType = {
		canvasWidth: canvasWidth,
		canvasHeight: canvasHeight,
	}

	return <HexboardSVG gameGlobals={gameGlobals} canvasGlobals={canvasGlobals} hexRoster={hexRoster}
		controlPanel={buildControlPanel}
	/>
}