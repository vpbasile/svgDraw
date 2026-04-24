import { Box, Center, Flex } from "@chakra-ui/react";
import Hexagon from "./Hexagon";
import { canvasGlobalsType, gameGlobalsType, hexDef, HexOrientation } from "./utils/hexDefinitions";
import { hexOrientations } from "./utils/hexMath";

export type HexBoardSVGProps = {
	hexRoster: hexDef[];

	hexRadius?: number;
	separationMultiplier?: number;
	orientation?: HexOrientation;
	gameGlobals?: gameGlobalsType;
	canvasGlobals?: canvasGlobalsType;
	controlPanel?: JSX.Element;

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
	canvasGlobals,
	controlPanel,
}: HexBoardSVGProps) {
	const effectiveHexRadius = hexRadius ?? gameGlobals?.hexRadius ?? 100;
	const effectiveSeparation = separationMultiplier ?? gameGlobals?.separationMultiplier ?? 1;
	const effectiveOrientation = orientation ?? gameGlobals?.orientation ?? hexOrientations["flat-top"];
	const effectiveViewBox = viewBox ?? (canvasGlobals
		? `${-canvasGlobals.canvasWidth / 2} ${-canvasGlobals.canvasHeight / 2} ${canvasGlobals.canvasWidth} ${canvasGlobals.canvasHeight}`
		: "-300 -300 600 600");

	const svgElement = <svg
		width="100%"
		height="100%"
		viewBox={effectiveViewBox}
		preserveAspectRatio="xMidYMid meet"
		style={{ border: "2px solid" }}
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
	</svg>;

	if (!controlPanel) {
		return svgElement;
	}

	return (
		<Flex height="100vh">
			<Center flex={1}>{svgElement}</Center>
			<Box width={320} height="100vh" overflowY="auto" borderLeft="1px solid" borderColor="gray.200" p={3}>
				{controlPanel}
			</Box>
		</Flex>
	);
}
