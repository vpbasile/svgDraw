import { Box, Button, Container, FormControl, FormLabel, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, Select } from "@chakra-ui/react";
import AppWrapper from "../../../common/AppWrapper";
import { BoardParameters } from "../forms";
import CanvasParameters from "../forms/CanvasParameters";
import RosterDisplay from "../forms/HexRosterDisplay";
import HexBoardSVG from "../HexBoardSVG";
import { hexDef } from "../hexDefinitions";
import { cube_neighbor, hexOrientations } from "../hexMath";

type CandyLandState = {
	hexRadius: number;
	separationMultiplier: number;
	canvasWidth: number;
	canvasHeight: number;
	howManyHexes: number;
	hexRoster: hexDef[];
	qTemp: number;
	rTemp: number;
	colorTemp: string;
	orientation: "flat-top" | "pointy-top";
};

export default function CandyLand() {
	const colors = {
		cherry: "#a02c2cff",
		grape: "#5500d4ff",
		lemon: "#d4aa00ff",
		berry: "#0000d4ff",
		orange: "#d45500ff",
		lime: "#008000ff",
		special: "#d265c0ff"
	};

	function initialRoster(howManyHexes: number): hexDef[] {
		const tempRoster: hexDef[] = [{ q: 0, r: 0, color: colors.cherry, id: 0, hexText: "Start", clickMessage: "Start" }];
		let currentHex = { q: 0, r: 0 };
		let direction = 0;
		let length = 1;
		let spacesSinceSpecial = 0;

		function getNextcolor() {
			const colorArray = Object.values(colors);
			const index = tempRoster.length % colorArray.length;
			return colorArray[index];
		}

		for (let i = 0; i < 15; i++) {
			for (let j = 0; j < length; j++) {
				spacesSinceSpecial++;
				currentHex = cube_neighbor(currentHex, direction);
				const isSpecial = spacesSinceSpecial % howManyHexes === 0;
				tempRoster.push({
					q: currentHex.q,
					r: currentHex.r,
					color: isSpecial ? colors.special : getNextcolor(),
					id: tempRoster.length,
					clickMessage: `Hex ${tempRoster.length}`
				});
			}
			direction = (direction + 1) % 6;
			if ((i + 1) % 3 === 0) length++;
		}
		return tempRoster;
	}

	const initialState: CandyLandState = {
		hexRadius: 200,
		separationMultiplier: 1.1,
		canvasWidth: 4800,
		canvasHeight: 3600,
		howManyHexes: 9,
		hexRoster: initialRoster(9),
		qTemp: 0,
		rTemp: 0,
		colorTemp: colors.cherry,
		orientation: "flat-top",
	};

	// const [state, setState] = useState<CandyLandState>(initialState);

	return (
		<AppWrapper
			title="CandyLand Board"
			initialState={initialState}
			renderSVG={(state) => {
				return (
					<HexBoardSVG
						hexRoster={state.hexRoster}
						hexRadius={state.hexRadius}
						separationMultiplier={state.separationMultiplier}
						orientation={hexOrientations[state.orientation]}
					/>
				);
			}}
			renderControls={(state, setState) => (
				<>
					<CanvasParameters
						canvasWidth={state.canvasWidth} SETcanvasWidth={(v) => setState(s => ({ ...s, canvasWidth: v }))}
						canvasHeight={state.canvasHeight} SETcanvasHeight={(v) => setState(s => ({ ...s, canvasHeight: v }))}
					/>
					<BoardParameters
						hexRadius={state.hexRadius}
						separationMultiplier={state.separationMultiplier}
						SEThexRadius={(v) => setState(s => ({ ...s, hexRadius: typeof v === "function" ? v(s.hexRadius) : v }))}
						SETseparationMultiplier={(v) => setState(s => ({ ...s, separationMultiplier: typeof v === "function" ? v(s.separationMultiplier) : v }))}
					/>
					<FormControl mt={4}>
						<FormLabel>Orientation</FormLabel>
						<Select
							value={state.orientation}
							onChange={(e) => setState(s => ({ ...s, orientation: e.target.value as "flat-top" | "pointy-top" }))}
						>
							<option value="flat-top">Flat Top</option>
							<option value="pointy-top">Pointy Top</option>
						</Select>
					</FormControl>
					<FormControl mt={4}>
						<FormLabel>Spaces between special spaces</FormLabel>
						<NumberInput
							value={state.howManyHexes}
							min={1}
							onChange={(v) => {
								const n = Number(v);
								setState(s => ({ ...s, howManyHexes: n, hexRoster: initialRoster(n) }));
							}}
						>
							<NumberInputField />
							<NumberIncrementStepper />
							<NumberDecrementStepper />
						</NumberInput>
					</FormControl>
					<RosterDisplay hexRoster={state.hexRoster} />
					<Container mt={4}>
						<Box>
							<FormLabel>Add a Hex</FormLabel>
							<Input
								placeholder="q"
								type="number"
								value={state.qTemp}
								onChange={e => setState(s => ({ ...s, qTemp: +e.target.value }))}
							/>
							<Input
								placeholder="r"
								type="number"
								value={state.rTemp}
								onChange={e => setState(s => ({ ...s, rTemp: +e.target.value }))}
							/>
							<Select
								value={state.colorTemp}
								onChange={e => setState(s => ({ ...s, colorTemp: e.target.value }))}
							>
								{Object.entries(colors).map(([name, color], idx) => (
									<option key={idx} value={color}>{name}</option>
								))}
							</Select>
							<Button mt={2} onClick={() => {
								const exists = state.hexRoster.some(h => h.q === state.qTemp && h.r === state.rTemp);
								if (!exists) {
									const newHex = {
										q: state.qTemp,
										r: state.rTemp,
										color: state.colorTemp,
										id: state.hexRoster.length,
										clickMessage: `Hex ${state.hexRoster.length}`
									};
									setState(s => ({ ...s, hexRoster: [...s.hexRoster, newHex] }));
								}
							}}>Add Hex</Button>
						</Box>
					</Container>
				</>
			)}
		/>
	);
}
