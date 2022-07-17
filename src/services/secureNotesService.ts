import * as secureNotesRepository from "../repositories/secureNotesRepository.js";
import {Note} from "@prisma/client"
type CreateNoteData = Omit<Note, "id">
async function verifyTitleAlreadyExist(title: string,userId : number) {
        const titleAlreadyExist = await secureNotesRepository.findNoteByTitleAndUserId(title,userId)
        return titleAlreadyExist
}
export async function createSecureNote(secureNote : string, title : string, userId: number){
        const titleAlreadyExist = await verifyTitleAlreadyExist(title,userId)
        if(titleAlreadyExist){
                throw {type : "conflict", message : "Title already exist"}
        }
        await secureNotesRepository.createSecureNote(secureNote, title, userId);
}

export async function getOneNote(noteId:number, userId:number) {
        
        const note : CreateNoteData = await secureNotesRepository.findOneNote(noteId, userId)
        if(!note) {
                throw {type : "notFound", message : "Note not found"}
        }
        
        return note
}


export async function getManyNotes(userId:number) {
        
        const notes : CreateNoteData[] = await secureNotesRepository.findManyNotes(userId)
        if(notes.length === 0) {
                throw {type : "notFound", message : "Credentials not found"}
        }
        
        return notes     
}

export async function deleteNote(noteId:number, userId:number) {
        const note : CreateNoteData = await secureNotesRepository.findOneNote(noteId, userId)
        if(!note) {
                throw {type : "notFound", message : "Note not found"}
        }
        await secureNotesRepository.deleteNote(noteId)
}