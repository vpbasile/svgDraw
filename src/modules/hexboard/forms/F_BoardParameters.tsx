import { Box, FormControl, FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from "@chakra-ui/react";
import SidebarSection from "../../../components/SidebarSection";

type BoardParametersProps = {
  hexRadius: number;
  separationMultiplier: number;
	hexgridOrigin?: { x: number; y: number };

  SEThexRadius: React.Dispatch<React.SetStateAction<number>>;
  SETseparationMultiplier: React.Dispatch<React.SetStateAction<number>>;
};


export default function BoardParameters(props: BoardParametersProps) {
	const hexRadius = props.hexRadius;
	const separationMultiplier = props.separationMultiplier;
	const SEThexRadius = props.SEThexRadius;
	const SETseparationMultiplier = props.SETseparationMultiplier;

	const key = "BoardParametersBox";
	return (<Box id={key} key={key} p={0}>
		<SidebarSection id="board-parameters" title="Board Parameters">
					<FormControl>
						<FormLabel mb={1}>Hex Radius</FormLabel>
						<NumberInput id="hexRadius" size="sm" value={hexRadius} onChange={(e) => SEThexRadius(+e)}
							min={100} step={5} precision={0}
						>
							<NumberInputField />
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
					</FormControl>

					<FormControl>
						<FormLabel mb={1}>Separation Multiplier</FormLabel>
						<Slider value={separationMultiplier} onChange={(e) => SETseparationMultiplier(+e)}
							step={0.01} min={1} max={2}
						>
							<SliderTrack bg={'gray.200'}>
								<SliderFilledTrack bg={'blue.500'} />
							</SliderTrack >
							<SliderThumb />
						</Slider>
						<Text mt={1} fontSize="xs" color="gray.500">{separationMultiplier.toFixed(2)}</Text>
					</FormControl>
					{/* [ ] Needs the ability to set orientation */}
					{/* <InputGroup>
			<InputLeftAddon children="Orientation" />
			<Select>
				<option value="flat-top">Flat Top</option>
				<option value="pointy-top">Pointy Top</option>
			</Select>
	</InputGroup>
			*/}
		</SidebarSection>
	</Box >)
}