import { Column, Sheet } from "../../types/types";
export declare function isLookUp(input: string): boolean;
export declare function getFunctionParameters(input: string): any;
export declare function lookup(sheet: Sheet, cell_location: [string, number]): any;
export declare function lookup2(columns: Column[] | undefined, cell_location: [string, number]): any;
