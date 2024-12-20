
import { Box, Button, Container, Input } from "@chakra-ui/react";
import { useState } from "react";
import Hexboard from "../hexboard/HexBoardSVG";
import HexboardLayout from "../hexboard/HexboardLayout";
import BoardParameters from "../hexboard/forms/BoardParameters";
import CanvasParameters from "../hexboard/forms/CanvasParameters";
import SaveRosterButton from "../hexboard/forms/saveRoster";
import { formAttributes } from "../hexboard/forms/style";
import { gameGlobalsType, hexProps } from "../hexboard/hexDefinitions";
import { clickMessage } from "../hexboard/hexFunctions";
import { cube_ring, hexOrientations } from "../hexboard/hexMath";
import RosterDisplay from "../hexboard/hexRosterDisplay";

export default function CreateBoard() {
	// <> States that control canvas parameters
	const [hexRadius, SEThexRadius] = useState(200);
	const [separationMultiplier, SETseparationMultiplier] = useState(1.1)
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [defaultOrientation, SETdefaultOrientation] = useState(hexOrientations["flat-top"])

	console.log(SETdefaultOrientation)

	// States unique to this board
	const [qTemp, SETqTemp] = useState(0);
	const [rTemp, SETrTemp] = useState(0);
	const cssClassChoices = [
		`just-grid`,
		`bg-white`,
		'bg-red',
		'bg-orange',
		'bg-yellow',
		'bg-green',
		'bg-blue',
		'bg-purple',
	]
	const [classTemp] = useState(cssClassChoices[0])
	// const blankRoster: hexagon[] = []
	const centerHex: hexProps = { q: 0, r: 0, cssClasses: cssClassChoices[0], uid: 0, clickMessage: "Center Hex" }
	let tempRoster: hexProps[] = [centerHex]
	const boardSize: number = 7
	for (let i = 1; i < boardSize; i++) {
		const thisRing = cube_ring(centerHex, i)
		// console.log(`Ring ${i} is ${JSON.stringify(thisRing)}`)
		tempRoster = tempRoster.concat(thisRing);
		// console.log(JSON.stringify(tempRoster))
	}
	tempRoster = tempRoster.map((eachHex) => { eachHex.cssClasses = cssClassChoices[0] + " hover-space"; return eachHex; })
	const [hexRoster, SEThexRoster] = useState<hexProps[]>(tempRoster)

	function addHex() {
		const tempRoster = Array.from(hexRoster)
		tempRoster.push({ q: qTemp, r: rTemp, cssClasses: classTemp, uid: hexRoster.length, clickMessage: `Hex ${hexRoster.length}` })
		SEThexRoster(tempRoster);
	}

	const form = <Container sx={formAttributes} color={'orange.500'}>
		<h3>Add Hex</h3>
		<Box id="setQBox">
			<label className="" htmlFor="qField">q:</label>
			<Input className="form-control" name="qField" defaultValue={qTemp} onChange={(e) => SETqTemp(+e.target.value)} />
		</Box>
		<Box className="setRBox">
			<label className="" htmlFor="rField">r:</label>
			<Input className="form-control" name="rField" defaultValue={rTemp} onChange={(e) => SETrTemp(+e.target.value)} />
		</Box>
		<Box id="chooseClass">
			{/* <ArraySelect
				choicesArray={cssClassChoices}
				onChange={SETclassTemp}
			/> */}
		</Box>
		<Box id="buttons">
			<Button onClick={() => addHex()}>Add</Button>
		</Box>
	</Container>

	const gameGlobals: gameGlobalsType = {
		orientation: defaultOrientation,
		hexRadius: hexRadius,
		separationMultiplier: separationMultiplier,
		textSize: 12,
		drawBackBoard: false,
		onClick: clickMessage
	}

	// <><><> Calculate the size of the canvas based on the hex roster
	const [canvasHeight, SETcanvasHeight] = useState(5600)
	const [canvasWidth, SETcanvasWidth] = useState(9000)
	// Since this is a centered board, we can calculate the origin based on the height and width
	const [hexGridOrigin, SEThexGridOrigin] = useState({ x: 3000, y: 2500 });

	const canvasGlobals = {
		canvasWidth, canvasHeight, hexGridOrigin,
		canvasBackgroundColor: '#000'
	}

	return <HexboardLayout id="createBoard" displayTitle="Create Board"
		forms={[
			<CanvasParameters
				canvasWidth={canvasWidth} SETcanvasWidth={SETcanvasWidth}
				canvasHeight={canvasHeight} SETcanvasHeight={SETcanvasHeight}
				hexGridOrigin={hexGridOrigin} SEThexGridOrigin={SEThexGridOrigin}
			/>,
			<BoardParameters
				hexRadius={hexRadius}
				separationMultiplier={separationMultiplier}
				SEThexRadius={SEThexRadius}
				SETseparationMultiplier={SETseparationMultiplier}
				hexgridOrigin={hexGridOrigin} SEThexGridOrigin={SEThexGridOrigin}
			/>,
			form,
			<SaveRosterButton
				hexRoster={hexRoster}
				gameGlobals={gameGlobals}
			/>,]}
		board={<Hexboard
			hexRoster={hexRoster}
			gameGlobals={gameGlobals}
			canvasGlobals={canvasGlobals} />}
		roster={<RosterDisplay hexRoster={hexRoster} />}
	/>
}