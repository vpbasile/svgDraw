import { ReactNode } from "react";
import AppWrapper from "../../common/AppWrapper";
import { PageSizeKey } from "../../common/pageSizeSettings";
import HexboardSVG from "./HexBoardSVG";
import { gameGlobalsType, hexDef } from "./utils/hexDefinitions";

type HexboardWrapperProps = {
  title: string;
  defaultPageSize?: PageSizeKey;
  gameGlobals?: gameGlobalsType;
  viewBox?: string;
  hexRoster: hexDef[];
  controlPanel?: ReactNode;
};

export default function HexboardWrapper({
  title,
  defaultPageSize,
  gameGlobals,
  viewBox,
  hexRoster,
  controlPanel,
}: HexboardWrapperProps) {
  return (
    <AppWrapper<{ hexRoster: hexDef[] }>
      title={title}
      defaultPageSize={defaultPageSize}
      initialState={{ hexRoster }}
      renderSVG={(state) => (
        <HexboardSVG
          gameGlobals={gameGlobals}
          viewBox={viewBox}
          hexRoster={state.hexRoster}
          defaultPageSize={defaultPageSize}
        />
      )}
      renderControls={() => controlPanel}
    />
  );
}
