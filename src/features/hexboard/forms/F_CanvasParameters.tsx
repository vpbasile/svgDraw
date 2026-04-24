
import { Box, FormControl, FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text } from "@chakra-ui/react";
import { Dispatch } from "react";
import SidebarSection from "../../../common/SidebarSection";
// import { useState } from 'react';

type myProps = {
	canvasWidth: number,
	SETcanvasWidth: Dispatch<number>,
	canvasHeight: number,
	SETcanvasHeight: Dispatch<number>,
}

// TODO Move this file up a couple levels to the forms directory.  It is not specific to the hexboard.

/**
 * A wrapper component that renders a form for displaying and setting canvas parameters.  It seems silly that I need to pass these to a wrapper component.  Maybe I should remover this layer of abstraction.
 * 
 * @param {myProps} props - The properties passed to the component.
 * @param {number} props.canvasWidth - The current width of the canvas.
 * @param {number} props.canvasHeight - The current height of the canvas.
 * @param {Function} props.SETcanvasWidth - Function to update the canvas width.
 * @param {Function} props.SETcanvasHeight - Function to update the canvas height.
 * 
 * @returns {JSX.Element} The rendered component.
 */
export default function CanvasParameters(props: myProps): JSX.Element {
	const canvasWidth = props.canvasWidth; const canvasHeight = props.canvasHeight;
	const SETcanvasWidth = props.SETcanvasWidth;
	const SETcanvasHeight = props.SETcanvasHeight;

	const key = "CanvasParametersBox";
	return (<Box id={key} key={key} p={0}>
		<SidebarSection id="canvas-params" title="Canvas Parameters">

					<FormControl>
						<FormLabel mb={1}>Width</FormLabel>
						<NumberInput id="canvasWidth" size="sm" value={canvasWidth} min={500} onChange={(e) => SETcanvasWidth(+e)}
							step={50} precision={0}
						>
							<NumberInputField />
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
					</FormControl>

					<FormControl>
						<FormLabel mb={1}>Height</FormLabel>
						<NumberInput id="canvasHeight" size="sm" value={canvasHeight} min={500} onChange={(e) => SETcanvasHeight(+e)}
							step={50} precision={0}
						>
							<NumberInputField />
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
					</FormControl>
					<Text fontSize="sm" color="gray.600">Pixels are used as a relative measure. The image is scaled to fit the viewport.</Text>
		</SidebarSection>
	</Box>)
}