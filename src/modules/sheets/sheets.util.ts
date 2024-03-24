import {Column, Sheet} from "../../types/types";
import log from "@ajar/marker";
export function isLookUp(input: string): boolean {
    const method = "util/isLookUp";
    log.magenta(`${method} - start`);
    const pattern = /^lookup\('[A-Za-z]+',\d+\)$/;
    log.magenta(`${method} - end`);
    return pattern.test(input); // Test if the input matches the pattern
}


export function getFunctionParameters(input: string): any {
    const method = "util/getFunctionParameters";
    log.magenta(`${method} - start`);
    try{
        const [functionName, ...params] = input.split('(');
        const parsedParams = params.join('(').slice(0, -1); // Remove trailing ")"
        log.magenta(`${method} - end`);
        return parsedParams.split(',').map(param => param.trim());
    }
    catch(err) {
        throw "Error getting function parameters.";
    }


}

export function lookup(sheet : Sheet, cell_location :  [string, number]) {
    const method = "util/lookup";
    log.magenta(`${method} - start`);
    let result;
    const formattedColumnName = cell_location[0].replace(/^'(.*)'$/, '$1');
    const column = sheet.columns?.find(col => col.name === formattedColumnName);
    if(column) {
        const cell = column.cells.find(cell => cell.number == cell_location[1]);
        if(cell) {
            result = cell["value"];
        }
    }
    log.magenta(`${method} - end`);
    return result;
}

//FOR CLASS WAY
export function lookup2(columns : Column[] | undefined, cell_location :  [string, number]) {
    const method = "util/lookup";
    log.magenta(`${method} - start`);
    let result;
    const formattedColumnName = cell_location[0].replace(/^'(.*)'$/, '$1');
    const column = columns?.find(col => col.name === formattedColumnName);
    if(column) {
        const cell = column.cells.find(cell => cell.number == cell_location[1]);
        if(cell) {
            result = cell["value"];
        }
    }
    log.magenta(`${method} - end`);
    return result;
}