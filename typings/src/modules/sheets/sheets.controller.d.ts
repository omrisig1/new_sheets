import { Request, Response } from "express";
declare class SheetsController {
    createSheet: (req: Request, res: Response) => Promise<void>;
    setCell(req: Request, res: Response): Promise<void>;
    getSheetByID(req: Request, res: Response): Promise<void>;
}
declare const C: SheetsController;
export default C;
