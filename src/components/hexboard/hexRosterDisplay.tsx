
import DBTable, { fieldTuple, tableData } from "../db-man/DBTable";
import { hexagon } from "./hexDefinitions";

export default function RosterDisplay(props: { hexRoster: hexagon[] }) {
	const fieldsForHexes: fieldTuple[] = [
		["q", { matchID:"q", labelText: "q", type: "number", defaultValue: "q", order: 1 },],
		["r", { matchID:"r", labelText: "r", type: "number", defaultValue: "r", order: 2 },],
		["text", { matchID:"text", labelText: "Text", type: "string", defaultValue: "Text", order: 3 },],
		["cssClasses", { matchID:"cssClasses", labelText: "Styles", type: "string", defaultValue: "cssClasses", order: 4 }],
	]


	const hexRoster = props.hexRoster
	const rosterTable: tableData[][] = hexRoster.map((hex) => { return [hex.q, hex.r, hex.hexText, hex.cssClasses] })
	return (
		<DBTable dataContents={rosterTable} fields={fieldsForHexes} newRowF={function (): void {
			throw new Error("Function not implemented.");
		}} />

	)
}