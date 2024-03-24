import { Sheet } from "../../src/types/types";
export declare let test_db: () => {
    [key: string]: Sheet;
};
export declare let expected_sheet: () => {
    schema: {
        columns: {
            name: string;
            type: string;
        }[];
    };
    columns: {
        name: string;
        cells: {
            number: number;
            value: string;
        }[];
    }[];
};
export declare const input_schema: {
    columns: {
        name: string;
        type: string;
    }[];
};
export declare let expected_new_sheet: () => {
    columns: undefined;
    schema: {
        columns: {
            name: string;
            type: string;
        }[];
    };
};
export declare let expected_sheet_after_set: () => {
    schema: {
        columns: {
            name: string;
            type: string;
        }[];
    };
    columns: {
        name: string;
        cells: {
            number: number;
            value: string;
        }[];
    }[];
};
