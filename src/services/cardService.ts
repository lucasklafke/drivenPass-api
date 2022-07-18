import {CardData} from "../controllers/cardController.js"
import {Card} from "@prisma/client"
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


export async function getOneCard(cardId:number, userId:number) {
        
        const card : Card = await cardRepository.findOneCard(cardId, userId)
        if(!card) {
                throw {type : "notFound", message : "Card not found"}
        }
        if(card.userId !== userId){
                throw {type : "unauthorized", message : "You are not allowed to access this card"}
        }
        card.cvv = decryptPassword(card.cvv)
        card.password = decryptPassword(card.password)
        return card
}


export async function getManyCards(userId:number) {
        
        const cards : CardData[] = await cardRepository.findManyCards(userId)
        if(cards.length === 0) {
                throw {type : "notFound", message : "Cards not found"}
        }
        const formatedCards = cards.map(card => {
                card.password = decryptPassword(card.password)
                card.cvv = decryptPassword(card.cvv)
                return card
        })
        return formatedCards     
}

export async function deleteCard(cardId:number, userId:number) {
        const card : Card = await cardRepository.findOneCard(cardId, userId)
        if(!card) {
                throw {type : "notFound", message : "Card not found"}
        }
        if(card.userId !== userId){
                throw {type : "unauthorized", message : "You are not allowed to access this card"}
        }
        await cardRepository.deleteCard(cardId)
}
