import { Cell, Schema, Sheet } from "../../types/types";
declare class SheetsService {
    createSheet(json: Schema): string;
    getSheetByID(idToRead: string): Sheet;
    setCell(sheet_id: string, column_name: string, cell_data: Cell): {
        status: string;
        data: unknown;
    };
    logSheet(id: string): {
        schema: Schema;
        columns: {
            name: string;
            cells: {
                number: number;
                value: any;
            }[];
        }[] | undefined;
    };
}
declare const S: SheetsService;
export default S;
