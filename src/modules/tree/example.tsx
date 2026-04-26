import { Box, FormControl, FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Radio, RadioGroup, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Stack } from "@chakra-ui/react";
import { useState } from "react";
import AppWrapper from "../../components/AppWrapper";
import SidebarSection from "../../components/SidebarSection";
import { PAGE_SIZES, PageSizeKey } from "../../config/pageSizeSettings";
import { palettes } from "../../config/palettes"; // Import the palettes
import { drawLine, rotateLinesAroundPoint } from "../../utils/helpers";
import { coordinateT, myLineT } from "../../utils/types";
import Tree from "./treeGPT";

const MODULE_DEFAULT_PAGE_SIZE: PageSizeKey = '8.5x11';

export default function TreeExample() {
    // Constants
    const pageSize = PAGE_SIZES[MODULE_DEFAULT_PAGE_SIZE];
    const seed: coordinateT = { x: 0, y: 0 }
    const PI = Math.PI;

    // Settings
    const defaultDepth = 2;
    const defaultNumberOfTrees = 1;
    const defaultNumerator = 1;
    // States
    const [maxDepth, setMaxDepth] = useState<number>(defaultDepth);
    const [numberOfTrees, setNumberOfTrees] = useState<number>(defaultNumberOfTrees);
    const [numerator, SETnumerator] = useState<number>(defaultNumerator);
    const [selectedPalette, setSelectedPalette] = useState<string>('tree');
    const root: myLineT = { start: seed, angle: -PI / 2, length: 200, width: '21px', z: 0, key: '0' };
    const highestColor: number = Object.keys(palettes[selectedPalette]).length - 1;

    // Generate the trees
    const original = Tree(root, (numerator * PI) / 4, maxDepth, palettes[selectedPalette]);
    // Sort the trees by z-index so that lower trees are drawn first
    const allTrees = original;
    // Generate siblings if necessary
    if (numberOfTrees > 1) {
        for (let i = 1; i < numberOfTrees; i++) {
            const sibling = rotateLinesAroundPoint(original, i * 2 * PI / numberOfTrees, seed);
            // Add all members of the sibling to the allTrees array
            sibling.forEach((line) => allTrees.push(line));
        }
    }

    // Now that all the lines are finally figured out, sort them by z-index
    allTrees.sort((a, b) => a.z - b.z);

    // Control Panel Components

    // Control for selecting min and max depth
    const controlDepth = <FormControl id="depth-control" label="depth">
        <FormLabel>Depth</FormLabel>
        {<NumberInput defaultValue={maxDepth} min={1} max={highestColor} onChange={(val) => setMaxDepth(parseInt(val))}>
            <NumberInputField />
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInput>}
    </FormControl>;

    // Control for selecting angle
    const minAngle = 0.25;
    const maxAngle = 2;
    const stepAngle = 0.125;
    const handleChange = (_valueAsString: string, valueAsNumber: number) => SETnumerator(valueAsNumber)
    const controlAngle = <FormControl id="angle-control">
        <FormLabel>Angle Coefficient</FormLabel>
        {/* Number input */}
        <NumberInput
            maxW='100px' mr='2rem'
            min={minAngle} max={maxAngle} step={stepAngle}
            value={numerator} onChange={(valueAsString, valueAsNumber) => handleChange(valueAsString, valueAsNumber)}
        >
            <NumberInputField />
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInput>
        {/* Slider input */}
        <Slider
            focusThumbOnChange={false}
            min={minAngle} max={maxAngle} step={stepAngle}
            value={numerator} onChange={(value) => handleChange(value.toString(), value)}
        >
            <SliderTrack>
                <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb fontSize='sm' boxSize='32px' children={numerator} />
        </Slider>
    </FormControl>;

    // Control for selecting number of trees
    const controlCount = <FormControl id="count-control">
        <FormLabel>Number of Trees</FormLabel>
        <RadioGroup
            onChange={(val) => setNumberOfTrees(parseInt(val))} value={numberOfTrees.toString()}
        >
            <Stack direction='row'>
                {[1, 2, 3, 4, 5, 6].map((num) => <Radio key={num} value={`${num}`}>{num}</Radio>)}
            </Stack>
        </RadioGroup>
    </FormControl>;

    const controlPalette = <FormControl id="palette-control">
        <FormLabel>Color Palette</FormLabel>
        <select
            id="tree-palette-select"
            onChange={(e) => setSelectedPalette(e.target.value)}
            value={selectedPalette}
            aria-label={`Select Palette ${selectedPalette}`}
            title="Select Palette"
        >
            {Object.keys(palettes).map((paletteKey) => (
                <option key={paletteKey} value={paletteKey}>
                    {paletteKey.charAt(0).toUpperCase() + paletteKey.slice(1)}
                </option>
            ))}
        </select>
    </FormControl>;

    // Assemble the control panel
    const controlPanel = <SidebarSection id="fractal-tree-controls" title="Fractal Tree Controls">
        <Box>Line count: {allTrees.length}</Box>
        {controlDepth}
        {controlCount}
        {controlAngle}
        {controlPalette}
    </SidebarSection>

    // Calculate viewBox based on page size, centered at (0, 0)
    const viewBoxWidth = pageSize?.width ?? 500;
    const viewBoxHeight = pageSize?.height ?? 500;
    const viewBoxX = -viewBoxWidth / 2;
    const viewBoxY = -viewBoxHeight / 2;

    return <AppWrapper title='Fractal Tree'
        defaultPageSize={MODULE_DEFAULT_PAGE_SIZE}
        renderSVG={() => (
            <svg width="100%" height="100%" viewBox={`${viewBoxX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`} preserveAspectRatio="xMidYMid meet">
                {allTrees.map((line) => drawLine(line))}
            </svg>
        )}
        renderControls={() => controlPanel} initialState={undefined} />
}
