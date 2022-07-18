import { encryptPassword, decryptPassword } from "../utils/cryptr.js";
import * as wifiRepository from "../repositories/wifiRepository.js";
import { Wifi } from "@prisma/client";
async function verifyTitleAlreadyExist(title : string, userId : number){
        const wifi = await wifiRepository.getTitle(title, userId);
        if(wifi){
                throw {type: "conflict", message: "title already exist"}
        }
}

export async function createWifi({ title, network, password }, userId : number){
        await verifyTitleAlreadyExist(title, userId);
        const encryptedPassword = encryptPassword(password);
        const wifi = await wifiRepository.createWifi({title, network, password: encryptedPassword, userId });
}

export async function getOneWifi(wifiId:number, userId:number) {
        
        const wifi : Wifi = await wifiRepository.findOneWifi(wifiId, userId)
        if(!wifi) {
                throw {type : "notFound", message : "Wifi not found"}
        }
        if(wifi.userId !== userId){
                throw {type : "unauthorized", message : "You are not allowed to access this wifi"}
        }
        wifi.password = decryptPassword(wifi.password)
        return wifi
}


export async function getManyWifis(userId:number) {
        
        const wifis : Wifi[] = await wifiRepository.findManyWifis(userId)
        if(wifis.length === 0) {
                throw {type : "notFound", message : "wifis not found"}
        }
        const formatedWifis = wifis.map(wifi => {
                wifi.password = decryptPassword(wifi.password)
                return wifi
        })
        return formatedWifis    
}

export async function deleteWifi(wifiId:number, userId:number) {
        const wifi : Wifi = await wifiRepository.findOneWifi(wifiId, userId)

        if(!wifi) {
                throw {type : "notFound", message : "Wifi not found"}
        }
        if(wifi.userId !== userId){
                throw {type : "unauthorized", message : "You are not allowed to access this wifi"}
        }
        await wifiRepository.deleteWifi(wifiId)
}
