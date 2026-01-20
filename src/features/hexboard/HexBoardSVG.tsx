import Hexagon from "./Hexagon";
import { hexDef, HexOrientation } from "./utils/hexDefinitions";

export type HexBoardSVGProps = {
	hexRoster: hexDef[];

	hexRadius: number;
	separationMultiplier: number;
	orientation: HexOrientation;

	width?: number;
	height?: number;
	viewBox: string;
};

export default function HexBoardSVG({
	hexRoster,
	hexRadius,
	separationMultiplier,
	orientation,
	viewBox,
}: HexBoardSVGProps) {

	return <svg
		width="100%"
		height="100%"
		viewBox={viewBox}
		preserveAspectRatio="xMidYMid meet"
	>
		{hexRoster.map((hex, i) => (
			<Hexagon
				key={i}
				radius={hexRadius}
				separationMultiplier={separationMultiplier}
				orientation={orientation}
				q={hex.q} r={hex.r} id={hex.id.toString()} clickMessage={hex.clickMessage} color={hex.color}
				hexText={hex.hexText}
				additionalSVG={hex.additionalSVG}
			/>
		))}
	</svg>
}
