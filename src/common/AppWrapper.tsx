import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Center, Flex, FormControl, FormHelperText, FormLabel, Heading, Input } from '@chakra-ui/react';
import { SetStateAction, useRef, useState } from 'react';
import ModuleIndex from '../ModuleIndex';
import ColorModeButton from './ColorModeButton';
type SvgWrapperProps = {
    width: number;
    height: number;
    centerOrigin?: boolean;
    displayTitle: string;
    titleUrl?: string;
    children?: JSX.Element[];
    controlPanel?: JSX.Element;
};

export default function AppWrapper(props: SvgWrapperProps) {

    // Constants, Props, and States
    const { width, height, children, displayTitle, controlPanel } = props;
    if (width <= 0 || height <= 0) {
        throw new Error("AppWrapper: Width and height must be positive numbers.");
    }
    // Calculate some style for the parent SVG element
    let styleBuild = {};
    styleBuild = { ...styleBuild, fill: "white" };
    let calcViewBox = `0 0 ${width} ${height}`;
    if (props.centerOrigin) {
        calcViewBox = `-${width / 2} -${height / 2} ${width} ${height}`; // Center the origin
    }
    const [fileName, setFileName] = useState<string>('tree');
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
            a.download = `${fileName}.svg`; // File name
            a.click();
            URL.revokeObjectURL(url); // Clean up the URL object
        }
    };

    const fileNameField = <Input placeholder={fileName} onChange={(e: { target: { value: SetStateAction<string>; }; }) => setFileName(e.target.value)} transition={'width 0.75s'} />

    // Assemble the control panel
    const controlPanelContent: { value: string, content: JSX.Element, level: 'h1' | 'h2' | 'h3', href?: string }[] =
        [
            { value: `${displayTitle} Controls`, level: 'h2', content: controlPanel ? controlPanel : <Box>No controls specified for this module</Box> },
            // We always want the Color Mode Button
            {
                value: 'SVGDraw Controls', content: <>
                    <ColorModeButton />
                    {/* // Download Controls */}
                    <FormControl>
                        <FormLabel>Filename</FormLabel>
                        {fileNameField}
                        <FormHelperText>Filename will be appended with .svg</FormHelperText>
                        <Button mt={2} onClick={saveSvgAsFile}>
                            Download SVG
                        </Button>
                    </FormControl>
                </>, level: 'h2'
            },
            { value: 'Module Index', level: 'h2', content: <ModuleIndex />, href: '/moduleIndex' }

        ]

    // Main return
    return <Flex height="100vh">
        {/* SVG Canvas - Dynamic width when panel is open */}
        <Center id="canvas-box" flex={1} >
            <svg ref={svgRef}
                width="100%" height="100%"
                viewBox={calcViewBox} xmlns="http://www.w3.org/2000/svg" style={styleBuild}>
                {/* If no children are passed, just show a polygon */}
                {children || <polygon points="100,10 40,198 190,78 10,78 160,198" />}
            </svg>
        </Center>
        {/* Control Panel */}
        <Box id='control-panel-column'
            boxShadow="sm" border={'2px'}
            width={300}
            height="100vh" // Restricts height to viewport
            overflowY="auto" // Enables vertical scrolling
        >
            <Heading as={'h2'} size="md" color={'gray'}>{displayTitle}</Heading>
            <Accordion allowToggle>
                {controlPanelContent.map((item, index) => (
                    <AccordionItem key={index}>
                        <AccordionItem >
                            <AccordionButton><AccordionIcon />
                                <Heading as={item.level} size="md">{item.value}</Heading>
                            </AccordionButton>
                            <AccordionPanel>
                                {item.content}
                            </AccordionPanel>
                        </AccordionItem>
                    </AccordionItem>
                ))}
            </Accordion>
        </Box>
    </Flex>
}