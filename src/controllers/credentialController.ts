import { Request, Response } from "express";
import { CreateCredentialData } from "../schemas/credentialSchemas.js";
import * as credentialService from "../services/credentialService.js"
export async function createCredential(req: Request, res: Response) {
  const { credentialName, url , username, password } : CreateCredentialData = req.body;
  const {email, userId} = res.locals.jwtData;
  await credentialService.createCredential({credentialName, url , username, password, userId}, email );
  res.sendStatus(201)
}

export async function getCredential(req: Request, res: Response) {
  const {id} = req.params;
  const {jwtData} = res.locals;
  const credential = await credentialService.getOneCredential(Number(id), jwtData.userId);
  res.status(200).send(credential)
}

export async function getCredentials(req: Request, res: Response) {
  const {jwtData} = res.locals;
  const credentials = await credentialService.getManyCredentials(jwtData.userId);
  res.status(200).send(credentials)

}

export async function deleteCredential(req: Request, res: Response) {
  const {id} = req.params;
  const { jwtData } = res.locals;
  await credentialService.deleteCredential(Number(id), jwtData.userId);
  res.sendStatus(200);
}