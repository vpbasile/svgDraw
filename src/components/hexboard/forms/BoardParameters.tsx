import { Container, Heading, InputGroup, InputLeftAddon, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { formAttributes } from "./style";

type propsType = {
	hexRadius: number, separationMultiplier: number
	SEThexRadius: Dispatch<SetStateAction<number>>, SETseparationMultiplier: Dispatch<number>,
	hexgridOrigin: { x: number, y: number }, SEThexGridOrigin: Dispatch<{ x: number, y: number }>
}

export default function BoardParameters(props: propsType) {
	const hexRadius = props.hexRadius;
	const separationMultiplier = props.separationMultiplier;
	const SEThexRadius = props.SEThexRadius;
	const SETseparationMultiplier = props.SETseparationMultiplier;
	const hexGridOrigin = props.hexgridOrigin;
	const SEThexGridOrigin = props.SEThexGridOrigin;

	const key = "BoardParametersBox";
	return (<Container id={key} key={key} sx={formAttributes} color={'gray.500'}>
		<Heading>Board Parameters</Heading>
		<InputGroup>
			<InputLeftAddon children="Hex Radius" />
			<NumberInput id="hexRadius" defaultValue={hexRadius} onChange={(e) => SEThexRadius(+e)}
				min={100} step={5} precision={0}
			>
				<NumberInputField />
				<NumberInputStepper>
					<NumberIncrementStepper />
					<NumberDecrementStepper />
				</NumberInputStepper>
			</NumberInput>
		</InputGroup>
		<InputGroup>
			<InputLeftAddon children="Separation Multiplier" />
			<Slider defaultValue={separationMultiplier} onChange={(e) => SETseparationMultiplier(+e)}
				step={0.01} min={1} max={2}
			>
				<SliderTrack bg={'blue.500'}>
					<SliderFilledTrack bg={'gray.500'} />
				</SliderTrack >
				<SliderThumb />
			</Slider>
		</InputGroup>
		<InputGroup>
			<InputLeftAddon children="Hex Grid Origin X" />
			<NumberInput id="hexGridOriginX" defaultValue={hexGridOrigin.x} onChange={(e) => SEThexGridOrigin({ x: +e, y: hexGridOrigin.y })} step={5} precision={0}>
				<NumberInputField />
				<NumberInputStepper>
					<NumberIncrementStepper />
					<NumberDecrementStepper />
				</NumberInputStepper>
			</NumberInput>
		</InputGroup>
		<InputGroup>
			<InputLeftAddon children="Hex Grid Origin Y" />
			<NumberInput id="hexGridOriginY" defaultValue={hexGridOrigin.y} onChange={(e) => SEThexGridOrigin({ x: hexGridOrigin.x, y: +e })} step={5} precision={0}>
				<NumberInputField />
				<NumberInputStepper>
					<NumberIncrementStepper />
					<NumberDecrementStepper />
				</NumberInputStepper>
			</NumberInput>
		</InputGroup>

		{/* Needs the ability to set orientation */}
		{/* <p className="">You'll have to click a selector button above to re-render with the settigns you make on this form.  I'm working on fixing this.</p> */}
	</Container>)
}