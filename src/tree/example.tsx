import { Box, Button, Heading, Select, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { coordinateT, myLineT } from "../types";
import { palettes } from "./palettes"; // Import the palettes
import Tree from "./treeGPT";

export default function TreeExample() {
    // Constants
    const canvasSize: number = 1500
    const seed: coordinateT = { x: canvasSize / 2, y: canvasSize / 2 }
    const PI = Math.PI;

    
    // States
    const [depth, setDepth] = useState<number>(8);
    const [numerator, SETnumerator] = useState<number>(1);
    const [selectedPalette, setSelectedPalette] = useState<string>('default');
    const root: myLineT = { start: seed, angle: -PI / 2, length: 200, width: '21px' };
    const highestColor: number = Object.keys(palettes[selectedPalette]).length - 1;

    // Reference to the SVG element
    const svgRef = useRef<SVGSVGElement>(null);

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
            a.download = 'tree.svg'; // File name
            a.click();
            URL.revokeObjectURL(url); // Clean up the URL object
        }
    };

    // Control Components
    const decreaseDepthButton = <Button onClick={() => setDepth(depth - 1 > 1 ? depth - 1 : 2)}>Decrease Depth</Button>;
    const increaseDepthButton = <Button onClick={() => setDepth(depth + 1 < highestColor ? depth + 1 : highestColor)}>Increase Depth</Button>;
    const setNumeratorSlider = (
        <Slider min={0.25} max={2} step={0.125} value={numerator} onChange={(val: number) => SETnumerator(val)}>
            <SliderTrack>
                <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
        </Slider>
    );

    return (
        <Box border={'2px solid white'} height={'100%'}>
            <Box id="control-box" maxWidth={'40vw'}>
                <Box id="depth-controls">
                    <Heading as={'h2'}>Depth: {depth}</Heading>
                    {decreaseDepthButton}
                    {increaseDepthButton}
                </Box>
                <Box id="numerator-controls">
                    <Heading as={'h2'}>Angle: {numerator}</Heading>
                    {setNumeratorSlider}
                </Box>
                {/* Add palette selector */}
                <Box>
                    <Heading as={'h2'}>Choose Color Palette</Heading>
                    <Select onChange={(e) => setSelectedPalette(e.target.value)} value={selectedPalette}>
                        {Object.keys(palettes).map((paletteKey) => (
                            <option key={paletteKey} value={paletteKey}>
                                {paletteKey.charAt(0).toUpperCase() + paletteKey.slice(1)}
                            </option>
                        ))}
                    </Select>
                </Box>
                {/* Add a button to trigger the download */}
                <Button onClick={saveSvgAsFile}>Download SVG</Button>
            </Box>
            <Box id="canvas-box" maxWidth={'40vw'}>
                <svg ref={svgRef} height='100vh' viewBox={`0 0 ${canvasSize} ${canvasSize}`}>
                    <Tree root={root} delta={numerator * PI / 4} depth={depth} palette={palettes[selectedPalette]} />
                </svg>
            </Box>
        </Box>
    );
}
