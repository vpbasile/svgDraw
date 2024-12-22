import { Box, Heading, List, ListItem } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import SVGWrapper from '../layout/svgWrapper';
import { boardList } from './boardList';

export default function HexBoardIndex() {
    const buildControlPanel = <Box>
        <Heading as={'h2'}>Board Index</Heading>
        <List>
            {boardList.map(({ uid, displayName }) => (
                <ListItem key={`link-${uid}`}>
                    <Link to={uid}>{displayName}</Link>
                </ListItem>
            ))}
        </List>
    </Box>;
    return <SVGWrapper width={100} height={100} controlPanel={buildControlPanel}>
        {/* A big hexagon with stroke="grey" strokeWidth="3" fill="purple" */}
        <polygon points="50,1 95,25 95,75 50,99 5,75 5,25" stroke="grey" strokeWidth="3"/>
        <text x="50" y="50" textAnchor="middle" fill='grey' dy=".3em">Hexboard</text>
        {/* A subtitle reading 'Select a board using the control panel.' */}
        <text x="50" y="70" textAnchor="middle" fill='grey' dy=".3em" fontSize="3">Select a board using the control panel.</text>
    </SVGWrapper>
}
