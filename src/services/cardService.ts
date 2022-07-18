import {CardData} from "../controllers/cardController.js"
import * as cardRepository from "../repositories/cardRepository.js";
import { encryptPassword, decryptPassword } from "../utils/cryptr.js";


async function verifyTitleAlreadyExist(title : string, userId : number) {
        const credentialExist = await cardRepository.getTitle(userId, title)
        if(credentialExist) {
                throw {type : "conflict", message: "title already exist"}
        }
}


export async function createCard(data : CardData, userId : number) {
        const { title, number, cvv, password, type, name, expireDate } = data;
        
        await verifyTitleAlreadyExist(title, userId);

        const encryptedPassword = encryptPassword(password);
        const encryptedCvv = encryptPassword(cvv);
        
        await cardRepository.createCard({ title, number, cvv : encryptedCvv, password: encryptedPassword, type, name, expireDate }, userId);
        return 

}


