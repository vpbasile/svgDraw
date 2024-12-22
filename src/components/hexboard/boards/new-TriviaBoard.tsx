import { useState } from "react";
import BoardParameters from "../forms/BoardParameters";
import CanvasParameters from "../forms/CanvasParameters";
import { coordinateHex, gameGlobalsType, hexDef } from "../hexDefinitions";
import { clickMessage, coord2hex } from "../hexFunctions";
import { cube_ring, hexOrientations } from "../hexMath";
import RosterDisplay from "../hexRosterDisplay";
import HexboardSVG from "../new-HexBoardSVG";

export default function TriviaBoard() {
  // Constants, States, and Functions unique to this board
  const colors = ["green", "red", "blue", "yellow", "purple", "orange"]
  let colorIndex = 0;
  function getNextcolor() {
    const color = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length;
    return color;
  }

  // <> States that control canvas parameters
  const [hexRadius, SEThexRadius] = useState(200);
  const [separationMultiplier, SETseparationMultiplier] = useState(1.1)

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

  // <><><> The game globals needed for rendering
  const gameGlobals: gameGlobalsType = {
    // Hexagons
    orientation: hexOrientations['flat-top'],
    hexRadius: hexRadius,
    separationMultiplier: separationMultiplier,
    textSize: 12,
    drawBackBoard: true,
    onClick: clickMessage,
  }

  // <><><> Calculate the size of the canvas based on the hex roster
  const [canvasHeight, SETcanvasHeight] = useState(3600)
  const [canvasWidth, SETcanvasWidth] = useState(3600)
  // Since this is a centered board, we can calculate the origin based on the height and width
  const [hexGridOrigin, SEThexGridOrigin] = useState({ x: canvasWidth / 2, y: canvasHeight / 2 })
  const canvasGlobals = {
    canvasWidth: canvasWidth, canvasHeight: canvasHeight, hexGridOrigin: hexGridOrigin,
    canvasBackgroundColor: '#000',
  }

  const buildControlPanel = <>
    <CanvasParameters
      // Canvas-specific parameters
      canvasWidth={canvasWidth} SETcanvasWidth={SETcanvasWidth}
      canvasHeight={canvasHeight} SETcanvasHeight={SETcanvasHeight}
      hexGridOrigin={hexGridOrigin} SEThexGridOrigin={SEThexGridOrigin} />,
    <BoardParameters
      // Hexagonally-specific parameters
      hexRadius={hexRadius}
      separationMultiplier={separationMultiplier}
      SEThexRadius={SEThexRadius}
      SETseparationMultiplier={SETseparationMultiplier} hexgridOrigin={{
        x: 0,
        y: 0
      }} SEThexGridOrigin={SEThexGridOrigin} />
    <RosterDisplay hexRoster={hexRoster} />
  </>

  return <HexboardSVG gameGlobals={gameGlobals} canvasGlobals={canvasGlobals} hexRoster={hexRoster}
    controlPanel={buildControlPanel}
  />
}