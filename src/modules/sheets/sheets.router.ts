/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-misused-promises */
import raw from "../../middleware/route.async.wrapper.js";
import C from "./sheets.controller.js";
import express from 'express';
import * as SMiddleware from '../../middleware/sheets.middle.js';


const router = express.Router();

router.use(express.json())

router.post("/",raw(SMiddleware.validateSheetSchema) ,raw(C.createSheet));

router.put("/:id" , raw(SMiddleware.validateSheetIndex), raw(SMiddleware.validateCellType),raw(SMiddleware.validateLookUp), raw(C.setCell));

router.get("/:id", raw(SMiddleware.validateSheetIndex), raw(C.getSheetByID));

export default router;


