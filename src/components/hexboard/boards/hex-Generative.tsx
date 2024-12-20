import { useState } from "react";
import Hexboard from "../hexboard/HexBoardSVG";

import { gameGlobalsType, hexagon, vector } from "../hexboard/hexDefinitions";
import { alreadyThere, clickMessage, randomMove } from "../hexboard/hexFunctions";

import { Container, InputGroup, InputLeftAddon, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react";
import HexboardLayout from "../hexboard/HexboardLayout";
import BoardParameters from "../hexboard/forms/BoardParameters";
import CanvasParameters from "../hexboard/forms/CanvasParameters";
import SaveRosterButton from "../hexboard/forms/saveRoster";
import { formAttributes } from "../hexboard/forms/style";
import { calcCenteredRectangle, hexOrientations } from "../hexboard/hexMath";
import RosterDisplay from "../hexboard/hexRosterDisplay";
import aspectRatio from "../hexboard/rectMath";

export default function GenerativeBoard() {
	// <> States that control canvas parameters
	const [hexRadius, SEThexRadius] = useState(200);
	const [separationMultiplier, SETseparationMultiplier] = useState(1.1)
	const [defaultOrientation] = useState(hexOrientations["flat-top"])

	const [numberOfSpaces, SETnumberOfSpaces] = useState(50);
	const [hexRoster, SEThexRoster] = useState(newRoster())

	// Randomize color assignment so that 1/3 hexes are green
	function mapColor(): string {
		const rando = randomInt(25)
		if (rando === 1) return "bg-green"
		// if (rando === 2) return "bg-red"
		else return "bg-blue"
	}

	function randomInt(int: number): number {
		return Math.floor(int * Math.random())
	}

	function colorHexes(hexes: hexagon[]) {
		hexes.forEach(hex => { if (hex.cssClasses === undefined) hex.cssClasses = `hover-space ${mapColor()}` })
	}

	function newRoster(): hexagon[] {
		const tempHexList: hexagon[] = []
		let q = 0;
		let r = 0;
		tempHexList.push({ q: 0, r: 0, cssClasses: "hover-space bg-white" })
		for (let i = 0; i < numberOfSpaces; i++) {
			let found = false;
			const nextMove: vector = randomMove()
			// Prevent overlap
			while (!found) {
				q += nextMove.q;
				r += nextMove.r;
				found = !alreadyThere({ q, r }, tempHexList)
			}
			tempHexList.push({ q, r })
		}
		// Give the hexes some color
		colorHexes(tempHexList);
		return tempHexList;
	}

	// Interface for changing things

	const editForm =
		<Container id="reRender" key="reRender" sx={formAttributes}>
			{/* <h3>Generation Parameters</h3> */}
			<InputGroup><InputLeftAddon children="Number of cells" />
				<NumberInput id="cellCount" defaultValue={numberOfSpaces} min={2}
					onChange={(e) => { SETnumberOfSpaces(+e); SEThexRoster(newRoster()) }} step={1} precision={0} >
					<NumberInputField />
					<NumberInputStepper>
						<NumberIncrementStepper />
						<NumberDecrementStepper />
					</NumberInputStepper>
				</NumberInput>
			</InputGroup>
		</Container>

	const gameGlobals: gameGlobalsType = {
		orientation: defaultOrientation,
		hexRadius: hexRadius,
		separationMultiplier: separationMultiplier,
		textSize: 12,
		drawBackBoard: false,
		onClick: clickMessage,
	}
	// <><><> Calculate the size of the canvas based on the hex roster
	const canvasDefaults = calcCenteredRectangle(hexRoster, gameGlobals)
	const [canvasHeight, SETcanvasHeight] = useState(canvasDefaults.canvasHeight * separationMultiplier)
	const [canvasWidth, SETcanvasWidth] = useState(canvasHeight * aspectRatio())
	// Since this is a centered board, we can calculate the origin based on the height and width
	const [hexGridOrigin, SEThexGridOrigin] = useState({ x: canvasWidth / 2, y: canvasHeight / 2 });

	const canvasGlobals = {
		canvasWidth, canvasHeight, hexGridOrigin,
		canvasBackgroundColor: '#000'
	}

	return <HexboardLayout id="generative" displayTitle="Generative Map"
		forms={[<CanvasParameters
			canvasWidth={canvasWidth} SETcanvasWidth={SETcanvasWidth}
			canvasHeight={canvasHeight} SETcanvasHeight={SETcanvasHeight}
			hexGridOrigin={hexGridOrigin} SEThexGridOrigin={SEThexGridOrigin}
		/>,
		<BoardParameters
			hexRadius={hexRadius}
			separationMultiplier={separationMultiplier}
			SEThexRadius={SEThexRadius}
			SETseparationMultiplier={SETseparationMultiplier}
			hexgridOrigin={hexGridOrigin} SEThexGridOrigin={SEThexGridOrigin} />,
			editForm,
		<SaveRosterButton
			hexRoster={hexRoster}
			gameGlobals={gameGlobals}
		/>,
		]} board={<Hexboard hexRoster={hexRoster} gameGlobals={gameGlobals} canvasGlobals={canvasGlobals} />}
		roster={<RosterDisplay hexRoster={hexRoster} />} />
}