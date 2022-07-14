import client from "../config/db.js"
import { User } from "@prisma/client"
export async function createUser(email : string, password : string ) {
        const user = await client.user.create({data : {email, password}})
        console.log("repository",user)
        return user

}

export async function getUserByEmail(email:string) {
  const userExist = await client.user.findFirst({where : {
        email 
  }})
  return userExist
}

export async function createSession(token : string, user : User) {
        const data = {
                token,
                userId : user.id
        }
        const session = await client.session.create({data})
        console.log("repository",session)
        return session
}