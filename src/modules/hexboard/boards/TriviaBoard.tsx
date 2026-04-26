import { Box, FormControl, FormLabel } from "@chakra-ui/react";
import { useState } from "react";
import SidebarSection from "../../../components/SidebarSection";
import { PageSizeKey } from "../../../config/pageSizeSettings";
import { palettes } from "../../../config/palettes"; // Import the palettes
import RosterDisplay from "../forms/D_HexRoster";
import BoardParameters from "../forms/F_BoardParameters";
import HexboardWrapper from "../HexboardWrapper";
import { computeHexBoardBounds } from "../hexUtils/computeBounds";
import { coordinateHex, gameGlobalsType, hexDef } from "../hexUtils/hexDefinitions";
import { coord2hex } from "../hexUtils/hexFunctions";
import { cube_ring, hexOrientations } from "../hexUtils/hexMath";

const MODULE_DEFAULT_PAGE_SIZE: PageSizeKey = '36x24';

export default function TriviaBoard() {
  // Constants, States, and Functions unique to this board
  // <> This color stuff is reusable across all boards
  let colorIndex = 0;
  /**
   * Cycles through the palette colors sequentially.
   * Returns the next color in the palette, wrapping around to the beginning when the end is reached.
   * @returns {string} A color value from the current palette
   */
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

  /**
   * Game configuration object that defines how the hexagons are rendered.
   * Controls visual properties like orientation, radius, spacing, and text size.
   */
  const gameGlobals: gameGlobalsType = {
    // Hexagons
    displayTitle: "Trivia Board",
    orientation: hexOrientations['flat-top'],
    hexRadius: hexRadius,
    separationMultiplier: separationMultiplier,
    textSize: 12,
    drawBackBoard: true,


  }
  // <><><> Step 1: Create the hex roster
  /**
   * Generates the hexagon roster by creating concentric rings around a center hexagon.
   * The center is colored distinctly, subsequent rings are colored consecutively from the palette.
   */
  // Create a center hexagon
  const centerHexagon: hexDef = { "id": 0, "q": 0, "r": 0, "clickMessage": "Center Hexagon", additionalSVG: <circle cy={0} cx={0} r={50} fill="red" /> }
  let hexRoster: hexDef[] = [centerHexagon]

  // Create a ring and add it to the hex roster
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

  
  const controlPalette = (
    <SidebarSection id="palette-control" title="Color Palette">
      {Object.keys(palettes).map((paletteKey) => (
        <FormControl key={paletteKey} display="flex" alignItems="center">
          <FormLabel htmlFor={paletteKey} mb="0">
            {paletteKey.charAt(0).toUpperCase() + paletteKey.slice(1)}
          </FormLabel>
          <input
            type="radio"
            id={paletteKey}
            aria-label={`Select Palette ${paletteKey}`}
            title={`Select Palette ${paletteKey}`}
            name="palette"
            value={paletteKey}
            checked={selectedPalette === paletteKey}
            onChange={(e) => setSelectedPalette(e.target.value)}
          />
        </FormControl>
      ))}
    </SidebarSection>
  );

  const buildControlPanel = <Box id="control-panel-trivia">
    {controlPalette}
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

  const orientation = hexOrientations['flat-top'];
  const bounds = computeHexBoardBounds(hexRoster, hexRadius, orientation, separationMultiplier, hexRadius);
  const viewBox = `${bounds.minX} ${bounds.minY} ${bounds.width} ${bounds.height}`;

  return <HexboardWrapper
    title="Trivia Board"
    defaultPageSize={MODULE_DEFAULT_PAGE_SIZE}
    gameGlobals={gameGlobals}
    viewBox={viewBox}
    hexRoster={hexRoster}
    controlPanel={buildControlPanel}
  />
}