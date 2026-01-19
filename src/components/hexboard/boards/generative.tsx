import { Box, Button, Container, FormControl, FormLabel, InputGroup, InputLeftAddon, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react";
import { useState } from "react";
import { palettes } from "../../palettes";
import BoardParameters from "../forms/BoardParameters";
import CanvasParameters from "../forms/CanvasParameters";
import RosterDisplay from "../forms/hexRosterDisplay";
import HexboardSVG from "../HexBoardSVG";
import { gameGlobalsType, hexDef, vector } from "../hexDefinitions";
import { alreadyThere, coord2hex, randomMove } from "../hexFunctions";
import { hexOrientations } from "../hexMath";

export default function GenerativeBoard() {
	// <> States that control canvas parameters
	const [hexRadius, SEThexRadius] = useState(100);
	const [separationMultiplier, SETseparationMultiplier] = useState(1.1)
	const [defaultOrientation] = useState(hexOrientations["flat-top"])
	const [canvasHeight, SETcanvasHeight] = useState(3600)
	const [canvasWidth, SETcanvasWidth] = useState(4800)
	const [selectedPalette, setSelectedPalette] = useState<string>('coolToWarm');
	const colors = palettes[selectedPalette]

	const [numberOfSpaces, SETnumberOfSpaces] = useState(50);

	// Stuff for handling color palettes
	let colorIndex = 0;
	function getNextcolor(colors: string[]) {
		const color = colors[colorIndex];
		colorIndex = (colorIndex + 1) % colors.length;
		return color;
	}

	const PalettePicker = <FormControl id="palette-control">
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

	const [hexRoster, SEThexRoster] = useState(newRoster())

	function newRoster(): hexDef[] {
		let count = 0;
		const tempHexList: hexDef[] = []
		let q = 0;
		let r = 0;
		tempHexList.push({
			q: 0, r: 0, color: getNextcolor(colors),
			id: 0,
			clickMessage: "",
			hexText: `0`
		})
		for (let i = 0; i < numberOfSpaces; i++) {
			let found = false;
			const nextMove: vector = randomMove()
			// Prevent overlap
			while (!found) {
				q += nextMove.q;
				r += nextMove.r;
				found = !alreadyThere({ q, r }, tempHexList)
			}
			const thisHex = coord2hex({ q, r }, getNextcolor(colors), i);
			thisHex.hexText = `${++count}`
			tempHexList.push(thisHex)
		}
		// Give the hexes some color
		return tempHexList;
	}

	// Interface for changing things


	const buildControlPanel = <Box id="control-panel-generative">
		{/* Canvas Parameters */}
		<Box id="control-panel-generative">
			<Container id="reRender" key="reRender">
				{/* <h3>Generation Parameters</h3> */}
				<InputGroup><InputLeftAddon children="Number of cells" />
					<NumberInput id="cellCount" defaultValue={numberOfSpaces} min={2}
						onChange={(e) => { SETnumberOfSpaces(+e); SEThexRoster(newRoster()); }} step={1} precision={0}>
						<NumberInputField />
						<NumberInputStepper>
							<NumberIncrementStepper />
							<NumberDecrementStepper />
						</NumberInputStepper>
					</NumberInput>
				</InputGroup>
				<Button onClick={() => SEThexRoster(newRoster())}>Shuffle</Button>
			</Container>
			<Container id="paletteSelect" key={"paletteSelect"}>
				{/* Color Palette Control */}
				{PalettePicker}
			</Container>
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
		orientation: defaultOrientation,
		hexRadius: hexRadius,
		separationMultiplier: separationMultiplier,
		textSize: 12,
		drawBackBoard: false,
		displayTitle: "Generative Map"
	}

	const canvasGlobals = {
		canvasWidth, canvasHeight,
	}

	return <HexboardSVG gameGlobals={gameGlobals} canvasGlobals={canvasGlobals} hexRoster={hexRoster} controlPanel={buildControlPanel} />
}