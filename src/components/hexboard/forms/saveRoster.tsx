import { Button, Container } from "@chakra-ui/react";
import { hexagon } from "../hexDefinitions";
import { formAttributes } from "./style";

export default function SaveRosterButton(props: {
	hexRoster: hexagon[],
	gameGlobals: gameglobalsType
}) {
	const hexRoster = props.hexRoster;
	const gameGlobals = props.gameGlobals;

	const saveRoster = (hexRoster: hexagon[]) => {
		const exportObject: { gameGlobals: gameglobalsType, hexRoster: hexagon[] } = {
			gameGlobals: gameglobalsType,
			hexRoster: hexRoster
		}

		const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
			JSON.stringify(exportObject)
		)}`;

		const link = document.createElement("a");
		link.href = jsonString;
		link.download = "data.json";
		link.click();
	};

	// function exportSVG() {
	// 	let tempSVG = <svg viewBox={`0 0 ${gameGlobals.canvasWidth} ${gameGlobals.canvasHeight}`}
	// 	style={{ rotate: "0deg", fill: "white", opacity: "0.8" }}
	// 	xmlns="<http://www.w3.org/2000/svg>">
	// 		{}
	// 	</svg>

	// }

	return (<Container key={"saveRosterButton"} sx={formAttributes} color={'green.500'}>
		<Button onClick={() => saveRoster(hexRoster)} >Save Roster</Button>
	</Container>)
}