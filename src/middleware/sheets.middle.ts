/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Response, Request, NextFunction } from 'express';
import config from ".././config.js";
import {getDB} from '../db/db.connection.js';
import {getFunctionParameters, isLookUp, lookup} from "../modules/sheets/sheets.util.js";
import validationException from "../exceptions/validation.exception.js";
import log from "@ajar/marker";

export async function validateSheetSchema(req: Request, res: Response, next: NextFunction) : Promise<void>{
    const method = "validation/validateSheetSchema"
    log.cyan(`${method} - start`);
    if (!req.body.columns || !Array.isArray(req.body.columns)) {
        log.red(`${method} - validationException`);
        throw new validationException(
            400,
            `Field columns does not exist or not an array.`
        );
    }

    // Check each column in the 'columns' array
    for (const column of req.body.columns) {
        // Check if each column has 'name' and 'type' properties
        if (!column.name || !column.type) {
            log.red(`${method} - validationException`);
            throw new validationException(
                400,
                `Field ${JSON.stringify(column)} is missing name or type keys.`
            );
        }

        // Check if 'name' is alphabetic
        if (!/^[A-Za-z]+$/.test(column.name)) {
            log.red(`${method} - validationException`);
            throw new validationException(
                400,
                `Field ${column.name} under 'name' is not alphanumeric.`
            );
        }

        // Check if 'type' is one of the allowed types
        const allowedTypes = config.allowed_types; // Define allowed types
        if (!allowedTypes.includes(column.type)) {
            log.red(`${method} - validationException`);
            throw new validationException(
                400,
                `Field ${column.type.toString()} under 'type' is not one of the allowed types : ${config.allowed_types}`
            );
        }
    }
    log.cyan(`${method} - end`);
    next();

}

export async function validateCellType(req: Request, res: Response, next: NextFunction) : Promise<void>{
    const method = "validation/validateCellType"
    log.cyan(`${method} - start`);
    const database = getDB();
    const schema = database[req.params["id"]].schema;
    const col = schema["columns"].find(col => col.name == req.body["name"]);
    if(col) {
        const schema_type = col.type;
        if (isLookUp(req.body["value"])) {
            log.cyan(`${method} - end`);
            next();
        }
        if (schema_type != typeof req.body["value"]) {
            log.red(`${method} - validationException`);
            throw new validationException(
                400,
                `Field value ${req.body["value"]} is not allowed in this column, should be of type :  ${schema_type}.`
            );
        }
    } else {
        log.red(`${method} - validationException`);
        throw new validationException(
            400,
            `Column does not exists under schema rules for this sheet, run get sheet to see schema.`
        );
    }
    log.cyan(`${method} - end`);
    next();
}

export async function validateSheetIndex(req: Request, res: Response, next: NextFunction) : Promise<void>{
    const method = "validation/validateSheetIndex"
    log.cyan(`${method} - start`);
    const id = req.params["id"];
    const database = getDB();
    const sheet = database[id];
    if(!sheet) {
        log.red(`${method} - validationException`);
        throw new validationException(
            400,
            `Sheet ${id} does not exists.`
        );
    }
    log.cyan(`${method} - end`);
    next();
  }

export async function validateLookUp(req: Request, res: Response, next: NextFunction) : Promise<void>{
    const method = "validation/validateLookUp"
    log.cyan(`${method} - start`);
    const database = getDB();
    const db_sheet = database[req.params["id"]];
    const asking_cell_number = req.body["number"];
    let value = req.body["value"];
    const col = db_sheet.schema.columns.find(col => col.name == req.body["name"]);
    if(!col) {
        log.red(`${method} - validationException`);
        throw new validationException(
            400,
            `Lookup Cell/Column does not exists.`
        );
    }
    const schema_type_allowed = col.type;
    if(isLookUp(value)) {
        while(isLookUp(value)) {
            const lookup_cell_coor = getFunctionParameters(value);
            const formattedColumnName = lookup_cell_coor[0].replace(/^'(.*)'$/, '$1');
            if(formattedColumnName+lookup_cell_coor[1] == col.name +asking_cell_number) {
                log.red(`${method} - validationException`);
                throw new validationException(
                    400,
                    `Circular Reference found.`
                );
            } else if(isLookUp(value)){
                value = lookup(db_sheet, lookup_cell_coor);
            }
        }
        if(!value) {
            log.red(`${method} - validationException`);
            throw new validationException(
                400,
                `Lookup Cell/Column does not exists.`
            );
        }
        if (typeof value != schema_type_allowed) {
            log.red(`${method} - validationException`);
            throw new validationException(
                400,
                `Lookup Field value ${value} is not allowed in this column, should be of type : ${schema_type_allowed}.`
            );
        }
    }
    log.cyan(`${method} - end`);
    next();
}
