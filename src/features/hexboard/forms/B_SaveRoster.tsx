import { Button, Container } from "@chakra-ui/react";
import { hexDef } from "../utils/hexDefinitions";

export default function SaveRosterButton(props: {
	hexRoster: hexDef[]
}) {
	const hexRoster = props.hexRoster;

	const saveRoster = (hexRoster: hexDef[]) => {
		const exportObject: { hexRoster: hexDef[] } = {
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

	return (<Container key={"saveRosterButton"} color={'green.500'}>
		<Button onClick={() => saveRoster(hexRoster)} >Save Roster</Button>
	</Container>)
}