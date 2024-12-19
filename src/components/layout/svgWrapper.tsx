import { Box, Button, Center, Collapse, Flex, FormControl, FormHelperText, FormLabel, Heading, Input } from '@chakra-ui/react';
import { SetStateAction, useRef, useState } from 'react';
import ColorModeButton from '../colorModeButton';
export default function SVGWrapper(props: { width: number, height: number, children: JSX.Element[], controlPanel: JSX.Element }) {
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
    // Function to save SVG as a PNG file
    // const saveSvgAsPng = () => {
    //     if (svgRef.current) {
    //         const svgElement = svgRef.current;
    //         const serializer = new XMLSerializer();
    //         const svgString = serializer.serializeToString(svgElement);
    //         const canvas = document.createElement('canvas');
    //         const ctx = canvas.getContext('2d');
    //         const img = new Image();
    //         img.onload = () => {
    //             if (ctx) {
    //                 canvas.width = img.width;
    //                 canvas.height = img.height;
    //                 ctx.drawImage(img, 0, 0);
    //                 canvas.toBlob((blob) => {
    //                     if (blob) {
    //                         const url = URL.createObjectURL(blob);
    //                         const a = document.createElement('a');
    //                         a.href = url;
    //                         a.download = `${fileName}.png`; // File name
    //                         a.click();
    //                         URL.revokeObjectURL(url); // Clean up the URL object
    //                     }
    //                 });
    //             }
    //         };
    //         img.src = `data:image/svg+xml;base64,${btoa(svgString)}`;
    //     }
    // }

    const fileNameField = <Input placeholder={fileName} onChange={(e: { target: { value: SetStateAction<string>; }; }) => setFileName(e.target.value)} transition={'width 0.75s'} />

    return <Flex height="100vh">
        {/* SVG Canvas - Dynamic width when panel is open */}
        <Center id="canvas-box" flex={1}
        // maxWidth={isOpen ? "calc(100vw - 300px)" : "100vw"} 
        >
            <svg ref={svgRef} height='100vh' viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg">
                {children}
            </svg>
        </Center>
        {/* Control Panel */}
        <Box id='control-panel-column' borderWidth={1} p={4} boxShadow="sm" border={'2px'}
        overflowY="auto" // Enables vertical scrolling
        maxHeight="100vh" // Restricts height to viewport
        // width={isOpen ? "300px" : "auto"} 
        >
            <Heading as="h1" size="lg" mb={4}>SVGDraw</Heading>
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