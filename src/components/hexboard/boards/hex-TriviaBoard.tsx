import { useState } from "react";
import Hexboard from "..";
import BoardParameters from "../forms/BoardParameters";
import CanvasParameters from "../forms/CanvasParameters";
import HexboardLayout from "../HexboardLayout";
import { gameGlobalsType, hexProps } from "../hexDefinitions";
import { blackHexes, clickMessage, colorHexes } from "../hexFunctions";
import { cube_ring, hexOrientations } from "../hexMath";
import RosterDisplay from "../hexRosterDisplay";
import aspectRatio from "../math";

export default function TriviaBoard() {
  // Constants, States, and Functions unique to this board
  const colors = ["green", "red", "blue", "yellow", "purple", "orange"]
  let colorIndex = 0;
  function getNextcolor() {
    const color = colors[colorIndex];
    colorIndex = (colorIndex++) % colors.length;
    return color;
  }

  // <> States that control canvas parameters
  const [hexRadius, SEThexRadius] = useState(200);
  const [separationMultiplier, SETseparationMultiplier] = useState(1.1)

  // <><><> Step 1: Create the hex roster
  // Create a center hexagon
  const centerHexagon: hexProps = { "uid": 0, "q": 0, "r": 0, "clickMessage": "Center Hexagon" }
  let hexRoster: hexProps[] = [centerHexagon]

  // First ring
  const ring1: hexProps[] = cube_ring({ "q": 0, "r": 0 }, 1);
  blackHexes(ring1);

  //Second ring
  const ring2: hexProps[] = cube_ring({ "q": 0, "r": 0 }, 2)
  colorHexes(ring2, getNextcolor);

  // Third ring
  const ring3: hexProps[] = cube_ring({ "q": 0, "r": 0 }, 3)
  blackHexes(ring3);

  // Fourth ring
  const ring4: hexProps[] = cube_ring({ "q": 0, "r": 0 }, 4)
  colorHexes(ring4, getNextcolor);

  // Gather the different rings together
  hexRoster = hexRoster.concat(ring1);
  hexRoster = hexRoster.concat(ring2);
  hexRoster = hexRoster.concat(ring3);
  hexRoster = hexRoster.concat(ring4);

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
  const [canvasHeight, SETcanvasHeight] = useState(1000 * separationMultiplier)
  const [canvasWidth, SETcanvasWidth] = useState(canvasHeight * aspectRatio())
  // Since this is a centered board, we can calculate the origin based on the height and width
  const [hexGridOrigin, SEThexGridOrigin] = useState({ x: canvasWidth / 2, y: canvasHeight / 2 })
  const canvasGlobals = {
    canvasWidth: canvasWidth, canvasHeight: canvasHeight, hexGridOrigin: hexGridOrigin,
    canvasBackgroundColor: '#000',
  }

  return <HexboardLayout id="triviaBoardContainer" displayTitle="Trivia Board"
    forms={[<CanvasParameters
      canvasWidth={canvasWidth} SETcanvasWidth={SETcanvasWidth}
      canvasHeight={canvasHeight} SETcanvasHeight={SETcanvasHeight}
      hexGridOrigin={hexGridOrigin} SEThexGridOrigin={SEThexGridOrigin}
    />,
    <BoardParameters
      hexRadius={hexRadius}
      separationMultiplier={separationMultiplier}
      SEThexRadius={SEThexRadius}
      SETseparationMultiplier={SETseparationMultiplier} hexgridOrigin={{
        x: 0,
        y: 0
      }} SEThexGridOrigin={SEThexGridOrigin} />
    ]
    } board={<Hexboard
      gameGlobals={gameGlobals}
      canvasGlobals={canvasGlobals}
      hexRoster={hexRoster}
    //   logo={logo}
    />} roster={<RosterDisplay hexRoster={hexRoster} />} />
}