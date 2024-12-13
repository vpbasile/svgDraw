import { Box, Button, Center, Collapse, Flex, FormControl, FormLabel, Heading, Input, Select, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { SetStateAction, useRef, useState } from "react";
import { coordinateT, myLineT } from "../../types";
import ColorModeButton from "../colorModeButton";
import { drawLine, rotateLinesAroundPoint } from "../helpers";
import { palettes } from "../palettes"; // Import the palettes
import Tree from "./treeGPT";

export default function TreeExample() {
    // Constants
    const canvasSize: number = 1500
    const seed: coordinateT = { x: canvasSize / 2, y: canvasSize / 2 }
    const PI = Math.PI;

    // States
    const [depth, setDepth] = useState<number>(8);
    const [numberOfTrees, setNumberOfTrees] = useState<number>(3);
    const [numerator, SETnumerator] = useState<number>(1);
    const [fileName, setFileName] = useState<string>('tree');
    const [selectedPalette, setSelectedPalette] = useState<string>('default');
    const root: myLineT = { start: seed, angle: -PI / 2, length: 200, width: '21px', z: 0 };
    const highestColor: number = Object.keys(palettes[selectedPalette]).length - 1;

    // Reference to the SVG element
    const svgRef = useRef<SVGSVGElement>(null);

    // Disclosure for collapsible control panel
    const { isOpen, onToggle } = useDisclosure();

    // Function to save SVG as a file
    const saveSvgAsFile = () => {
        if (svgRef.current) {
            const svgElement = svgRef.current;
            const serializer = new XMLSerializer();
            const svgString = serializer.serializeToString(svgElement);
            const blob = new Blob([svgString], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${fileName}.svg`; // File name
            a.click();
            URL.revokeObjectURL(url); // Clean up the URL object
        }
    };

    // Control Components
    const decreaseDepthButton = (
        <Button
            onClick={() => setDepth(depth - 1 > 1 ? depth - 1 : 2)}
        >
            Decrease Depth
        </Button>
    );
    const increaseDepthButton = (
        <Button
            onClick={() => setDepth(depth + 1 < highestColor ? depth + 1 : highestColor)}
        >
            Increase Depth
        </Button>
    );
    const setNumeratorSlider = (
        <Slider
            min={0.25}
            max={2}
            step={0.125}
            value={numerator}
            onChange={(val: number) => SETnumerator(val)}
        >
            <SliderTrack>
                <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
        </Slider>
    );
    const fileNameField = <Input placeholder={fileName} onChange={(e: { target: { value: SetStateAction<string>; }; }) => setFileName(e.target.value)} />
    const treeCountSelector = <>
        <FormLabel>Number of Trees</FormLabel>
        <Stack direction="row">
            {[1, 2, 3, 4, 5, 6].map((num) => (
                <Button
                    key={num}
                    onClick={() => setNumberOfTrees(num)}
                    colorScheme={numberOfTrees === num ? "teal" : "gray"}
                >
                    {num}
                </Button>
            ))}
        </Stack>
    </>

    // Generate the trees
    const original = Tree(root, (numerator * PI) / 4, depth, palettes[selectedPalette]);
    // Sort the trees by z-index so that lower trees are drawn first
    const allTrees = original;
    // Generate siblings if necessary
    if (numberOfTrees > 1) {

        for (let i = 1; i < numberOfTrees; i++) {
            const sibling = rotateLinesAroundPoint(original, i * 2 * PI / numberOfTrees, seed);
            // Add all menmbers of the sibling to the allTrees array
            sibling.forEach((line) => allTrees.push(line));
        }
    }

    // Now that all the lines are finally figured out, sort them by z-index
    allTrees.sort((a, b) => a.z - b.z);

    // const sibling1 = rotateLinesAroundPoint(original, 2 * PI / numberOfTrees, seed);
    // const sibling2 = rotateLinesAroundPoint(original, -2 * PI / numberOfTrees, seed);
    // // Return the JSX
    return (
        <Flex height="100vh">
            {/* Canvas */}
            {/* Dynamic width when panel is open */}
            <Center id="canvas-box" flex={1} border="2px solid white" maxWidth={isOpen ? "calc(100vw - 300px)" : "100vw"} >
                <svg ref={svgRef} height='100vh' viewBox={`0 0 ${canvasSize} ${canvasSize}`}>
                    {allTrees.map((line, index) => (
                        <g key={index}>
                            {drawLine(line)}
                        </g>
                    ))}
                </svg>
            </Center>

            {/* Control Panel */}
            <Box id="control-panel"
                width={isOpen ? "25%" : "auto"}
                borderWidth={1}
                p={4}
                boxShadow="sm"
            >
                <Button size="sm" onClick={onToggle} mb={4}>
                    {isOpen ? "Hide Controls" : "Show Controls"}
                </Button>
                <Collapse in={isOpen} animateOpacity>
                    <Stack spacing={6}>
                        <ColorModeButton />
                        {/* Depth Controls */}
                        <FormControl>
                            <Heading as="h2" size="md" mb={2}>
                                Depth: {depth}
                            </Heading>
                            {treeCountSelector}
                            <Stack direction="row" spacing={2}>
                                {decreaseDepthButton}
                                {increaseDepthButton}
                            </Stack>
                        </FormControl>

                        {/* Angle Controls */}
                        <FormControl>
                            <FormLabel>Angle</FormLabel>
                            <Text>{numerator}</Text>
                            {setNumeratorSlider}
                        </FormControl>

                        {/* Palette Selector */}
                        <FormControl>
                            <FormLabel>Choose Color Palette</FormLabel>
                            <Select
                                onChange={(e) => setSelectedPalette(e.target.value)}
                                value={selectedPalette}
                            >
                                {Object.keys(palettes).map((paletteKey) => (
                                    <option key={paletteKey} value={paletteKey}>
                                        {paletteKey.charAt(0).toUpperCase() + paletteKey.slice(1)}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Download Controls */}
                        <FormControl>
                            <FormLabel>Filename without extension</FormLabel>
                            {fileNameField}
                            <Button mt={2} onClick={saveSvgAsFile} colorScheme="teal">
                                Download SVG
                            </Button>
                        </FormControl>
                    </Stack>
                </Collapse>
            </Box>
        </Flex>
    );
}
