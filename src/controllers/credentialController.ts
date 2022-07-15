import { Request, Response } from "express";
import { CreateCredentialData } from "../schemas/credentialSchemas.js";
import * as credentialService from "../services/credentialService.js"
export async function createCredential(req: Request, res: Response) {
  const { credentialName, url , username, password } : CreateCredentialData = req.body;
  const {email, userId} = res.locals.jwtData;
  await credentialService.createCredential({credentialName, url , username, password, userId}, email );
  res.sendStatus(201)
}


