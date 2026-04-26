import { Box, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

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

export default function DisplayAnything(props: { data: mysteryObject[] }) {
    const ourData = props.data

    let rowcount = 0;

    const headerList: dataValue[] = []
    for (const eachthing of ourData) {
        for (const key in eachthing) {
            if (!headerList.find(eachValue => (eachValue === key))) headerList.push(key)
        }
    }
    return (<Box>
        <TableContainer p={'3xl'}>
            <Table>
                <TableCaption>DisplayAnything</TableCaption>
                {/* // Build header */}
                <Thead id={'tableHead'}>
                    <Tr key={"thisHouldBeTheTableName-header"} id={"thisHouldBeTheTableName-header"}>
                        {headerList.map(eachOne => { return (<Th key={`header-${eachOne}`} className="text-left">{eachOne}</Th>) })}
                    </Tr>
                </Thead>
                {/* // Build body */}
                <Tbody>
                    {/* // Each row */}
                    {ourData.map(rowValues => {
                        const rowKey = `row-${rowcount++}`;
                        return (<Tr key={rowKey} id={rowKey}>
                            {/* Each cell */}
                            {headerList.map((headerName) => {
                                const cellKey = `row${rowKey}-${headerName}`;
                                return (<Td id={cellKey} key={cellKey}>{rowValues[headerName]}</Td>);
                            })}
                        </Tr>)
                    })}
                </Tbody>
            </Table>
        </TableContainer>
    </Box>)

}