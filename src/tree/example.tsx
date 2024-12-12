import { Box, Button, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { colorOrder } from "../module-svgDraw/constants";
import { coordinateT, myLineT } from "../types";
import Tree from "./tree";

export default function TreeExample() {
    // Constants
    const canvasSize: number = 1500
    const seed: coordinateT = { x: canvasSize / 2, y: canvasSize / 2 }
    const root: myLineT = { start: seed, angle: 6 * Math.PI / 4, length: 200, color: colorOrder[0], width: '21px' };
    // const rootMirror: myLineT = { start: seed, angle: -Math.PI / 4, length: 200, color: colorOrder[5], width: '21px' };

    // States
    const [depth, setDepth] = useState<number>(8)

    // Components
    // Button to decrease depth, but not below 2
    const decreaseDepthButton = <Button onClick={() => setDepth(depth - 1 > 1 ? depth - 1 : 2)}>Decrease Depth</Button>
    // Button to increase depth, but not above 8
    const increaseDepthButton = <Button onClick={() => setDepth(depth + 1 < 8 ? depth + 1 : 8)}>Increase Depth</Button>

    return <Box border={'2px solid wthie'} height={'100%'}>
        <Box>
            <Heading as={'h2'}>Depth: {depth}</Heading>
            {decreaseDepthButton}
            {increaseDepthButton}
        </Box>
        <svg height='100vh' viewBox={`0 0 ${canvasSize} ${canvasSize}`}>
            <Tree root={root} depth={depth} />
        </svg>
    </Box>
}