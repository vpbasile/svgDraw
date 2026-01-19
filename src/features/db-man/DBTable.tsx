/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Input } from "@chakra-ui/react/input";
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react/table";
import { useState } from "react";
import ListSelect, { optionForDropdown } from "./db-tableselect";

// <> Types used wihen working with tables
// ---------------------------------------------
// <> FIXME these live in two places - here and on the server.  Find a better way to deal with that
// ---------------------------------------------
export type list = number;
export type listMulti = number;
export type tableData = string | number | boolean | list | listMulti | undefined;
export type fieldType = "string" | "number" | "boolean" | "list" | "list-multi" | "lookedUp" | "uid";
export type field = {
	labelText: string;
	type: fieldType;
	order: number;
	matchID: string;
	defaultValue?: tableData;
	changeFunction?: (arg0: any) => void;
	listTable?: string;
	choices?: optionForDropdown[]
	displayKey?: string;
	// url?: URL;
};
export type fieldTuple = [string, field];
export interface mysteryObject { [index: string]: tableData }
export type optionTranslator = (arg0: string, arg1: mysteryObject[]) => optionForDropdown[];
export type setter = React.Dispatch<any> | undefined;

export type handlerTuple = [string, {
	state: tableData;
	setter: setter
	translator?: optionTranslator;
}];

// <> Define component props
type propsTable = {
	dataContents: tableData[][];
	fields: fieldTuple[];
	editable?: boolean;
	setTempData?: (rowid: number) => void;
	handlers?: handlerTuple[]
	newRowF?: (arg0: any) => void;
}


export default function DBTable(props: propsTable) {
	//  <> Cache and initialize
	const data = props.dataContents;
	const editable = props.editable;
	const fields: fieldTuple[] = props.fields;
	const handlers = props.handlers;
	const setTempData = props.setTempData

	let indexRow = 1;


	// <> States
	const [isEditing, selectForEdit] = useState<number | null>(null)


	// ---------------------------------------------
	// <> Table helper functions
	// ---------------------------------------------

	// <> Various cells: Display, Checkbox, and buttons
	function cellDisplay(contentsCell: tableData, matchID: string, labeltext: string, rowNum: number) {
		const cellKey = `row${rowNum}-${matchID}`
		if (typeof (contentsCell) === "boolean") return cellCheck(contentsCell as boolean, matchID, labeltext)
		return <Td id={cellKey} key={matchID}> {contentsCell} </Td>;
	}
	/**
	* A cell for inputting data appropriately
	 * 
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	function cellInput(contentsCell: tableData, field: fieldTuple, onChange: setter, translator?: optionTranslator, disabled?: boolean) {
		const [matchID, fieldDef] = field
		const typeCell = fieldDef.type
		const labeltext = fieldDef.labelText
		const keyID = `input-` + matchID;
		// console.log("matchID", matchID, "type", typeCell, "contentsCell", contentsCell)
		// if(disabled===undefined){}
		switch (typeCell) {
			case undefined: return <Td key={keyID} id={keyID}>UND</Td>
			case 'boolean': return cellCheck(contentsCell as boolean, matchID, labeltext)
			case "number": return <Td key={keyID} id={keyID} >
				<Input type="number" key={keyID} id={keyID} name={labeltext} defaultValue={contentsCell as number} disabled={disabled} onChange={onchange as setter} />
				<label key={keyID + '-label'} htmlFor={labeltext}>{labeltext}</label>
			</Td>;
			case 'list': {
				// console.log("Select list")
				return <Td key={keyID} id={keyID}><ListSelect field={field} selectedOption={contentsCell as number} onChange={onChange as setter} translator={translator as optionTranslator} />
				</Td>;
			}
			case 'list-multi': return <Td key={keyID} id={keyID}>{contentsCell} </Td>;
			case 'string': return <Td key={keyID} id={keyID} >
				<Input key={keyID} name={labeltext} id={keyID} defaultValue={contentsCell as string} disabled={disabled} />
				<label key={keyID + '-label'} className="hidden" htmlFor={labeltext}>{labeltext}</label>
			</Td>;
			case 'uid': return <Td key={keyID} id={keyID} className="uid">{contentsCell}</Td>;
			case 'lookedUp': return <Td key={keyID} id={keyID} className="text-red-500">{contentsCell}zzz</Td>;
			default: console.log(`Field type not implemented: ${typeCell}`); return <Td key={keyID} id={keyID}></Td>
		}

	}
	function cellCheck(value: boolean, matchID: string, labeltext: string) {
		const indexCell = matchID + '-check'
		return <Td key={indexCell}>
			<Input type="checkbox" id={matchID} name={matchID} defaultChecked={value} />
			<label htmlFor={matchID} className="hidden">{labeltext}</label>
		</Td>;
	}

	// <> Matching buttons
	function cellButton(text: string, callbackF: () => void, key: number | string) {
		return <Td key={key}><button value={text} onClick={callbackF}>{text}</button></Td>
	}
	function cellSubmit(key: string | number) {
		return <Td key={key}><button type="submit" onClick={() => {
			// props.newRowF(null)
			selectForEdit(null)
		}}>Submit</button></Td>
	}
	function cellEditButton(rowID: number) {
		return (cellButton("Edit", () => {
			(setTempData as (rowid: number) => void)(rowID)
			selectForEdit(rowID)
		}, "edit"))
	}

	// <> Table rows
	function tableHeader(headers: tableData[]) {
		// console.log("headers", headers)
		const rowKey = "thisHouldBeTheTableName-header"
		return (
			<Thead id={rowKey}>
				<Tr key={rowKey} id={rowKey}>
					{headers.map(eachOne => { return (<Th key={`header-${eachOne}`} className="text-left">{eachOne}</Th>) })}
				</Tr>
			</Thead>
		)
	}

	function rowDisplay(rowNum: number, rowValues: tableData[], isEditing: boolean, fields: fieldTuple[]) {
		const rowKey = `row-${rowNum}`;
		const iterableFields = Array.from(fields.entries())
		if (isEditing) return rowEdit(rowNum, fields, handlers as handlerTuple[], rowValues)
		else return (<Tr key={rowKey} id={rowKey}>
			{/* Display cells */}
			{iterableFields.map(([index, tuple]) => {
				return cellDisplay(rowValues[index], tuple[0], tuple[1].labelText, rowNum)
			})}
			{editable && cellEditButton(rowNum)}
		</Tr>)
	}
	/**
	* A row containing appropriate fields for each column.  If it's an existing rowm the fields are populated with data.  If it's new...
	*/

	function rowEdit(rowNum: number, fields: fieldTuple[], handlers: handlerTuple[], rowValues?: tableData[]) {
		const rowKey = `row-${rowNum}`;
		// console.log("fields", fields)
		const iterable = Array.from(fields.entries())
		let newRow: tableData[]
		if (rowValues) newRow = [...rowValues];  // If an existing record was passed in, populate the fields with it.
		else newRow = [...iterable.map(val => { return val[1][1].defaultValue })] as tableData[] // If nothing was passed in, then populate it with the default values of each field.
		// Now that the data is all square, display it.
		return (<Tr key={rowKey} id={rowKey}>
			{iterable.map(([fieldIndex, fieldTuple]) => {
				const matchID = fieldTuple[0];
				const handlersForThis = (handlers.find((eachRow) => { return (eachRow[0] === matchID) }) || ['nothing', null])[1]
				if (!handlersForThis) {
					// FIXME - CONTINUE HERE - It's not finding the handlers - probably because I need to look at the new value I added to the category fields
					console.log(`No handlers for ${matchID}`)
					const cellKey = `input-${matchID}`;
					// console.log(`No handlers for ${matchID}`); 
					return <Td key={cellKey} id={cellKey}>{fieldTuple[1].defaultValue}</Td>
				}
				else {
					if (matchID === "uid") return <Td key={`edit-${matchID}`} id={`edit-${matchID}`}>UID</Td>
					const setter = handlersForThis.setter;
					const translator = handlersForThis.translator;
					// <><> I can't call the setter here  I have to do it somewehre else
					// setter(newRow[fieldIndex]) 
					return cellInput(newRow[fieldIndex], fieldTuple, setter, translator)
				}
			})}
			{/* The row ends with a submit button */}
			{cellSubmit(`row${rowNum}-submit`)}
		</Tr>)
	}

	function createRow(rowNum: number, fields: fieldTuple[]) {
		const rowKey = "createRow";
		let indexCell = 0;
		return (<Tr key={rowKey} id={rowKey}>
			{Array.from(fields.entries()).map((_thisField, index) => <Td key={`row${rowNum}-col${index}`}></Td>)}
			{cellButton("New", () => selectForEdit(0), indexCell++)}
		</Tr>)
	}
	const fieldNames: string[] = [...fields.entries()].map((thisField) => { return (thisField[1][1].labelText) })
	// console.log("fields", fields, "fieldNames", fieldNames)
	// <> Come back with the table
	const tableID = "thisHouldBeTheTableName"
	return (
		<TableContainer>
			<Table id={tableID}>
				{tableHeader(fieldNames)}
				<Tbody>
					{data.map((contentsRow) => {
						const numIndex = indexRow++;
						return rowDisplay(numIndex, contentsRow, (numIndex === isEditing), fields);
					})}
					{(isEditing === null && editable) && createRow(0, fields)}
					{(isEditing === 0 && editable) && rowEdit(indexRow, fields, handlers as handlerTuple[])}
				</Tbody>
			</Table>
		</TableContainer>
	);
}