import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/http.exception";
export declare const responseWithError: (err: HttpException, req: Request, res: Response, next: NextFunction) => void;
export declare const urlNotFoundHandler: (req: Request, res: Response, next: NextFunction) => void;
export declare const not_found: (req: Request, res: Response) => void;
