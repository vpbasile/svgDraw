import { Box, Button, Input, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useState } from "react";
import { fieldTuple, optionTranslator, setter, tableData } from "./DBTable";


// type prospType = {
//     // [key: string | number]: unknown;
//     first: string;
//     second: string;
//     third: string;
// };
type dataValue = string | number;
type mysteryObject = {
    [key: dataValue]: dataValue;
};

export default function DisplayTable(props: { data: mysteryObject[], fieldDefs: fieldTuple[] }) {
    const ourData = props.data
    const fieldDefs = props.fieldDefs


    // <> States and other global variables
    const [isEditing, selectForEdit] = useState<number | null>(null)
    console.log("isEditing", isEditing)
    let rowcount = 0;

    // Build the total list of fields that are present
    const headerList: dataValue[] = []
    for (const eachthing of ourData) {
        for (const key in eachthing) {
            if (!headerList.find(eachValue => (eachValue === key))) headerList.push(key)
        }
    }

    // Filter it to only the list of fields specified

    const filteredList = headerList.filter(value => {
        // Check if the value is present in any of the field tuples
        return fieldDefs.some(([fieldName, fieldInfo]) => {
            return fieldName === value || (fieldInfo.displayKey && fieldInfo.displayKey === value);
        });
    });

    // <> FIXME Log to the console to indicate all of the fields that were filtered out for easy debugging.
    const removedFields = headerList.filter(x => !filteredList.includes(x))
    console.log('Filtering out the following fields because they were not present in fieldDefs:', removedFields)


    return (<Box>
        <TableContainer p={'3xl'}>
            <Table>
                <TableCaption>DisplayAnything</TableCaption>
                {/* // Build header */}
                <Thead id={'tableHead'}>
                    <Tr key={"thisHouldBeTheTableName-header"} id={"thisHouldBeTheTableName-header"}>
                        {filteredList.map(eachOne => { return (<Th key={`header-${eachOne}`} className="text-left">{eachOne}</Th>) })}
                    </Tr>
                </Thead>
                {/* // Build body */}
                <Tbody>
                    {/* // Each row */}
                    {ourData.map(rowValues => {
                        const rowKey = `row-${rowcount++}`;
                        return tableRowDisplay(rowKey, filteredList, rowValues)
                    })}
                    {createRow(rowcount++, fieldDefs)}
                </Tbody>
            </Table>
        </TableContainer>
    </Box>)

    function tableRowDisplay(rowKey: string, filteredList: dataValue[], rowValues: mysteryObject) {
        console.log("rowValues", rowValues, "filteredList", filteredList)
        return <Tr key={rowKey} id={rowKey}>
            {/* Each cell */}
            {fieldDefs.map((fieldTuple) => {
                const fieldProfile = fieldTuple[1]
                const matchID = fieldProfile.matchID;
                const cellKey = `row${rowKey}-${matchID}`;
                // FIXME this seems the incorrect way to do this.  How could I pass down less from the parent function?
                const cellContents = rowValues[matchID];
                return (<Td id={cellKey} key={cellKey}>{cellContents}</Td>);
            })}
        </Tr>;
    }

    function createRow(rowNum: number, fields: fieldTuple[]) {
        console.log("ROWNUM", rowNum, "fields", fields)
        const rowKey = "createRow";
        let indexCell = 0;
        return (<Tr key={rowKey} id={rowKey}>
            {Array.from(fields.entries()).map(thisField => {
                const zzzz = thisField[1];
                const fieldDef = zzzz[1]
                return cellInput("contents", zzzz, fieldDef.changeFunction);
            })

            }
            {cellButton("New", () => selectForEdit(0), indexCell++)}
        </Tr>)
    }

    // <> Input
    function cellInput(contentsCell: tableData, field: fieldTuple, onChange: setter, translator?: optionTranslator, disabled?: boolean) {
        console.log("cellInput", contentsCell, field, onChange, translator, disabled)
        const [matchID, fieldDef] = field
        const typeCell = fieldDef.type
        const labeltext = fieldDef.labelText
        const keyID = `input-` + matchID;
        console.log(onchange, translator)
        // console.log("matchID", matchID, "type", typeCell, "contentsCell", contentsCell)
        // if(disabled===undefined){}
        switch (typeCell) {
            case undefined: return <Td key={keyID} id={keyID}>UND</Td>
            // case 'boolean': return cellCheck(contentsCell as boolean, matchID, labeltext)
            case "number": return <Td key={keyID} id={keyID} >
                <Input type="number" key={keyID} id={keyID} name={labeltext} defaultValue={contentsCell as number} disabled={disabled} onChange={onchange as setter} />
                <label key={keyID + '-label'} htmlFor={labeltext}>{labeltext}</label>
            </Td>;
            // case 'list': {
            //     // console.log("Select list")
            //     return <Td key={keyID} id={keyID}><ListSelect field={field} selectedOption={contentsCell as number} onChange={onChange as setter} translator={translator as optionTranslator} />
            //     </Td>;
            // }
            case 'list-multi': return <Td key={keyID} id={keyID}>{contentsCell} </Td>;
            case 'string': return <Td key={keyID} id={keyID} >
                <Input key={keyID} name={labeltext} id={keyID} defaultValue={contentsCell as string} disabled={disabled} />
                <label key={keyID + '-label'} className="hidden" htmlFor={labeltext}>{labeltext}</label>
            </Td>;
            case 'uid': return <Td key={keyID} id={keyID} className="uid">{contentsCell}</Td>;
            case 'lookedUp': return <Td key={keyID} id={keyID} className="text-red-500">{contentsCell}zzz</Td>;
            default: console.log(`Field type not implemented: ${typeCell}`); return <Td key={keyID} id={keyID}>{contentsCell}</Td>
        }

    }

    // <> Matching buttons
    function cellButton(text: string, callbackF: () => void, key: number | string) {
        return <Td key={key} id={`${key}`}><Button value={text} onClick={callbackF}>{text}</Button></Td>
    }
}
