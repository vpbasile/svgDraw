
// <> Import components
import { hexClickFunction, hexagon } from '../../hexDefinitions';
import { centerHexagon, reflectAcrossAxis } from '../../hexFunctions';
import { hexOrientations } from '../../hexMath';
import { randomBounded } from '../../math';
import { BranchObject, hexplicate } from './snowFlake';

import Hexboard from '../../HexBoardSVG';
import HexboardLayout from '../../HexboardLayout';
import RosterDisplay from '../../hexRosterDisplay';
// import BoardParameters from '../../forms/BoardParameters';
// import CanvasParameters from '../../forms/CanvasParameters';

export default function Snowflake() {
	// Define the canvas and snowflake properties
	const canvasDimension = 2500;
	const branchLength = 45;

	// Build the hex Roster
	let hexRoster: hexagon[] = [centerHexagon]
	function mergeRoster(newHexes: hexagon[]): void { hexRoster = hexRoster.concat(newHexes); }

	// Function for generating all of the randomized children of the mainBranch
	function growChildren(parent: BranchObject): void {
		for (let i = 1; i < parent.roster.length; i++) {
			const childSeed = parent.roster[i];
			const childDirection = randomBounded(1, 2);
			let childLength: number;
			if (childDirection === 2) { childLength = randomBounded(1, Math.floor(i / 2)) }
			else { childLength = randomBounded(1, i) }
			const nextBranch = new BranchObject(
				{ seed: { q: childSeed.q, r: childSeed.r }, direction: childDirection, length: childLength }, parent.direction, "bg-ice");
			mergeRoster(nextBranch.roster);
		}
	}

	// Define the main branch and add it to the roster
	const mainBranch = new BranchObject({ seed: { q: 0, r: 0 }, direction: 0, length: branchLength }, null, "bg-ice");
	mergeRoster(mainBranch.roster);

	// Generate the children
	growChildren(mainBranch)
	// Take the mainBranch and its children and do all of the reflections for symmetrical branches that then have sifold symmetry
	const fullSnowflake = hexplicate(hexRoster);
	mergeRoster(fullSnowflake)
	fullSnowflake.forEach((hexagon) => { mergeRoster([reflectAcrossAxis(hexagon, "q", "bg-ice")]) })

	const gameGlobals: gameglobalsType = {
		orientation: hexOrientations['flat-top'],
		hexRadius: 8,
		separationMultiplier: 1.02,
		textSize: 0,
		drawBackBoard: false,
		onClick: function (): hexClickFunction {
			throw new Error('Function not implemented.');
		},
	};

	const canvasGlobals = {
		canvasWidth: canvasDimension,
		canvasHeight: canvasDimension,
		hexGridOrigin: {
			x: canvasDimension / 2,
			y: canvasDimension / 2
		},
		canvasBackgroundColor: '000'
	}

	return <HexboardLayout id="snowflakeBoardContainer" displayTitle='Snowflake'
		forms={[]} board={<Hexboard
			gameGlobals={gameGlobals}
			canvasGlobals={canvasGlobals}
			hexRoster={hexRoster}
			cssClasses={"viewHeight100"}
		/>}
		roster={<RosterDisplay hexRoster={hexRoster} />}
	/>
}