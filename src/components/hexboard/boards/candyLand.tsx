import { Box, Button, Container, FormControl, FormLabel, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, Select } from "@chakra-ui/react";
import { useState } from "react";
import BoardParameters from "../forms/BoardParameters";
import CanvasParameters from "../forms/CanvasParameters";
import RosterDisplay from "../forms/hexRosterDisplay";
import HexboardSVG from "../HexBoardSVG";
import { canvasGlobalsType, coordinateHex, direction, gameGlobalsType, hexDef } from "../hexDefinitions";
import { clickMessage } from "../hexFunctions";
import { cube_neighbor, hexOrientations } from "../hexMath";

export default function CandyLand() {
	// Notes:
	// The CandyLand board has six colors in a specific order: red, purple, yellow, blue, orange, green
	// There are about 80 spaces on the board
	// I'm thinking of making the board a spiral instead of the wavy line that it is in the board game

	const colors = {
		cherry: "#a02c2cff",
		// grape: "#8a2be2ff",
		grape: "#5500d4ff",
		lemon: "#d4aa00ff",
		berry: "#0000d4ff",
		orange: "#d45500ff",
		lime: "#008000ff",
		special: "#d265c0ff"
	}
	// FIXME The exported SVG is not rendering the colors correctly.

	// const numberOfSpaces = 20

	// <> States that control canvas parameters
	const [hexRadius, SEThexRadius] = useState(200);
	const [separationMultiplier, SETseparationMultiplier] = useState(1.1)
	const [canvasHeight, SETcanvasHeight] = useState(3600)
	const [canvasWidth, SETcanvasWidth] = useState(4800)
	// Constants, States, and Functions unique to this board
	const [howManyHexes, SEThowManyHexes] = useState(9)

	let colorIndex = 0;
	function getNextcolor() {
		const colorArray = Object.values(colors)
		const color = colorArray[colorIndex]
		colorIndex = (colorIndex + 1) % colorArray.length
		return color
	}

	// States unique to this board
	const [qTemp, SETqTemp] = useState(0);
	const [rTemp, SETrTemp] = useState(0);
	const [colorTemp, SETcolorTemp] = useState(getNextcolor());

	// Define a color for the genreated hexes - 50% gray with 50% opacity
	// const blankColor = "rgba(128, 128, 128, 0.5)"

	// <><><> Step 1: Create the hex roster
	const centerHex: hexDef = { q: 0, r: 0, color: colors.cherry, id: 0, hexText: "Start", clickMessage: "Start" }
	const tempRoster: hexDef[] = [centerHex]

	// Generative roster
	// Make a spiral of spaces until you've reached the total number of spaces
	// To make the spiral, we'll move in a direction for a certain number of spaces, then change direction.  Every third direction change, we'll increase the number of spaces moved in that direction by 1.
	let currentHex: coordinateHex = { q: 0, r: 0 }
	let currentDirection: direction = 0
	// Add a new neighbor to the last hex in the current direction.

	/**
	 * growLine
	 *
	 * Grows a line of hexes starting from a seed hex in a specified direction for a given number of spaces.
	 * 
	 *
	 * @param {coordinateHex} seed - The starting hex coordinate.
	 * @param {direction} direction - The direction in which to grow the line.
	 * @param {number} spaces - The number of spaces to grow the line.
	 * @returns {coordinateHex} - The final hex coordinate after growing the line.
	 * @sideeffect - Adds the new hexes to the tempRoster.
	 */
	function growLine(seed: coordinateHex, direction: direction, spaces: number): coordinateHex {
		let currentHex = seed
		for (let i = 0; i < spaces; i++) {
			spacesSinceSpecial++
			currentHex = cube_neighbor(currentHex, direction)
			if (spacesSinceSpecial > 0 && spacesSinceSpecial % howManyHexes === 0) {
				spacesSinceSpecial = 0
				tempRoster.push({ q: currentHex.q, r: currentHex.r, color: colors.special, id: tempRoster.length, clickMessage: `Special Hex ${tempRoster.length}` })
			} else {
				tempRoster.push({ q: currentHex.q, r: currentHex.r, color: getNextcolor(), id: tempRoster.length, clickMessage: `Hex ${tempRoster.length}` })
			}
		}
		return currentHex
	}

	// Define the number of steps and the initial length of the line
	let length = 1;

	let spacesSinceSpecial = 0
	for (let i = 0; i < 15; i++) {
		currentHex = growLine(currentHex, currentDirection, length);
		currentDirection = (currentDirection + 1) % 6 as direction;
		if ((i + 1) % 3 === 0) {
			length++;
		}
	}
	// console.log('Hex Count:', tempRoster.length)

	const [hexRoster, SEThexRoster] = useState<hexDef[]>(tempRoster)

	// Handle adding a hex to the roster.  Return the coordinates of the final hex in the line
	// TODO Add a safer addHex function that checks to see if the hex's position is alrerady occupied, log an error, and skip the new hex if it is.
	// * @sideeffect - Adds the new hexes to the tempRoster.
	//  */
	function addHex() {
		const tempRoster = Array.from(hexRoster)
		const isOccupied = tempRoster.some(hex => hex.q === qTemp && hex.r === rTemp)
		if (isOccupied) {
			console.error(`Hex at position q: ${qTemp}, r: ${rTemp} is already occupied.`)
			return
		}
		tempRoster.push({ q: qTemp, r: rTemp, color: colorTemp, id: hexRoster.length, clickMessage: `Hex ${hexRoster.length}` })
		SEThexRoster(tempRoster)
	}

	// <><><> Step 2: Create the control panel
	let keyGen = 0;
	const buildControlPanel = <Box id="control-panel-candyLand">
		{/* Canvas Parameters */}
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
		{/* A control for setting howManyHexes */}
		<Box id="howManyHexes-control">
			<FormControl id="howManyHexes-form">
				<FormLabel >Space between special spaces</FormLabel>
				<NumberInput>
					<NumberInputField value={howManyHexes} onChange={(e) => SEThowManyHexes(+e.target.value)} />
						<NumberIncrementStepper />
						<NumberDecrementStepper />
				
				</NumberInput>
			</FormControl>
			<RosterDisplay hexRoster={hexRoster} />
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
						{Object.keys(colors).map((color) => <option key={keyGen++} value={colors[color as keyof typeof colors]}>{color}</option>)}
					</Select>
				</Box>
				<Box id="buttons">
					<Button onClick={() => addHex()}>Add</Button>
				</Box>
			</Container>
		</Box>
	</Box>

	const gameGlobals: gameGlobalsType = {
		displayTitle: "Create Board",
		orientation: hexOrientations["flat-top"],
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