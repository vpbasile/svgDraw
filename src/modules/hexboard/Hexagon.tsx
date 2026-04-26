import { SVGPart } from '../../types';
import { HexOrientation } from './utils/hexDefinitions';
import { calcTheta, hex_to_pixel } from './utils/hexMath';

type hexagonProps = {
	// gameGlobals: gameGlobalsType,
	q: number,
	r: number,
	radius: number,
	orientation: HexOrientation,
	separationMultiplier: number,
	hexText?: string,
	textSize?: number,
	color?: string,
	id: string,
	clickMessage: string
	additionalSVG?: SVGPart
}

export default function Hexagon(props: hexagonProps) {
	// Cache global variables
	const hexRadius = props.radius;
	const orientation = props.orientation;
	const cornerAngles = orientation.cornerAngles
	const separationMultiplier = props.separationMultiplier
	// Coordinates
	const { q, r, id, additionalSVG } = props
	// const s = -q - r;
	// Math
	const hexText = props.hexText
	// If the text size is not defined, default to 75pt
	const hexTextSize = props.textSize || 75

	const center = hex_to_pixel(q, r, hexRadius, orientation, separationMultiplier)

	// Find the X and Y of each corner
	let polygonString = ""
	cornerAngles.map(angle => {
		const theta = calcTheta(angle)
		const x = Math.floor(center.x + hexRadius * Math.cos(theta))
		const y = Math.floor(center.y + hexRadius * Math.sin(theta))
		// console.log(`corner: ${angle} ${x},${y}`)
		// if this is not the first corner, then we need to add a space
		if (polygonString !== "") { polygonString += " " }
		return polygonString += `${x},${y}`
	});

	const color = props.color;

	function displayText() {
		if (hexText !== undefined) {
			return (<text
				className='hexText'
				x={center.x}
				y={center.y}
				textAnchor="middle"
				alignmentBaseline="middle"
				fontSize={`${hexTextSize}px`}
			>
				{hexText}
			</text>)
		}

	}
	const textForHex = displayText()

	if (additionalSVG) console.log(`Additional SVG provided for group ${id}`)
	// Make the SVG
	return (
		<g key={`${id}`} id={`group-${id}`} onClick={() => console.log(props.clickMessage)}>
			{/* The group is needed to make the text and hexagon work together */}
			<polygon
				style={{}}
				className={`hex`}
				fill={color}
				id={`hex-${id}`}
				points={polygonString}
			/>
			{textForHex}
			{additionalSVG}
		</g>
	)
}