import { Box, Heading, Link, List, ListItem, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/react';
import { useState } from 'react';
import AppWrapper from './AppWrapper';
import { PageSizeKey } from './pageSizeSettings';
import SidebarSection from './SidebarSection';

const MODULE_DEFAULT_PAGE_SIZE: PageSizeKey = 'none';
export default function PlaceHolderBoard() {
    // Each implementation should provide the SVG content plus any sidebar controls.
    // AppWrapper owns the shared layout and SVG draw controls.

    // States and Logic
    const [x, setX] = useState(11);

    // SVG Content
    {/* A couple of triangles - one red and one green */ }
    const content = [
        <polygon key={'redTriangle'} points="50,5 90,90 10,90" fill="red" />,
        <polygon key={'greenTriangle'} points={`${10 * x},6 80,${15 * x} ${15 + x},${80 - 2 * x}`} fill="green" />,
        <rect key={'rect'} x={70} y={65} width={50} height={12} fill="gray" />,
        <text key={'title'} x={75} y={75} fontSize={10} fill="blue">SVGDraw</text>

    ]

    // Control Panel
    const controlPanel = <>
        <SidebarSection id="placeholder-controls" title="Placeholder RedGreen Control">
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
            Value: {x}
        </SidebarSection>
        <SidebarSection id="placeholder-todo" title="To Do">
            <Box id="to-do-list">
                <Heading as={'h2'}>To Do:</Heading>
                <List>
                    <ListItem>Move the save menu to an <Link href="https://www.chakra-ui.com/docs/components/action-bar" >Action Bar</Link></ListItem>
                    <ListItem>Handle classes for svg components</ListItem>
                </List>
            </Box>
        </SidebarSection>
        </>


        return <AppWrapper title='Placeholder RedGreen'
            defaultPageSize={MODULE_DEFAULT_PAGE_SIZE}
            renderSVG={() => (
                <svg width="100%" height="100%" viewBox="0 0 500 500" preserveAspectRatio="xMidYMid meet">
                    {content}
                </svg>
            )}
            renderControls={() => controlPanel} initialState={undefined} />
}