
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel } from "@chakra-ui/react";
import DBTable, { fieldTuple, tableData } from "../../db-man/DBTable";
import { hexDef } from "../utils/hexDefinitions";
export default function RosterDisplay(props: { hexRoster: hexDef[] }) {
	const fieldsForHexes: fieldTuple[] = [
		["q", { matchID: "q", labelText: "q", type: "number", defaultValue: "q", order: 1 },],
		["r", { matchID: "r", labelText: "r", type: "number", defaultValue: "r", order: 2 },],
		["text", { matchID: "text", labelText: "Text", type: "string", defaultValue: "Text", order: 3 },],
		["color", { matchID: "color", labelText: "Styles", type: "string", defaultValue: "color", order: 4 }],
	]


	const hexRoster = props.hexRoster
	const rosterTable: tableData[][] = hexRoster.map((hex) => { return [hex.q, hex.r, hex.hexText, hex.color] })
	return (
		<Accordion id={'hex-roster'} allowMultiple>
			<AccordionItem id='roster'>
				<AccordionButton>Roster<AccordionIcon /></AccordionButton>
				<AccordionPanel>
					<DBTable dataContents={rosterTable} fields={fieldsForHexes} newRowF={function (): void {
						throw new Error("Function not implemented.");
					}} />
				</AccordionPanel>
			</AccordionItem>
		</Accordion>


	)
}