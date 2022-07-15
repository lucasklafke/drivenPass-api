import client from "../config/db.js";
import { CreateCredentialData } from "../services/credentialService.js";
export async function createCredential(CreateCredentialData : CreateCredentialData) {
  const { credentialName, url, username, password, userId } = CreateCredentialData;
  const data = {
        credentialName,
        url,
        username,
        password,
        userId
  }
  const credential = await client.credential.create({data})
  return credential;
}

export async function getUserCredentialByCredentialName(userId: number, credentialName: string) {
  const credential = await client.credential.findMany({
    where: {
        userId,
        credentialName
    },
  });
  return credential;
}

export async function findManyCredentials(userId: number) {
  const credentials : CreateCredentialData[] = await client.credential.findMany({
    where: {
        userId,
    },
  });
  return credentials;
}

export async function findOneCredential(credentialId: number, userId: number) {
  const credential : CreateCredentialData[] = await client.credential.findMany({
    where: {
        id: credentialId,
        userId
    },
  });
  return credential[0];
}