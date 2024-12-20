import Hexagon from './Hexagon';
import { canvasGlobalsType, coordinateXY, gameGlobalsType, hexProps } from "./hexDefinitions";
import { clickMessage } from './hexFunctions';
import { directionVectors, hex_to_pixel } from './hexMath';

//style
import './hex.css';

export interface hexboardProps {
	gameGlobals: gameGlobalsType;
	canvasGlobals: canvasGlobalsType;
	hexRoster: hexProps[];
	textSize?: number;
	cssClasses?: string;
}

export default function Hexboard(props: hexboardProps) {
	// Initialize variables
	const gameGlobals = props.gameGlobals;
	const hexRoster = props.hexRoster;
	const canvasGlobals = props.canvasGlobals;
	const canvasWidth = canvasGlobals.canvasWidth;
	const canvasHeight = canvasGlobals.canvasHeight;
	const hexGridOrigin = canvasGlobals.hexGridOrigin;
	const cssClasses = props.cssClasses;
	const range = { xMin: 0, xMax: 0, yMin: 0, yMax: 0 }
	// <> Debugging logs
	// console.log(`Canvas size: ${Math.floor(canvasWidth)}, ${Math.floor(canvasHeight)}`)
	// console.log(`Grid origin: ${Math.floor(hexGridOrigin.x)}, ${Math.floor(hexGridOrigin.y)}`)

	// <> Render Functions
	// Side effect: sets range = { xMin: 0, xMax: 0, yMin: 0, yMax: 0 }
	function backBoard(hexRoster: hexProps[], gameGlobals: gameGlobalsType): string {
		// <> Find the min and max values for q and r.  Convert those to rectangular coordinates.  
		let maxRadius = 0
		hexRoster.forEach(hex => {
			const q = hex.q;
			const r = hex.r;
			const s = -q - r;
			if (Math.abs(q) > maxRadius) { maxRadius = q }
			if (Math.abs(r) > maxRadius) { maxRadius = r }
			if (Math.abs(s) > maxRadius) { maxRadius = s }
		});
		maxRadius++;
		const cornerPoints: coordinateXY[] = directionVectors.map((vector) => {
			const corner = hex_to_pixel(vector.q * maxRadius, vector.r * maxRadius, gameGlobals);
			if (corner.x < range.xMin) { range.xMin = corner.x }
			if (corner.x > range.xMax) { range.xMax = corner.x }
			if (corner.y < range.yMin) { range.yMin = corner.y }
			if (corner.y > range.yMax) { range.yMax = corner.y }
			return corner;
		})
		let returnString: string = ""
		cornerPoints.forEach((point) => {
			if (returnString !== "") { returnString += " " }
			returnString += `${point.x},${point.y}`
		})
		return returnString;

	}

	// <> Do some last minute things to the roster, like assigning unique ids if they are missing
	let hexKey = 0;
	const rectBounds = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } }
	const expandBounds = (point: { x: number, y: number }) => {
		if (point.x < rectBounds.x.min) { rectBounds.x.min = point.x }
		if (point.x > rectBounds.x.max) { rectBounds.x.max = point.x }
		if (point.y < rectBounds.y.min) { rectBounds.y.min = point.y }
		if (point.y > rectBounds.y.max) { rectBounds.y.max = point.y }
	}

	// console.log(`Rect bounds: ${JSON.stringify(rectBounds)}`)
	// Do the math for the bounding hex and box
	const backboardPoints = backBoard(hexRoster, gameGlobals);

	return (<>
		{/* <> Parent SVG */}
		< svg
			className={cssClasses}
			viewBox={`${-hexGridOrigin.x} ${-hexGridOrigin.y} ${canvasWidth} ${canvasHeight}`
			}
			style={{ rotate: "0deg", fill: "white", opacity: "0.8" }}
			xmlns="<http://www.w3.org/2000/svg>" >
			{gameGlobals.drawBackBoard && <polygon
				style={{}}
				className={`just-grid`}
				id={`backboard`}
				points={backboardPoints}
			/>}
			{/* All of the hexes */}
			{hexRoster.map((hex: hexProps) => {
				const thisHexKey = hexKey++;
				return <Hexagon
					gameGlobals={gameGlobals}
					key={thisHexKey}
					id={thisHexKey}
					q={hex.q}
					r={hex.r}
					cssClasses={hex.cssClasses}
					hexText={hex.hexText}
					clickMessage={clickMessage(hex, thisHexKey, hex.hexText)}
					expandBounds={expandBounds} />;
			})}
		</svg >
	</>)
}