import { Box, Button, Container, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AppWrapper from "../../../common/AppWrapper";
import { PageSizeKey } from "../../../common/pageSizeSettings";
import { palettes } from "../../../common/palettes";
import SidebarSection from "../../../common/SidebarSection";
import RosterDisplay from "../forms/D_HexRoster";
import BoardParameters from "../forms/F_BoardParameters";
import HexboardSVG from "../HexBoardSVG";
import { computeHexBoardBounds } from "../utils/computeBounds";
import { hexDef } from "../utils/hexDefinitions";
import { cube_ring, hexOrientations } from "../utils/hexMath";

const MODULE_DEFAULT_PAGE_SIZE: PageSizeKey = '36x24';

export default function Grid() {
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

	const initialState = {
		hexRadius: 200,
		separationMultiplier: 1.1,
		canvasWidth: 4800,
		canvasHeight: 3600,
		howManyHexes: 9,
		hexRoster: hexRoster,
		qTemp: 0,
		rTemp: 0,
		orientation: "flat-top",
	};

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
			<FormControl id="orientation-control-inner">
				<FormLabel htmlFor="orientation-select">Orientation</FormLabel>
				<select
					id="orientation-select"
					aria-label="Select Orientation"
					title="Select Orientation"
					value={Object.keys(hexOrientations).find((key) => hexOrientations[key as keyof typeof hexOrientations] === defaultOrientation) ?? "pointy-top"}
					onChange={(e) => SETdefaultOrientation(hexOrientations[e.target.value as keyof typeof hexOrientations])}
				>
					{Object.keys(hexOrientations).map((orientation) => <option key={orientation} value={orientation}>{orientation}</option>)}
				</select>
			</FormControl>
		</SidebarSection>
	);

	const addHexControl = (
		<SidebarSection id="add-hex-control" title="Add Hex">
			<Container color={'orange.500'} p={0}>
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
						{colors.map((color) => <option key={`colorChoice-${keyGen++}`} value={color}>{color}</option>)}
					</select>
				</Box>
				<Box id="buttons">
					<Button onClick={() => addHex()}>Add</Button>
				</Box>
			</Container>
		</SidebarSection>
	);

	let keyGen = 0;
	const buildControlPanel = <Box id="control-panel-trivia">
		{controlPalette}
		{orientationControl}
		<BoardParameters
			hexRadius={hexRadius}
			separationMultiplier={separationMultiplier}
			SEThexRadius={SEThexRadius}
			SETseparationMultiplier={SETseparationMultiplier} />
		{addHexControl}
		<RosterDisplay hexRoster={hexRoster} />
	</Box>
	return <AppWrapper title="Grid HexBoard"
		defaultPageSize={MODULE_DEFAULT_PAGE_SIZE}
		initialState={initialState}
		renderSVG={(_state) => {
			const bounds = computeHexBoardBounds(hexRoster, hexRadius, defaultOrientation, separationMultiplier, hexRadius);
			const viewBox = `${bounds.minX} ${bounds.minY} ${bounds.width} ${bounds.height}`;
			return <HexboardSVG
				hexRoster={hexRoster}
				hexRadius={hexRadius}
				separationMultiplier={separationMultiplier}
				orientation={defaultOrientation}
				viewBox={viewBox} />;
		}}
		renderControls={(_state, _setState) => buildControlPanel} />
}