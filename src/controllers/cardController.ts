import { Request, Response } from "express";
import { Card } from "@prisma/client";
import * as cardService from "../services/cardService.js";


export type CardData = Omit<Card, "id" | "userId" | "createdAt">;

export async function createCard(req: Request, res: Response) {
        const { title, number, cvv, password, type, name, expireDate } : CardData = req.body;
        const userId : number = res.locals.jwtData.userId;
        await cardService.createCard({ title, number, cvv, password, type, name, expireDate }, userId);
        res.sendStatus(201)
}


export async function getManyCards(req: Request, res: Response) {
        const userId : number = res.locals.jwtData.userId
        const cards = await cardService.getManyCards(userId)
        res.send(cards)
}

export async function getOneCard(req: Request, res: Response) {
        const userId : number = res.locals.jwtData.userId
        const {cardId} : any = req.params
        const card = await cardService.getOneCard(Number(cardId),userId)
        res.send(card)
}

export async function deleteCard(req: Request, res: Response) {
  const {id} = req.params;
  const { jwtData } = res.locals;
  await cardService.deleteCard(Number(id), jwtData.userId);
  res.sendStatus(204);
}