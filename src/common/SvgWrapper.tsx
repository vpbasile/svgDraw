import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Center, Flex, FormControl, FormHelperText, FormLabel, Input } from '@chakra-ui/react';
import { SetStateAction, useRef, useState } from 'react';
import ColorModeButton from '../features/hexboard/forms/B_ColorMode';
import ModuleIndex from './ModuleIndex';
type SvgWrapperProps = {
    viewBox: string;
    centerOrigin?: boolean;
    displayTitle: string;
    titleUrl?: string;
    children?: JSX.Element[];
    controlPanel?: JSX.Element;
};

/**
 * SVGWrapper component provides a container for rendering SVG elements
 * along with a control panel for additional functionalities.
 * 
 *  Each implementation of SVGWwrapper will contain the following things (not necessarily in this order):
 * * All states and logic required to render the SVG content.  This will allow control panel to interact with the SVG content
 * * SVG Content - this will be passed as children to SVGWrapper
 * * Control Panel - this will be passed as a prop to SVGWrapper
*
* @remarks
* This component includes functionality to save the SVG content as a file.
* The filename can be specified and will be appended with a .svg extension.
* 
 * @param {Object} props - The properties object.
 * @param {number} props.width - The width of the SVG canvas.
 * @param {number} props.height - The height of the SVG canvas.
 * @param {JSX.Element | JSX.Element[]} props.children - The SVG elements to be rendered inside the canvas.
 * @param {JSX.Element} props.controlPanel - The control panel element to be displayed alongside the SVG canvas.
 *
 * @returns {JSX.Element} The rendered SVGWrapper component.
*
* @example
* <SVGWrapper width={200} height={200} controlPanel={controlPanel} >
*  {content}
 * </SVGWrapper>
*
*/
export default function SVGWrapper(props: SvgWrapperProps) {

    // Constants, Props, and States
    const { viewBox, children, displayTitle, controlPanel } = props;
    // Calculate some style for the parent SVG element
    let styleBuild = {};
    styleBuild = { ...styleBuild, fill: "white" };
    const [fileName, setFileName] = useState<string>('tree');
    // Reference to the SVG element
    const svgRef = useRef<SVGSVGElement>(null);

    // Disclosure for collapsible control panel
    // const { isOpen, onToggle } = useDisclosure();

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

    // Main return
    return <Flex height="100vh">
        {/* SVG Canvas - Dynamic width when panel is open */}
        <Center id="canvas-box" flex={1} >
            <svg ref={svgRef}
                width={"100%"} height={"100%"}
                viewBox={viewBox} xmlns="http://www.w3.org/2000/svg" style={styleBuild}
                preserveAspectRatio="xMidYMid meet"
                >
                {/* If no children are passed, just show a polygon */}
                {children || <polygon points="100,10 40,198 190,78 10,78 160,198" />}
            </svg>
        </Center>
        {/* Control Panel */}
        <Accordion allowMultiple width="300px" minWidth="300px" maxWidth="300px" overflowY="auto" borderLeft="1px solid gray" >
            {/* {controlPanelContent.map((section, index) => (
                <AccordionItem key={index}>
                <AccordionButton>
                <Box flex="1" textAlign="left">
                {section.value}
                </Box>
                <AccordionIcon />
                </AccordionButton>
                    <AccordionPanel pb={4}>
                    {section.content}
                    </AccordionPanel>
                    </AccordionItem>
                    ))} */}
            <Accordion allowMultiple id='svgWrapper-panel'>
                <AccordionItem>
                    <AccordionButton>
                        <Box flex="1" textAlign="left">
                            Module Index
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        <ModuleIndex />
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionButton>
                        <Box flex="1" textAlign="left">
                            {displayTitle} Controls
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        {controlPanel ? controlPanel : <Box>No controls specified for this module</Box>}
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionButton>
                        <Box flex="1" textAlign="left">
                            SVG Draw Controls
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
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
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Accordion>
    </Flex>
}