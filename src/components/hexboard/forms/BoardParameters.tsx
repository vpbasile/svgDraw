import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Container, InputGroup, InputLeftAddon, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

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

	const key = "BoardParametersBox";
	return (<Container id={key} key={key} color={'gray.500'}>
		<Accordion id={'hex-roster'} allowMultiple>
			<AccordionItem id='roster'>
				<AccordionButton>Board Parameters<AccordionIcon /></AccordionButton>
				<AccordionPanel>
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
					{/* TODO Needs the ability to set orientation */}
					{/* <InputGroup>
			<InputLeftAddon children="Orientation" />
			<Select>
				<option value="flat-top">Flat Top</option>
				<option value="pointy-top">Pointy Top</option>
			</Select>
	</InputGroup>
			*/}
				</AccordionPanel>
			</AccordionItem>
		</Accordion>
	</Container >)
}