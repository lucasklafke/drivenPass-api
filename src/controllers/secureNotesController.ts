import { Request, Response } from "express";
import * as secureNotesService from "../services/secureNotesService.js";

export async function createSecureNote(req: Request, res: Response) {
        const { title, secureNote } = req.body;
        const userId : number = res.locals.jwtData.userId
        await secureNotesService.createSecureNote(secureNote, title, userId);
        res.sendStatus(201)
        return
}

export async function getManyNotes(req: Request, res: Response) {
        const userId : number = res.locals.jwtData.userId
        const notes = await secureNotesService.getManyNotes(userId)
        res.send(notes)
}

export async function getOneNote(req: Request, res: Response) {
        const userId : number = res.locals.jwtData.userId
        const {noteId} : any = req.params
        const notes = await secureNotesService.getOneNote(Number(noteId),userId)
        res.send(notes)
}

export async function deleteNote(req: Request, res: Response) {
  const {id} = req.params;
  const { jwtData } = res.locals;
  await secureNotesService.deleteNote(Number(id), jwtData.userId);
  res.sendStatus(204);
}