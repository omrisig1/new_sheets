import { Sheet } from "../types/types";
export declare let db: {
    [key: string]: Sheet;
};
export declare const connect: () => void;
export declare const getDB: () => {
    [key: string]: Sheet;
};
