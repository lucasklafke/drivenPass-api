import client from "../config/db.js";
import {Note} from "@prisma/client"

export async function findNoteByTitleAndUserId(title: string, userId : number) {
        const note : Note[] = await client.note.findMany({ where: { title, userId } });
        return note[0];
}

export async function createSecureNote(note : string, title : string, userId : number){
        await client.note.create({ data: { title, note, userId } });
}