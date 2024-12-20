// Homepage

import { Box, Heading, Link, List, ListItem } from "@chakra-ui/react";

// TODO: The home component should implement SVGWrapper
// The control panel should contain a list of links to the other components
// The SVGWrapper should contain something aesthetically pleasing

export default function Home() {
    return <Box border={'2px solid black'} height={'100%'}>

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
                <ListItem>Migrate HexBoard</ListItem>
                <ListItem>Move the save menu to an <Link href="https://www.chakra-ui.com/docs/components/action-bar" >Action Bar</Link></ListItem>
                <ListItem>Handle classes for svg components</ListItem>
            </List>
        </Box>
    </Box>
}