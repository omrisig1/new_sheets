import {getDB} from '../../db/db.connection.js';
import log from '@ajar/marker';
import {Cell, Schema, Sheet} from "../../types/types";
import {getFunctionParameters, isLookUp, lookup} from "./sheets.util.js";
import validationException from "../../exceptions/validation.exception";
class SheetsService {

    createSheet(json: Schema) {
        const method = "Service/createSheet"
        log.blue(`${method} - start`);
        const database = getDB();
        const id = (Object.keys(database).length+1).toString();
        const sheet = {
            schema : json
        }
        database[id] = sheet;
        log.blue(`${method} - end`);
        return id;
    }

    getSheetByID(idToRead: string) : Sheet {
        const method = "Service/getSheetByID"
        log.blue(`${method} - start`);
        log.blue(`${method} calling logSheet.`);
        return this.logSheet(idToRead);
    }

    setCell(sheet_id : string, column_name : string, cell_data: Cell) {
        const method = "Service/setCell"
        log.blue(`${method} - start`);
        try{
            const database = getDB();
            const sheet =  database[sheet_id];
            if (!sheet.columns){
                sheet.columns = [];
            }
            let column = sheet.columns.find(col => col.name === column_name);
            if (column) {
                let cell = column.cells.find(cell => cell.number === cell_data.number);
                if(cell) {
                    cell.value = cell_data.value
                    cell.view_value = cell_data.value
                } else {
                    column.cells.push({
                        number : cell_data.number,
                        value : cell_data.value,
                        view_value: cell_data.value
                    });
                }
            } else {
                sheet.columns.push({
                    name: column_name,
                    cells: [{
                        number : cell_data.number,
                        value : cell_data.value,
                        view_value: cell_data.value
                    }]
                })
            }
            // @ts-ignore
            let cell = sheet.columns.find(col => col.name === column_name).cells.find(cell => cell.number == cell_data.number);
            let current_cell = column_name+cell_data.number;
            let cell_value = cell_data.value
            if(isLookUp(cell_value)) {
                while(isLookUp(cell_value)) {
                    const loopup_cell_coor = getFunctionParameters(cell_value);
                    const formattedColumnName = loopup_cell_coor[0].replace(/^'(.*)'$/, '$1');
                    if(formattedColumnName+loopup_cell_coor[1] == current_cell) {
                        throw new validationException(
                            400,
                            `Circular Reference found.`
                        );
                    } else {
                        cell_value = lookup(sheet,loopup_cell_coor);
                    }
                }
                column = sheet.columns.find((col)=>col.name === column_name);
                if(column) {
                    cell = column.cells.find((col)=>col.number === cell_data.number);
                    if(cell) {
                        cell["view_value"] = cell_value;
                    }
                }
                if(!cell || !(cell["view_value"])) {
                    throw "Cell not found for set."
                }
            }
            log.blue(`${method} - end`);
            return {
                status: "success",
                data : sheet
            };
        } catch (err) {
            log.red(`${method} - error`);
            return {
                status: "error",
                data : err
            };
        }

    }

    logSheet(id: string) {
        const method = "Service/logSheet"
        log.blue(`${method} - start`);
        const database = getDB();
        const db_sheet = database[id];
        const columns = db_sheet.columns?.map(column => {
            return {
                name : column.name,
                cells : column.cells.map(cell => {
                    let cell_value = cell.value;
                    if(isLookUp(cell_value)) {
                        while(isLookUp(cell_value)) {
                            const loopup_cell_coor = getFunctionParameters(cell_value);
                            const formattedColumnName = loopup_cell_coor[0].replace(/^'(.*)'$/, '$1');
                            if(formattedColumnName+loopup_cell_coor[1] == column.name+cell.number) {
                                throw new validationException(
                                    400,
                                    `Circular Reference found.`
                                );
                            } else if(isLookUp(cell_value)){
                                cell_value = lookup(db_sheet, loopup_cell_coor);
                                if(!cell_value) {
                                    throw "Error with lookup";
                                }
                            }
                        }
                        cell["view_value"] = cell_value;
                    }
                    return {
                        number : cell.number,
                        value : cell.view_value
                    }
                })
            }
        })
        let sheet_logger = {
            schema : db_sheet.schema,
            columns : columns
        }
        log.blue(`${method} - end`);
        return sheet_logger
    }
}

const S = new SheetsService();
export default S;