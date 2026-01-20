import { Bounds, computeHexBoardBounds } from "./computeBounds";
import Hexagon from "./Hexagon";
import { hexDef, HexOrientation } from "./hexDefinitions";

type Props = {
	hexRoster: hexDef[];
	hexRadius: number;
	separationMultiplier: number;
	orientation: HexOrientation;
	boundsDefault?: Bounds;
};

export default function HexBoardSVG({
	hexRoster,
	hexRadius,
	separationMultiplier,
	orientation,
	boundsDefault
}: Props) {
	const bounds = boundsDefault || computeHexBoardBounds(hexRoster, hexRadius);

	return <svg
			width="100%"
			height="100%"
			viewBox={`${bounds.minX} ${bounds.minY} ${bounds.width} ${bounds.height}`}
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
