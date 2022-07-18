import client from "../config/db.js";
import { CardData } from "../controllers/cardController.js";
import { Card } from "@prisma/client";

export async function createCard(cardData: CardData, userId: number) {
        const { title, number, cvv, password, type, name, expireDate } = cardData;
        const card = await client.card.create({data: { title, number, cvv, password, type, name, expireDate, userId }});
        return card;
}

export async function getTitle(userId: number, title: string) {
        const card = await client.card.findFirst({where: {title, userId}});
        return card;
}


export async function findManyCards(userId: number) {
  const card : Card[] = await client.card.findMany({
    where: {
        userId,
    },
  });
  return card;
}

export async function findOneCard(cardId: number, userId: number) {
  const cards : Card[] = await client.card.findMany({
    where: {
        id: cardId,
        userId
    },
  });
  return cards[0];
}

export async function deleteCard(cardId: number) {
  await client.card.delete({
    where:{
        id: cardId
    }
  })
}