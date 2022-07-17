import * as secureNotesRepository from "../repositories/secureNotesRepository.js";
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