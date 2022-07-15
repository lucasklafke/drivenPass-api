import joi from "joi"
import { Credential } from "@prisma/client"
export type CreateCredentialData = Omit<Credential, "id" | "userId">;

const credentialSchema = joi.object<CreateCredentialData>({
        credentialName: joi.string().required(),
        url : joi.string().uri().required(),
        username : joi.string().required(),
        password : joi.string().required(),
})

export default credentialSchema