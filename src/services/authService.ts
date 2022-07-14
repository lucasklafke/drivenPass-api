import { User } from "../controllers/authController.js";
import * as authRepository from "../repositories/authRepository.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

async function verifyUserAlreadyExists(email : string) {
        const user = await authRepository.getUserByEmail(email);
        if (user) {
                console.log(user)
                throw  {type : "conflict", message: "User already exists"}
        }
}
function generateToken(email : string){
        return jwt.sign({email}, process.env.JWT_SECRET, {expiresIn : "1h"})
        
}


export async function signUp({email, password} : User){
        await verifyUserAlreadyExists(email)
        console.log("user")
        const user = await authRepository.createUser(email, password);
        const token = generateToken(email)
        await authRepository.createSession(token, user)
        return token
}

export async function signIn({email, password} : User){
        
}