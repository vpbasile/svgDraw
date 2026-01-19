import { Box, FormControl, FormLabel } from "@chakra-ui/react";
import { useState } from "react";
import { palettes } from "../../palettes"; // Import the palettes
import BoardParameters from "../forms/BoardParameters";
import CanvasParameters from "../forms/CanvasParameters";
import RosterDisplay from "../forms/hexRosterDisplay";
import HexboardSVG from "../HexBoardSVG";
import { coordinateHex, gameGlobalsType, hexDef } from "../hexDefinitions";
import { coord2hex } from "../hexFunctions";
import { cube_ring, hexOrientations } from "../hexMath";

export default function TriviaBoard() {
  // Constants, States, and Functions unique to this board
  // <> This color stuff is reusable across all boards
  let colorIndex = 0;
  function getNextcolor() {
    const color = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length;
    return color;
  }
  const [selectedPalette, setSelectedPalette] = useState<string>('trivia');
  const colors = palettes[selectedPalette]
  // End of color stuff

  // <> States that control canvas parameters
  const [hexRadius, SEThexRadius] = useState(200);
  const [separationMultiplier, SETseparationMultiplier] = useState(1.1)


  // <><><> The game globals needed for rendering
  const gameGlobals: gameGlobalsType = {
    // Hexagons
    displayTitle: "Trivia Board",
    orientation: hexOrientations['flat-top'],
    hexRadius: hexRadius,
    separationMultiplier: separationMultiplier,
    textSize: 12,
    drawBackBoard: true,


  }
  const [canvasHeight, SETcanvasHeight] = useState(3600)
  const [canvasWidth, SETcanvasWidth] = useState(3600)
  // Since this is a centered board, we can calculate the origin based on the height and width
  const hexGridOrigin = { x: canvasWidth / 2, y: canvasHeight / 2 }
  const canvasGlobals = {
    canvasWidth: canvasWidth, canvasHeight: canvasHeight, hexGridOrigin: hexGridOrigin,
    canvasBackgroundColor: '#000',
  }

  // <><><> Step 1: Create the hex roster
  // Create a center hexagon
  const centerHexagon: hexDef = { "id": 0, "q": 0, "r": 0, "clickMessage": "Center Hexagon", additionalSVG: <circle cy={0} cx={0} r={50} fill="red" /> }
  let hexRoster: hexDef[] = [centerHexagon]

  // Create a rign and add it to the hex roster
  const mainRing = cube_ring({ "q": 0, "r": 0 }, 4);
  hexRoster = hexRoster.concat(mainRing.map((hex: coordinateHex) => coord2hex(hex, getNextcolor(), 0)));

  for (let i = 3; i <= 4; i++) {
    const ring: coordinateHex[] = cube_ring({ "q": 0, "r": 0 }, 4);
    hexRoster = hexRoster.concat(ring.map((hex: coordinateHex) => coord2hex(hex, getNextcolor(), 0)));
  }

  const czcz = <g transform="">
    <circle cy={0} cx={0} r={50} fill="grey" />
  </g>
  hexRoster[4].additionalSVG = czcz

  

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

  const buildControlPanel = <Box id="control-panel-trivia">
    {controlPalette}
    <CanvasParameters
      // Canvas-specific parameters
      canvasWidth={canvasWidth} SETcanvasWidth={SETcanvasWidth}
      canvasHeight={canvasHeight} SETcanvasHeight={SETcanvasHeight} />
    <BoardParameters
      // Hexagonally-specific parameters
      hexRadius={hexRadius}
      separationMultiplier={separationMultiplier}
      SEThexRadius={SEThexRadius}
      SETseparationMultiplier={SETseparationMultiplier} hexgridOrigin={{
        x: 0,
        y: 0
      }} />
    <RosterDisplay hexRoster={hexRoster} />
  </Box>

  return <HexboardSVG gameGlobals={gameGlobals} canvasGlobals={canvasGlobals} hexRoster={hexRoster}
    controlPanel={buildControlPanel}
  />
}