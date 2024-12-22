import { LinkIcon } from '@chakra-ui/icons';
import { Box, Heading, Link, List, ListItem } from '@chakra-ui/react';
export default function ModuleIndex() {
    return <Box>
        <Heading as={'h2'}>Modules</Heading>
        <List>
            {/* TODO This list needs bullets */}
            <ListItem><LinkIcon /> <Link href={'/tree'}>Tree</Link></ListItem>
            <ListItem><LinkIcon /> <Link href='/hex'>HexBoard</Link>
                <List>
                    <ListItem><LinkIcon /> <Link href='/hex/trivia'>Trivia Board</Link></ListItem>
                    <ListItem><LinkIcon /> <Link href='/hex/saved'>Board from Save File</Link></ListItem>
                </List>
            </ListItem>

        </List>
    </Box>
}