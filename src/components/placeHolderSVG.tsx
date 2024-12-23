import { Box, Heading, Link, List, ListItem, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/react';
import { useState } from 'react';
import SVGWrapper from './svgWrapper';
export default function PlaceHolderBoard() {
    // Each implementation of SVGWwrapper will contain the following things (not necessarily in this order):
    // * All states and logic required to render the SVG content.  This will allow control panel to interact with the SVG content
    // * SVG Content - this will be passed as children to SVGWrapper
    // * Control Panel - this will be passed as a prop to SVGWrapper

    // States and Logic
    const [x, setX] = useState(11);

    // SVG Content
    {/* A couple of triangles - one red and one green */ }
    const content = [
        <polygon key={'redTriangle'} points="50,5 90,90 10,90" fill="red" />,
        <polygon key={'greenTriangle'} points={`${10 * x},6 80,${15 * x} ${15 + x},${80 - 2 * x}`} fill="green" />
    ]

    // Control Panel
    const controlPanel = <>
        < Box mt={4} >
            <Slider aria-label="slider-ex-1"
                value={x} // Controlled component
                onChange={(value: number) => setX(value)
                } // Update state on change
                step={1}
                min={0}
                max={100}
            >
                <SliderTrack>
                    <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
            </Slider >
            {/* Display Current Value */}
            Value: {x}</Box >
        <Box id="to-do-list">
            <Heading as={'h2'}>To Do:</Heading>
            <List>
                <ListItem>Migrate HexBoard (begun but not completed)</ListItem>
                <ListItem>Move the save menu to an <Link href="https://www.chakra-ui.com/docs/components/action-bar" >Action Bar</Link></ListItem>
                <ListItem>Handle classes for svg components</ListItem>
            </List>
        </Box>
    </>


    return <SVGWrapper
        width={200} height={200}
        displayTitle="Dummy Board"
        controlPanel={controlPanel} >
        {content}
    </SVGWrapper>
}