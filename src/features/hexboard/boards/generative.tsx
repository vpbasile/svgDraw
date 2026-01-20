import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Container, FormControl, FormLabel, InputGroup, InputLeftAddon, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react";
import { useState } from "react";
import AppWrapper from "../../../common/AppWrapper";
import { palettes } from "../../../components/palettes";
import RosterDisplay from "../forms/D_HexRoster";
import BoardParameters from "../forms/F_BoardParameters";
import CanvasParameters from "../forms/F_CanvasParameters";
import HexboardSVG from "../HexBoardSVG";
import { Bounds } from "../utils/computeBounds";
import { hexDef, vector } from "../utils/hexDefinitions";
import { alreadyThere, coord2hex, randomMove } from "../utils/hexFunctions";
import { hexOrientations } from "../utils/hexMath";

export default function GenerativeBoard() {

	// I dunno what to call these states
	let colorIndex = 0;
	// <> States that control canvas parameters
	const [hexRadius, SEThexRadius] = useState(100);
	const [separationMultiplier, SETseparationMultiplier] = useState(1.1)
	const [defaultOrientation] = useState(hexOrientations["flat-top"])

	// States for the board generation
	const [numberOfSpaces, SETnumberOfSpaces] = useState(50);
	const [selectedPalette, setSelectedPalette] = useState<string>('coolToWarm');
	const colors = palettes[selectedPalette]
	// Generate the roster of hexes
	const [hexRoster, SEThexRoster] = useState(newRoster(numberOfSpaces, colors))

	function newRoster(numberOfSpaces: number, colors: string[]): hexDef[] {
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

	// Compute canvas size based on parameters
	const initBounds: Bounds = {
		minX: 0,
		minY: 0,
		width: 1900,
		height: 1900
	}

	const [canvasHeight, SETcanvasHeight] = useState(initBounds.height)
	const [canvasWidth, SETcanvasWidth] = useState(initBounds.width)


	// Stuff for handling color palettes
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

	// Interface for changing things

	const buildControlPanel = <Box id="control-panel-generative">
		{/* Canvas Parameters */}
		<Accordion id="control-panel-generative">
			<AccordionItem id="generative-parameters">
				<AccordionButton>Generative HexBoard Controls<AccordionIcon /></AccordionButton>
				<AccordionPanel>
					<Container id="reRender" key="reRender">
						{/* <h3>Generation Parameters</h3> */}
						<InputGroup><InputLeftAddon children="Number of cells" />
							<NumberInput id="cellCount" defaultValue={numberOfSpaces} min={2}
								onChange={(e) => { SETnumberOfSpaces(+e); SEThexRoster(newRoster(+e, colors)); }} step={1} precision={0}>
								<NumberInputField />
								<NumberInputStepper>
									<NumberIncrementStepper />
									<NumberDecrementStepper />
								</NumberInputStepper>
							</NumberInput>
						</InputGroup>
						<Button onClick={() => SEThexRoster(newRoster(numberOfSpaces, colors))}>Shuffle</Button>
					</Container>
					<Container id="paletteSelect" key={"paletteSelect"}>
						{/* Color Palette Control */}
						{PalettePicker}
					</Container>
				</AccordionPanel>
			</AccordionItem>
			<CanvasParameters
				// Canvas-specific parameters
				canvasWidth={canvasWidth} SETcanvasWidth={SETcanvasWidth}
				canvasHeight={canvasHeight} SETcanvasHeight={SETcanvasHeight} />
			<BoardParameters
				// Hexagonally-specific parameters
				hexRadius={hexRadius}
				separationMultiplier={separationMultiplier}
				SEThexRadius={SEThexRadius}
				SETseparationMultiplier={SETseparationMultiplier} />
		</Accordion>
		<RosterDisplay hexRoster={hexRoster} />
	</Box>

	return <AppWrapper title="Generative HexBoard"
		initialState={undefined}
		renderSVG={() => (
			<HexboardSVG
				hexRoster={hexRoster}
				hexRadius={hexRadius}
				separationMultiplier={separationMultiplier}
				orientation={defaultOrientation}
				viewBox={`${-canvasWidth / 2} ${-canvasHeight / 2} ${canvasWidth} ${canvasHeight}`}
			/>
		)}
		renderControls={() => buildControlPanel}
	>
	</AppWrapper>
}