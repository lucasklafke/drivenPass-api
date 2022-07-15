import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
export async function validateJWT(req: Request, res: Response, next: NextFunction) {
    const {email, password} : User = req.body;

    const authorization = req.headers["authorization"];
    const token : string = authorization.replace("Bearer ", "").trim()
    if (!token) {
        throw {type : "unauthorized", message : "No token provided"}
    }
    
    const jwtData  = jwt.verify(token, process.env.JWT_SECRET);
    if(jwtData["email"] !== email) {
        console.log("token",jwtData)
        throw {type : "unauthorized", message : "Invalid User"}
    }
    res.locals.jwtData  = jwtData;
    next();
}