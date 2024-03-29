import { Credential } from "@prisma/client"
import * as credentialRepository from "../repositories/credentialRepository.js"
import {getUserByEmail} from "../repositories/authRepository.js" 
import { encryptPassword, decryptPassword } from "../utils/cryptr.js"

export type CreateCredentialData = Omit<Credential, "id">

async function verifyCredentialNameAlreadyExist(credentialName : string, userId : number) {
        const credentialExist = await credentialRepository.getUserCredentialByCredentialName(userId, credentialName)
        return credentialExist
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

export async function getOneCredential(credentialId:number, userId:number) {
        
        const credential : CreateCredentialData = await credentialRepository.findOneCredential(credentialId, userId)
        if(!credential) {
                throw {type : "notFound", message : "Credential not found"}
        }
        credential.password = decryptPassword(credential.password)
        return credential
}


export async function getManyCredentials(userId:number) {
        
        const credentials : CreateCredentialData[] = await credentialRepository.findManyCredentials(userId)
        if(credentials.length === 0) {
                throw {type : "notFound", message : "Credentials not found"}
        }
        const formatedCredentials = credentials.map(credential => {
                credential.password = decryptPassword(credential.password)
                return credential
        })
        return formatedCredentials
        
}

export async function deleteCredential(credentialId:number, userId:number) {
        const credential : CreateCredentialData = await credentialRepository.findOneCredential(credentialId, userId)
        if(!credential) {
                throw {type : "notFound", message : "Credential not found"}
        }
        await credentialRepository.deleteCredential(credentialId)
        return
}