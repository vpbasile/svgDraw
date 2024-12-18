import { Box, Button, Heading, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from "@chakra-ui/react";
import { useState } from "react";
import { coordinateT, myLineT } from "../types";
import './rainbowPrime.css';
import Tree from "./treeGPT";

export default function TreeExample() {
    // Constants
    const canvasSize: number = 1500
    const seed: coordinateT = { x: canvasSize / 2, y: canvasSize / 2 }
    const PI = Math.PI;

    //Settings
    const highestColor: number = 13

    // States
    const [depth, setDepth] = useState<number>(8)
    const [numerator, SETnumerator] = useState<number>(1)
    const root: myLineT = { start: seed, angle: -PI / 2, length: 200, color: 0, width: '21px' };

    // Control Components
    // Button to decrease depth, but not below 2
    const decreaseDepthButton = <Button onClick={() => setDepth(depth - 1 > 1 ? depth - 1 : 2)}>Decrease Depth</Button>
    // Button to increase depth, but not above 8
    const increaseDepthButton = <Button onClick={() => setDepth(depth + 1 < highestColor ? depth + 1 : highestColor)}>Increase Depth</Button>
    // Slider to set numerator {0, 4}
    const setNumeratorSlider = (
        <Slider min={0.25} max={2} step={0.125} value={numerator} onChange={(val: number) => SETnumerator(val)}>
            <SliderTrack>
                <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
        </Slider>
    );
    return <Box border={'2px solid wthie'} height={'100%'}>
        <Box id="control-box" maxWidth={'40vw'}>
            <Box id="depth-controls">
                <Heading as={'h2'}>Depth: {depth}</Heading>
                {decreaseDepthButton}
                {increaseDepthButton}
            </Box>
            <Box id="numerator-controls">
                <Heading as={'h2'}>Angle:{numerator}</Heading>
                {setNumeratorSlider}
            </Box>
        </Box>
        <Box id="canvas-box" maxWidth={'40vw'}>
            <svg height='100vh' viewBox={`0 0 ${canvasSize} ${canvasSize}`}>
                <Tree root={root} delta={numerator * PI / 4} depth={depth} />
            </svg>
        </Box>
    </Box>
}