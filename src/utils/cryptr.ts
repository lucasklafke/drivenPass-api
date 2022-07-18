import cryptr from "cryptr"
import dotenv from "dotenv"
dotenv.config()

export function encryptPassword(password : string) {
    const cryptrInstance = new cryptr(process.env.CRYPTR_SECRET)
    return cryptrInstance.encrypt(password)
}

export function decryptPassword(encryptedPassword : string) {
    const cryptrInstance = new cryptr(process.env.CRYPTR_SECRET)
    return cryptrInstance.decrypt(encryptedPassword)
}