import { Request, Response } from "express";
import * as wifiService from "../services/wifiService.js"


export async function createWifi(req: Request, res: Response) {
  const { title, network, password } = req.body;
  const userId = res.locals.jwtData.userId;
  await wifiService.createWifi({ title, network, password }, userId);
  res.sendStatus(201);
}


export async function getManyWifis(req: Request, res: Response) {
        const userId : number = res.locals.jwtData.userId
        const cards = await wifiService.getManyWifis(userId)
        res.send(cards)
}

export async function getOneWifi(req: Request, res: Response) {
        const userId : number = res.locals.jwtData.userId
        const {wifiId} : any = req.params
        const card = await wifiService.getOneWifi(Number(wifiId),userId)
        res.send(card)
}

export async function deleteWifi(req: Request, res: Response) {
  const {id} = req.params;
  const { jwtData } = res.locals;
  await wifiService.deleteWifi(Number(id), jwtData.userId);
  res.sendStatus(204);
}