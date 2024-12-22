import { Box, Button, Center, Flex, FormControl, FormHelperText, FormLabel, Heading, Input } from '@chakra-ui/react';
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
export default function SVGWrapper(props: { width: number, height: number, centerOrigin?: boolean, children?: JSX.Element[], controlPanel: JSX.Element }) {


    // Constants, Props, and States
    const { width, height, children, controlPanel } = props;
    if (width <= 0 || height <= 0) {
        throw new Error("SVGWrapper: Width and height must be positive numbers.");
    }
    let calcViewBox = `0 0 ${width} ${height}`;
    if (props.centerOrigin) {
        calcViewBox = `-${width / 2} -${height / 2} ${width} ${height}`; // Center the origin
    }
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

    // Calculate some style for the parent SVG element
    let styleBuild = {};
    styleBuild = { ...styleBuild, fill: "white" };

    // Main return
    return <Flex height="100vh">
        {/* SVG Canvas - Dynamic width when panel is open */}
        <Center id="canvas-box" flex={1}
        // maxWidth={isOpen ? "calc(100vw - 300px)" : "100vw"} 
        >
            <svg ref={svgRef} height='100vh' viewBox={calcViewBox} xmlns="http://www.w3.org/2000/svg" style={styleBuild}>
                {/* TODO Add these properties */}
                {/* < svg
			className={cssClasses}
			viewBox={`${-hexGridOrigin.x} ${-hexGridOrigin.y} ${canvasWidth} ${canvasHeight}`
			}
			style={{ fill: "white" }}>" ></svg> */}
                {/* If no children are passed, just show a polygon */}
                {children || <polygon points="100,10 40,198 190,78 10,78 160,198" />}
            </svg>
        </Center>
        {/* Control Panel */}
        <Box id='control-panel-column' borderWidth={1} boxShadow="sm" border={'2px'}
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
            {/* Color Mode Button */}
            <FormControl>
                <FormLabel>Color Mode</FormLabel>
                <ColorModeButton />
            </FormControl>
            <Box id='control-panel-component' maxW={'300px'} pt={5} mt={5} border={'2px'}>{controlPanel}</Box>
            <Box id="control-download">
                {/* Download Controls */}
                <FormControl>
                    <FormLabel>Filename</FormLabel>
                    {fileNameField}
                    <FormHelperText>Filename will be appended with .svg</FormHelperText>
                    <Button mt={2} onClick={saveSvgAsFile}>
                        Download SVG
                    </Button>
                </FormControl>
            </Box>
        </Box>
    </Flex>
}
