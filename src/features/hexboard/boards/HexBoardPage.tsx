import AppWrapper from "../../../common/AppWrapper";
import { BoardParameters } from "../forms";
import HexBoardSVG from "../HexBoardSVG";
import { hexDef } from "../hexDefinitions";
import { hexOrientations } from "../hexMath";

export default function HexBoardPage({ hexRoster }: { hexRoster: hexDef[] }) {
  type HexBoardState = {
    hexRadius: number;
    separationMultiplier: number;
  };


  const initialState: HexBoardState = {
    hexRadius: 40,
    separationMultiplier: 1.2,
  };

  return (
    <AppWrapper
      title="Hex Board"
      initialState={initialState}
      renderSVG={(state) => (
        <HexBoardSVG
          hexRoster={hexRoster}
          hexRadius={state.hexRadius}
          separationMultiplier={state.separationMultiplier}
          orientation={hexOrientations["flat-top"]}
          
        />
      )}
      renderControls={(state, setState) => (
        <BoardParameters
          hexRadius={state.hexRadius}
          separationMultiplier={state.separationMultiplier}
          SEThexRadius={(v) =>
            setState((s) => ({ ...s, hexRadius: typeof v === 'function' ? v(s.hexRadius) : v }))
          }
          SETseparationMultiplier={(v) =>
            setState((s) => ({ ...s, separationMultiplier: typeof v === 'function' ? v(s.separationMultiplier) : v }))
          }
        />
      )}
    />
  );
}
