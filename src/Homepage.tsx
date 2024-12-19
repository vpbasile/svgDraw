// Homepage

import { Box, Heading, Link, List, ListItem } from "@chakra-ui/react";

export default function Home() {
    return <Box border={'2px solid black'} height={'100%'}>

        <Box>
            <Heading as={'h2'}>Examples:</Heading>
            <List>
                <ListItem><Link href={'/tree'}>Tree</Link></ListItem>
            </List>
        </Box>
        <Box id="to-do-list">
            <Heading as={'h2'}>To Do:</Heading>
            <List>
                <ListItem>Handle ids and classes for svg components</ListItem>
                <ListItem>Migrate HexBoard</ListItem>
            </List>
        </Box>
    </Box>
}