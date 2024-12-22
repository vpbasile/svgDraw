import { Box, FormControl, FormLabel, Heading, List, ListItem } from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { palettes } from '../palettes';
import { hexBoardList } from './HexBoardList';
import HexboardSVG from './HexBoardSVG';
import { coordinateHex, hexDef } from './hexDefinitions';
import { coord2hex } from './hexFunctions';
import { cube_ring, hexOrientations } from './hexMath';

export default function HexBoardIndex() {

    // Constants, States, and Functions unique to this board
    let colorIndex = 0;
    function getNextcolor() {
        const color = colors[colorIndex];
        colorIndex = (colorIndex + 1) % colors.length;
        return color;
    }
    const [selectedPalette, setSelectedPalette] = useState<string>('tree');
    const colors = palettes[selectedPalette]

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

    // <><><> Step 1: Create the hex roster
    // Create a center hexagon
    const centerHexagon: hexDef = { "id": 0, "q": 0, "r": 0, "clickMessage": "Center Hexagon" }
    let hexRoster: hexDef[] = [centerHexagon]

    // Create rings and add them to the hex roster
    for (let i = 1; i <= 4; i++) {
        const ring: coordinateHex[] = cube_ring({ "q": 0, "r": 0 }, i);
        const ringColor = getNextcolor();
        hexRoster = hexRoster.concat(ring.map((hex: coordinateHex) => coord2hex(hex, ringColor, 0)));
    }

    // Build Control Panel
    const controlPalette = <FormControl id="palette-control">
        <FormLabel>Color Palette</FormLabel>
        {Object.keys(palettes).map((paletteKey) => (
            <FormControl key={paletteKey} display="flex" alignItems="center">
                <FormLabel htmlFor={paletteKey} mb="0">
                    {paletteKey.charAt(0).toUpperCase() + paletteKey.slice(1)}
                </FormLabel>
                <input
                    type="radio"
                    id={paletteKey}
                    name="palette"
                    value={paletteKey}
                    checked={selectedPalette === paletteKey}
                    onChange={(e) => setSelectedPalette(e.target.value)}
                />
            </FormControl>
        ))}
    </FormControl>;

    const buildControlPanel = <Box id='control-panel-hexboard'>
        {/* <Heading as={'h2'}><Link to='/hex/'>HexBoardSVG</Link></Heading> */}
        <Box id='control-panel-hexboard-children' border={'2px'}>
            <Heading as={'h3'}>{gameGlobals.displayTitle}</Heading>
            {controlPalette}
        </Box>
    </Box>;

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
        additionalContent={buildAdditionalContent} controlPanel={buildControlPanel} />
    // return <SVGWrapper width={100} height={100} additionalContent={buildAdditionalContent}>
    // </SVGWrapper>
}
