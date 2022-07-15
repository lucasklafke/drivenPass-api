import { User } from "../controllers/authController.js";
import * as authRepository from "../repositories/authRepository.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt"
dotenv.config();

async function verifyUserAlreadyExists(email : string) {
        const user = await authRepository.getUserByEmail(email);
        return user
}

function generateToken(email : string){
        return jwt.sign({email}, process.env.JWT_SECRET, {expiresIn : "1h"})
        
}
function comparePassword(password : string, hash : string){
        return bcrypt.compare(password, hash)
}
function generateHashPassword(password : string){
        const salt : number = Number(process.env.BCRYPT_SALT)
        return bcrypt.hashSync(password, salt)
}

export async function signUp({email, password} : User){
        const userExist = await verifyUserAlreadyExists(email)
        if (userExist) {
                throw  {type : "conflict", message: "User already exists"}
        }
        const hashPassword = generateHashPassword(password)
        const user = await authRepository.createUser(email, hashPassword);
        const token = generateToken(email)
        await authRepository.createSession(token, user)
        return token
}

export async function signIn({email, password} : User){
        const user = await verifyUserAlreadyExists(email)
        const comparedPassword = await comparePassword(password, user.password)
        if(!comparedPassword){
                throw {type : "unauthorized", message : "Invalid password"}
        }
        const token = generateToken(email)
        await authRepository.createSession(token, user)
        return token
}