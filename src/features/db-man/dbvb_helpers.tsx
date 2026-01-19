type expectedServerResponse = {
    serverUpSince: string;
    rowsReturned: number;
    dbResponse: unknown[];
};

/**
     * Returns the data minus the wrapper.  I KNOW I should get rid of this.
     */
export function unwrapData(data: expectedServerResponse) {
    const rowsReturned = data.rowsReturned;
    if (rowsReturned) {
        console.log(`Successful response from the server! Server has been up since ${data.serverUpSince}. Databse query returned ${rowsReturned} rows.`);
        // console.log(data.dbResponse);
        return data.dbResponse;
    }
    else return ([{ uid: 99, title: "Data unwrap failed", complete: false }]);
}

export function empty(): (arg0: unknown) => void {
    return () => { };
}

// function translateAnything() {

//     const list = [
//         { "col_1": "val_11", "col_3": "val_13" },
//         { "col_2": "val_22", "col_3": "val_23" },
//         { "col_1": "val_31", "col_3": "val_33" }
//     ];

//     function constructTable(selector: unknown) {

//         // Getting the all column names
//         const cols = Headers(list, selector);

//         // Traversing the JSON data
//         for (let i = 0; i < list.length; i++) {
//             let row = <tr />
//             for (let colIndex = 0; colIndex < cols.length; colIndex++) {
//                 let val = list[i][cols[colIndex]];

//                 // If there is any key, which is matching
//                 // with the column name
//                 if (val == null) val = "";
//                 row += <td>{val}</td>
//             }

//             // Adding each row to the table
//             $(selector).append(row);
//         }
//     }

//     function Headers(list, selector) {
//         let columns = [];
//         let header = <tr />

//         for (let i = 0; i < list.length; i++) {
//             let row = list[i];

//             for (let k in row) {
//                 if ($.inArray(k, columns) == -1) {
//                     columns.push(k);

//                     // Creating the header
//                     header += <th>k</th>
//                 }
//             }
//         }

//         // Appending the header to the table
//         $(selector).append(header);
//         return columns;
//     }

// }