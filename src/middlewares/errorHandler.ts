import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
class error {
        error : Error
}
export default async function errorHandler(Error : error, req : Request, res : Response, next : NextFunction) {
  
}