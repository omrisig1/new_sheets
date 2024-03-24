import { NextFunction, Request, RequestHandler, Response } from "express";
type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;
export default function (fn: AsyncRequestHandler | RequestHandler): AsyncRequestHandler;
export {};
