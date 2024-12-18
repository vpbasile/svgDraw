import { Box, Heading, Link, List, ListItem } from "@chakra-ui/react";

export default function Home() {
    return <Box border={'2px solid black'} height={'100%'}>
        <Heading as={'h1'}>Home</Heading>
        <Heading as={'h2'}>Examples:</Heading>
        <List>
            <ListItem><Link href={'/tree'}>Tree</Link></ListItem>
        </List>
    </Box>
}