import { Credential } from "@prisma/client"
import * as credentialRepository from "../repositories/credentialRepository.js"
import {getUserByEmail} from "../repositories/authRepository.js" 
import cryptr from "cryptr"
import dotenv from "dotenv"
dotenv.config()

export type CreateCredentialData = Omit<Credential, "id">

async function verifyCredentialNameAlreadyExist(credentialName : string, userId : number) {
        const credentialExist = await credentialRepository.getUserCredentialByCredentialName(userId, credentialName)
        return credentialExist
}
function encryptPassword(password : string) {
    const cryptrInstance = new cryptr(process.env.CRYPTR_SECRET)
    return cryptrInstance.encrypt(password)
}

function decryptPassword(encryptedPassword : string) {
    const cryptrInstance = new cryptr(process.env.CRYPTR_SECRET)
    return cryptrInstance.decrypt(encryptedPassword)
}

export async function createCredential(CreateCredentialData: CreateCredentialData, email: string) {
        const { credentialName, url, username, password, userId } = CreateCredentialData;
        
        const user = await getUserByEmail(email)
        if(!user) {
                throw {type : "notFound", message : "User not found"}
        }


        const credentialExist = await verifyCredentialNameAlreadyExist(credentialName, user.id);
        if(credentialExist.length !== 0) {
                throw {type : "conflict", message : "Credential already exist"}
        }

        const encryptedPassword = encryptPassword(password)
        const data = {
                credentialName,
                url,
                username,
                password: encryptedPassword,
                userId: user.id,
        }
        await credentialRepository.createCredential(data)
        return
}