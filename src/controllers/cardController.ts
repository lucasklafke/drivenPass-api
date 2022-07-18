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