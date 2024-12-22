import { Box, Heading, List, ListItem } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { hexBoardList } from './HexhexBoardList';
import { hexOrientations } from './hexMath';
import HexboardSVG from './new-HexBoardSVG';

export default function HexBoardIndex() {

    const gameGlobals = {
        displayTitle: "HexBoard Index",
        orientation: hexOrientations['flat-top'],
        hexRadius: 50,
        separationMultiplier: 1.1,
        textSize: 12,
        drawBackBoard: true,
        onClick: () => { },
    }

    const canvasGlobals = {
        canvasWidth: 800,
        canvasHeight: 800,
        hexGridOrigin: { x: 400, y: 400 },
        canvasBackgroundColor: '#000',
    }

    const hexRoster = [
        { "id": 0, "q": 0, "r": 0, "clickMessage": "Center Hexagon" },
    ]

    const buildAdditionalContent = <Box>
        <Heading as={'h2'}>Board Index</Heading>
        <List>
            {hexBoardList.map(({ uid, displayName }) => (
                <ListItem key={`link-${uid}`}>
                    <Link to={uid}>{displayName}</Link>
                </ListItem>
            ))}
        </List>
    </Box>
    return <HexboardSVG gameGlobals={gameGlobals} canvasGlobals={canvasGlobals} hexRoster={hexRoster}
        additionalContent={buildAdditionalContent} />
    // return <SVGWrapper width={100} height={100} additionalContent={buildAdditionalContent}>
    // </SVGWrapper>
}
