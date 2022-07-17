import { Request, Response } from "express";
import * as secureNotesService from "../services/secureNotesService.js";

export async function createSecureNote(req: Request, res: Response) {
        const { title, secureNote } = req.body;
        const userId : number = res.locals.jwtData.userId
        await secureNotesService.createSecureNote(secureNote, title, userId);
        res.sendStatus(201)
        return
}