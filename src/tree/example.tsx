import { Box, Button, Heading, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from "@chakra-ui/react";
import { useState } from "react";
import { coordinateT, myLineT } from "../types";
import Tree from "./tree";

export default function TreeExample() {
    // Constants
    const canvasSize: number = 1500
    const seed: coordinateT = { x: canvasSize / 2, y: canvasSize / 2 }

    //Settings
    const maxDepth: number = 13

    // States
    const [depth, setDepth] = useState<number>(8)
    const [numerator, SETnumerator] = useState<number>(0)
    const root: myLineT = { start: seed, angle: 0, length: 200, color: 0, width: '21px' };
    const rootPrime: myLineT = { start: seed, angle: -Math.PI, length: 200, color: 0, width: '21px' };

    // Control Components
    // Button to decrease depth, but not below 2
    const decreaseDepthButton = <Button onClick={() => setDepth(depth - 1 > 1 ? depth - 1 : 2)}>Decrease Depth</Button>
    // Button to increase depth, but not above 8
    const increaseDepthButton = <Button onClick={() => setDepth(depth + 1 < maxDepth ? depth + 1 : maxDepth)}>Increase Depth</Button>
    // Slider to set numerator {0, 4}
    const setNumeratorSlider = (
        <Slider min={-4} max={4} step={Math.PI/12} value={numerator} onChange={(val: number) => SETnumerator(val)}>
            <SliderTrack>
                <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
        </Slider>
    );
    return <Box border={'2px solid wthie'} height={'100%'}>
        <Box id="control-box">
            <Box id="depth-controls">
                <Heading as={'h2'}>Depth: {depth}</Heading>
                {decreaseDepthButton}
                {increaseDepthButton}
            </Box>
            <Box id="numerator-controls">
                <Heading as={'h2'}>Angle:</Heading>
                {setNumeratorSlider}
            </Box>
        </Box>
        <svg height='100vh' viewBox={`0 0 ${canvasSize} ${canvasSize}`}>
            <Tree root={root} delta={numerator * Math.PI / 4} depth={depth} />
            <Tree root={rootPrime} delta={numerator * Math.PI / 4} depth={depth} />
        </svg>
    </Box>
}