/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Request, Response } from "express";
import S from "./sheets.service.js";
import log from "@ajar/marker";


class SheetsController {
    createSheet = async (req: Request, res: Response):Promise<void> => {
        const method = "controller/createSheet"
        log.green(`${method} - start`);
        log.green(`${method} - calling service/createSheet`)
        const id = S.createSheet(req.body);
        const outputResponse = {
            status: 200,
            message: "Sheet Created successfully.",
            data: {
                sheet_id : id,
                body : req.body
            },
        };
        log.green(`${method} - end`);
        res.status(outputResponse.status).json(outputResponse);
    }

     async  setCell(req: Request, res: Response): Promise<void> {
         const method = "controller/setCell"
         log.green(`${method} - start`);
         log.green(`${method} - calling service/setCell`)
         const result =  S.setCell(req.params["id"], req.body["name"], req.body);
         const parsed_response = {
             status: result.status == 'success' ? 200 : 400,
             message: result.status == 'success' ? 'Cell Set Successfully' : 'Cell Un-Successfully set',
             data: result.data,
         };
         log.green(`${method} - end`);
         res.status(parsed_response.status).json(parsed_response);

    }

     async  getSheetByID(req: Request, res: Response): Promise<void> {
         const method = "controller/getSheetByID"
         log.green(`${method} - start`);
         log.green(`${method} - calling service/getSheetByID`);
         const result = S.getSheetByID(req.params["id"]);
         const outputResponse = {
             status: 200,
             message: "Sheet has been fetched successfully.",
             data: result,
         };
         log.green(`${method} - end`);
         res.status(outputResponse.status).json(outputResponse);
    }
}

const C = new SheetsController();
export default C;