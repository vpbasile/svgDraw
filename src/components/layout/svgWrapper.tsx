import { Box, Button, Center, Collapse, Flex, FormControl, FormHelperText, FormLabel, Heading, Input } from '@chakra-ui/react';
import { SetStateAction, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ColorModeButton from '../colorModeButton';
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
export default function SVGWrapper(props: { width: number, height: number, children?: JSX.Element | JSX.Element[], controlPanel: JSX.Element }) {
    // Constants, Props, and States
    const { width, height, children, controlPanel } = props;
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

    return <Flex height="100vh">
        {/* SVG Canvas - Dynamic width when panel is open */}
        <Center id="canvas-box" flex={1}
        // maxWidth={isOpen ? "calc(100vw - 300px)" : "100vw"} 
        >
            <svg ref={svgRef} height='100vh' viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg">
                {/* If no children are passed, just show a polygon */}
                {children || <polygon points="100,10 40,198 190,78 10,78 160,198" />}
            </svg>
        </Center>
        {/* Control Panel */}
        <Box id='control-panel-column' borderWidth={1} p={4} boxShadow="sm" border={'2px'}
            overflowY="auto" // Enables vertical scrolling
            maxHeight="100vh" // Restricts height to viewport
        // width={isOpen ? "300px" : "auto"} 
        >
            <Heading as="h1" size="lg" mb={4}><Link to={'/'}>SVGDraw</Link></Heading>
            {/* <FormControl id="show-hide">
                <Button size="sm" onClick={onToggle} mb={4}>
                    {isOpen ? "Hide Controls" : "Show Controls"}
                </Button>
            </FormControl> */}
            <Collapse in={true} animateOpacity
            >
                {/* Color Mode Button */}
                <FormControl>
                    <FormLabel>Color Mode</FormLabel>
                    <ColorModeButton />
                </FormControl>
                {/* Download Controls */}
                <FormControl>
                    <FormLabel>Filename</FormLabel>
                    {fileNameField}
                    <FormHelperText>Filename will be appended with .svg</FormHelperText>
                    <Button mt={2} onClick={saveSvgAsFile}>
                        Download SVG
                    </Button>
                </FormControl>

                <Center pt={5} mt={5} borderTop={'2px'}>{controlPanel}</Center>
            </Collapse >
        </Box>
    </Flex>
}
