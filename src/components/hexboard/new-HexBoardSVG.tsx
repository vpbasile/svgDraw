import Hexagon from './Hexagon';
import { canvasGlobalsType, gameGlobalsType, hexDef } from "./hexDefinitions";
import { clickMessage } from './hexFunctions';

//style
import { Box, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import SVGWrapper from '../layout/svgWrapper';
import './hex.css';

export interface hexboardProps {
	gameGlobals: gameGlobalsType;
	canvasGlobals: canvasGlobalsType;
	hexRoster: hexDef[];
	controlPanel?: JSX.Element;
	additionalContent?: JSX.Element;
	textSize?: number;
	color?: string;
}

export default function HexboardSVG(props: hexboardProps) {
	// Initialize variables
	const gameGlobals = props.gameGlobals;
	const hexRoster = props.hexRoster;
	const canvasGlobals = props.canvasGlobals;
	const canvasWidth = canvasGlobals.canvasWidth;
	const canvasHeight = canvasGlobals.canvasHeight;
	// <> Debugging logs
	// console.log(`Canvas size: ${Math.floor(canvasWidth)}, ${Math.floor(canvasHeight)}`)
	// console.log(`Grid origin: ${Math.floor(hexGridOrigin.x)}, ${Math.floor(hexGridOrigin.y)}`)

	// <> Render Functions

	// <> Do some last minute things to the roster, like assigning unique ids if they are missing
	let hexKey = 0;

	const buildControlPanel = <Box id='control-panel-hexboard'>
		<Heading as={'h2'}><Link to='/hex/'>HexBoardSVG</Link></Heading>
		<Box id='control-panel-hexboard-children' border={'2px'}>
			<Heading as={'h3'}>{gameGlobals.displayTitle}</Heading>
			{props.controlPanel}
		</Box>
	</Box>;
	const buildAdditionalContent = <>
		{/* <HexBoardIndex /> */}
		{props.additionalContent}</>;
	// TODO Add a flag that gets thrown the first time a child is out of bounds
	return (<>
		{/* <> Parent SVG */}
		<SVGWrapper width={canvasWidth} height={canvasHeight} displayTitle={'HexBoardSVG'}  controlPanel={buildControlPanel} additionalContent={buildAdditionalContent}
			// The HeaxBoardSVG component assumes that the origin is in the center of the canvas
			centerOrigin
		// TODO Add these properties to SVGWrapper
		// id="triviaBoardContainer"
		>
			{/* All of the hexes */}
			{hexRoster.map((hex: hexDef) => {
				const thisHexKey = hexKey++;
				return <Hexagon
					key={thisHexKey}
					id={thisHexKey.toString()}
					q={hex.q}
					r={hex.r}
					color={hex.color}
					hexText={hex.hexText}
					gameGlobals={gameGlobals}
					// TODO I should only pass down the parts of gameGlobals that are needed, or maybe Redux would be better
					clickMessage={clickMessage(hex, thisHexKey, hex.hexText)} />;
			})}
		</SVGWrapper>
	</>)
}