import { Box, Text } from '@chakra-ui/react';
import { useState } from 'react';
import HexboardLayout from '../../hexboard/HexboardLayout';
import Hexboard from '../../hexboard/HexBoardSVG';
import { canvasGlobalsType, gameGlobalsType, hexID } from '../../hexboard/hexDefinitions';
import { hexOrientations } from '../../hexboard/hexMath';
import RosterDisplay from '../../hexboard/hexRosterDisplay';
import './color-tomato.css';
import { generateHexCoordinates, shuffle } from './soup-functions';
export default function HexWordSoup() {
    const [selection, setSelection] = useState<hexID[]>([0])
    const x = 1600

    const gameGlobals: gameGlobalsType = {
        orientation: hexOrientations['pointy-top'],
        hexRadius: x / 16,
        separationMultiplier: 1.1,
        textSize: x / 32,
        drawBackBoard: false,
        onClick: (hex) => {
            const x = selection
            x.push(hex.uid)
            setSelection(x)
        }
    };


    const canvasGlobals: canvasGlobalsType = {
        canvasWidth: x,
        canvasHeight: x,
        hexGridOrigin: {
            x: x / 2,
            y: x / 2
        },
        canvasBackgroundColor: 'lightblue'
    };

    const letterBag: string[] = shuffle("aaaaaaaaabbbcccddddeeeeeeeeeeeeeeffffggghhiiiiiiiiijkllllllllmmnnnnnnnnoooooooooppqrrrrrrsssstttttttuuuuvvwwxyyz".split(''));
    const [letterSupply, setLetterSupply] = useState(letterBag)
    const initialHexRoster = generateHexCoordinates();
    const [hexRoster, setHexRoster] = useState(initialHexRoster);

    const populateHexes = () => {
        console.log('Letter Supply', letterSupply)
        const remaining: string[] = [...letterSupply];
        const updatedHexRoster = hexRoster.map((hex) => {
            console.log('Updating hex', hex.uid, hex.hexText)
            if (hex.hexText === "*") {
                // Draw a letter from the supply, removing it from the supply
                const newLetter = remaining.shift() || "*";
                // console.log('Drew', newLetter);
                // console.log('remaining', remaining);
                hex.hexText = newLetter;
            }
            return hex;
        })
        setLetterSupply(remaining); // Update the letter supply state
        setHexRoster(updatedHexRoster);
    };

    // populateHexes();

    return (<HexboardLayout id={'hex-soup-layout'} displayTitle={'Hex Soup'} board={<Hexboard gameGlobals={gameGlobals} canvasGlobals={canvasGlobals} hexRoster={hexRoster} />
    }
        roster={<RosterDisplay hexRoster={hexRoster} />} >
        {/* {props.children} */}
        <>
            <Text>{selection}</Text>
            <Box id='DebugDisplay'>
                <button onClick={() => populateHexes()}>Populate</button>
            </Box>
        </>
    </ HexboardLayout>)
}