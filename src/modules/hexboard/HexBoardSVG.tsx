import { Box, Center, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import ControlSidebar from "../../components/ControlSidebar";
import { PageSizeKey } from "../../config/pageSizeSettings";
import { BASE_VIEWBOX_EVENT } from "../../hooks/useCanvasZoom";
import Hexagon from "./Hexagon";
import { gameGlobalsType, hexDef, HexOrientation } from "./hexUtils/hexDefinitions";
import { hexOrientations } from "./hexUtils/hexMath";

type HexBoardSVGProps = {
	hexRoster: hexDef[];

	hexRadius?: number;
	separationMultiplier?: number;
	orientation?: HexOrientation;
	gameGlobals?: gameGlobalsType;
	controlPanel?: JSX.Element;
	defaultPageSize?: PageSizeKey;

	width?: number;
	height?: number;
	viewBox?: string;
};

export default function HexBoardSVG({
	hexRoster,
	hexRadius,
	separationMultiplier,
	orientation,
	viewBox,
	gameGlobals,
	controlPanel,
	defaultPageSize,
}: HexBoardSVGProps) {
	const effectiveHexRadius = hexRadius ?? gameGlobals?.hexRadius ?? 100;
	const effectiveSeparation = separationMultiplier ?? gameGlobals?.separationMultiplier ?? 1;
	const effectiveOrientation = orientation ?? gameGlobals?.orientation ?? hexOrientations["flat-top"];
	const effectiveViewBox = viewBox ?? "-300 -300 600 600";

	// Notify useCanvasZoom of the new base viewBox so it can preserve zoom/pan state
	useEffect(() => {
		document.dispatchEvent(new CustomEvent(BASE_VIEWBOX_EVENT, { detail: effectiveViewBox }));
	}, [effectiveViewBox]);

	const svgElement = (
		<Box 
		// border="2px solid" 
		width="100%" height="100%">
			<svg
				width="100%"
				height="100%"
				viewBox={effectiveViewBox}
				preserveAspectRatio="xMidYMid meet"
			>
				{hexRoster.map((hex, i) => (
					<Hexagon
						key={i}
						radius={effectiveHexRadius}
						separationMultiplier={effectiveSeparation}
						orientation={effectiveOrientation}
						q={hex.q} r={hex.r} id={hex.id.toString()} clickMessage={hex.clickMessage} color={hex.color}
						hexText={hex.hexText}
						additionalSVG={hex.additionalSVG}
					/>
				))}
			</svg>
		</Box>
	);

	return (
		<Flex height="100vh" width="100%">
			<Center id="canvas-box" flex={1} width="100%">{svgElement}</Center>
			{controlPanel ? (
				<ControlSidebar title={gameGlobals?.displayTitle ?? "HexBoardSVG"} defaultPageSize={defaultPageSize}>
					{controlPanel}
				</ControlSidebar>
			) : null}
		</Flex>
	);
}
