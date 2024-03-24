export interface IResponseMessage {
    status: number;
    message: string;
    data?: any;
}
export interface IErrorResponse {
    status: number;
    message: string;
    stack?: string;
}
export interface DB {
    sheets: Sheet[];
}
export interface Sheet {
    schema: Schema;
    columns?: Column[];
}
export interface Column {
    name: string;
    cells: Cell[];
}
export interface Cell {
    number: number;
    value: any;
    view_value?: any;
}
export interface Schema {
    columns: columnSchema[];
}
export interface columnSchema {
    name: string;
    type: "string" | "number" | "boolean" | "double" | "int";
}
