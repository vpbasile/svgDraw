import { Box, Container, InputGroup, InputLeftAddon, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react";
import { useState } from "react";
import BoardParameters from "../forms/BoardParameters";
import CanvasParameters from "../forms/CanvasParameters";
import RosterDisplay from "../forms/hexRosterDisplay";
import HexboardSVG from "../HexBoardSVG";
import { gameGlobalsType, hexDef, vector } from "../hexDefinitions";
import { alreadyThere, coord2hex, randomMove } from "../hexFunctions";
import { hexOrientations } from "../hexMath";

export default function GenerativeBoard() {
	// <> States that control canvas parameters
	const [hexRadius, SEThexRadius] = useState(200);
	const [separationMultiplier, SETseparationMultiplier] = useState(1.1)
	const [defaultOrientation] = useState(hexOrientations["flat-top"])
	const [canvasHeight, SETcanvasHeight] = useState(3600)
	const [canvasWidth, SETcanvasWidth] = useState(3600)

	const [numberOfSpaces, SETnumberOfSpaces] = useState(50);
	const [hexRoster, SEThexRoster] = useState(newRoster())

	// Randomize color assignment so that 1/3 hexes are green
	function mapColor(): string {
		const rando = randomInt(25)
		if (rando === 1) return "green"
		// if (rando === 2) return "red"
		else return "blue"
	}

	function randomInt(int: number): number {
		return Math.floor(int * Math.random())
	}

	function newRoster(): hexDef[] {
		const tempHexList: hexDef[] = []
		let q = 0;
		let r = 0;
		tempHexList.push({
			q: 0, r: 0, color: mapColor(),
			id: 0,
			clickMessage: ""
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
			tempHexList.push(coord2hex({ q, r }, mapColor(), i))
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
						onChange={(e) => { SETnumberOfSpaces(+e); SEThexRoster(newRoster()); } } step={1} precision={0}>
						<NumberInputField />
						<NumberInputStepper>
							<NumberIncrementStepper />
							<NumberDecrementStepper />
						</NumberInputStepper>
					</NumberInput>
				</InputGroup>
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