import { LinkIcon } from '@chakra-ui/icons';
import { Box, Heading, Link, List, ListItem } from '@chakra-ui/react';
import { hexBoardList } from './components/hexboard/HexBoardList';

export default function ModuleIndex() {
    // TODO Find a way to generate this just like the routes are
    // <> Links to all the modules
    return <Box>
        <Heading as={'h2'}>Modules</Heading>
        <List>
            <ListItem><LinkIcon /> <Link href={'/svgdraw/tree'}>Tree</Link></ListItem>
            <ListItem><LinkIcon /> <Link href='/svgdraw/scale/temperatures'>Scale: Temperatures</Link></ListItem>
            <ListItem><LinkIcon /> <Link href='/svgdraw/hex'>HexBoard</Link>
                <List>
                    {hexBoardList.map(({ uid }) => (
                        <ListItem key={uid}><LinkIcon /> <Link href={`/svgdraw/hex/${uid}`}>HexBoard: {uid}</Link></ListItem>
                    ))}
                </List>
            </ListItem>
            <ListItem>GitHub:
                <List>
                    <ListItem><LinkIcon /><Link href='https://github.com/vpbasile/svgDraw'>Repo on Github</Link></ListItem>
                    <ListItem><LinkIcon /><Link href='https://vpbasile.github.io/svgDraw/'>Live version on Github Pages</Link></ListItem>
                </List>
            </ListItem>

        </List>
    </Box>
}