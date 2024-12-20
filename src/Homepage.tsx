// Homepage

import { Box, Heading, Link, List, ListItem } from "@chakra-ui/react";
import SVGWrapper from "./components/layout/svgWrapper";

// TODO: The home component should implement SVGWrapper
// The control panel should contain a list of links to the other components
// The SVGWrapper should contain something aesthetically pleasing

export default function Home() {
    const controlPanel = <>
        <Box>
            <Heading as={'h2'}>Examples:</Heading>
            <List>
                <ListItem><Link href={'/tree'}>Tree</Link></ListItem>
                <ListItem><Link href='/hex'>HexBoard</Link></ListItem>
            </List>
        </Box>
        <Box id="to-do-list">
            <Heading as={'h2'}>To Do:</Heading>
            <List>
                <ListItem>Migrate HexBoard (begun but not completed)</ListItem>
                <ListItem>Move the save menu to an <Link href="https://www.chakra-ui.com/docs/components/action-bar" >Action Bar</Link></ListItem>
                <ListItem>Handle classes for svg components</ListItem>
            </List>
        </Box>
    </>
    return <SVGWrapper width={200} height={200} controlPanel={controlPanel}>
        <polygon points="100,10 40,198 190,78 10,78 160,198" />
    </SVGWrapper>

}