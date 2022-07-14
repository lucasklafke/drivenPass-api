import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export async function validateJWT(req: Request, res: Response, next: NextFunction) {
    const token : string = req.headers["x-access-token"].toString();
    if (!token) {
        return res.status(401).send({ message: "No token provided" });
    }
    try {
        const jwtData = jwt.verify(token, process.env.JWT_SECRET);
        next();
        res.locals.jwtData  = jwtData;
    } catch (err) {
        return res.status(401).send({ message: "Invalid token" });
    }
}