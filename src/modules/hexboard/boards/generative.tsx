import { Box, Button, Container, FormControl, FormLabel, InputGroup, InputLeftAddon, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react";
import { useState } from "react";
import AppWrapper from "../../../components/AppWrapper";
import SidebarSection from "../../../components/SidebarSection";
import { PageSizeKey } from "../../../config/pageSizeSettings";
import { palettes } from "../../../config/palettes";
import RosterDisplay from "../forms/D_HexRoster";
import BoardParameters from "../forms/F_BoardParameters";
import HexboardSVG from "../HexBoardSVG";
import { computeHexBoardBounds } from "../hexUtils/computeBounds";
import { hexDef, vector } from "../hexUtils/hexDefinitions";
import { alreadyThere, coord2hex, randomMove } from "../hexUtils/hexFunctions";
import { hexOrientations } from "../hexUtils/hexMath";

const MODULE_DEFAULT_PAGE_SIZE: PageSizeKey = '36x24';

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

	// Stuff for handling color palettes
	function getNextcolor(colors: string[]) {
		const color = colors[colorIndex];
		colorIndex = (colorIndex + 1) % colors.length;
		return color;
	}

	const palettePicker = (
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

	// Interface for changing things

	const buildControlPanel = <Box id="control-panel-generative">
		<SidebarSection id="generative-parameters" title="Generative HexBoard Controls">
			<Container id="reRender" key="reRender" p={0}>
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
		</SidebarSection>
		{palettePicker}
		<BoardParameters
			hexRadius={hexRadius}
			separationMultiplier={separationMultiplier}
			SEThexRadius={SEThexRadius}
			SETseparationMultiplier={SETseparationMultiplier} />
		<RosterDisplay hexRoster={hexRoster} />
	</Box>

	return <AppWrapper title="Generative HexBoard"
		defaultPageSize={MODULE_DEFAULT_PAGE_SIZE}
		initialState={undefined}
		renderSVG={() => {
			const bounds = computeHexBoardBounds(hexRoster, hexRadius, defaultOrientation, separationMultiplier, hexRadius);
			const viewBox = `${bounds.minX} ${bounds.minY} ${bounds.width} ${bounds.height}`;
			return (
				<HexboardSVG
					hexRoster={hexRoster}
					hexRadius={hexRadius}
					separationMultiplier={separationMultiplier}
					orientation={defaultOrientation}
					viewBox={viewBox}
				/>
			);
		}}
		renderControls={() => buildControlPanel}
	/>
}