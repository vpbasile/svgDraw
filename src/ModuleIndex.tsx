import { LinkIcon } from '@chakra-ui/icons';
import { Box, Heading, Link, List, ListItem } from '@chakra-ui/react';
export default function ModuleIndex() {
    // TODO Find a way to generate this just like the routes are
    // <> Links to all the modules
    return <Box>
        <Heading as={'h2'}>Modules</Heading>
        <List>
            <ListItem><LinkIcon /> <Link href={'/tree'}>Tree</Link></ListItem>
            <ListItem><LinkIcon /> <Link href='/hex'>HexBoard</Link>
                <List>
                    <ListItem><LinkIcon /> <Link href='/hex/trivia'>Trivia Board</Link></ListItem>
                    <ListItem><LinkIcon /> <Link href='/hex/saved'>Board from Save File</Link></ListItem>
                    <ListItem><LinkIcon /> <Link href='/hex/create'>Create Board</Link></ListItem>
                    <ListItem><LinkIcon /> <Link href='/hex/candy'>Candy Land</Link></ListItem>
                    <ListItem><LinkIcon /> <Link href='/hex/cataan'>Cataan</Link></ListItem>
                    <ListItem><LinkIcon /> <Link href='/hex/grid'>Grid</Link></ListItem>
                </List>
            </ListItem>

        </List>
    </Box>
}