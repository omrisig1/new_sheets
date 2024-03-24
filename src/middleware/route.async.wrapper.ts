import { NextFunction, Request, RequestHandler, Response } from "express";

type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction)=> Promise<void> 

export default function (fn: AsyncRequestHandler | RequestHandler) :AsyncRequestHandler {
    return async function (req: Request, res: Response, next: NextFunction): Promise<void>  {
        try{
            await fn(req, res, next);
        } catch (err) {
            next(err);
        }
    };
}